import axios from 'axios';
import { Document } from '@langchain/core/documents';

/**
 * GitHub 이슈 코멘트 로더 클래스
 */
export class GitHubIssueLoader {
    /**
     * @param {string} repoUrl - GitHub 리포지토리 URL
     * @param {Object} options - 옵션
     * @param {string} options.apiUrl - GitHub API URL (기본값: 'https://api.github.com')
     * @param {string} options.accessToken - GitHub 액세스 토큰
     * @param {number} options.issueNumber - 이슈 번호
     * @param {string} options.branch - 브랜치 이름 (기본값: 'main')
     */
    constructor(repoUrl, options = {}) {
        // GitHub URL 파싱
        const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        this.owner = urlParts[0];
        this.repo = urlParts[1];

        // 옵션 설정
        this.apiUrl = options.apiUrl || 'https://api.github.com';
        this.accessToken = options.accessToken;
        this.issueNumber = options.issueNumber;
        this.branch = options.branch || 'main';
    }

    /**
     * 이슈 코멘트 가져오기
     * @param {number} issueNumber - 이슈 번호
     * @returns {Promise<Array>} - 코멘트 배열
     */
    async fetchIssueComments(issueNumber) {
        if (!issueNumber) {
            throw new Error('이슈 번호가 필요합니다');
        }

        const url = `${this.apiUrl}/repos/${this.owner}/${this.repo}/issues/${issueNumber}/comments`;

        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (this.accessToken) {
            headers['Authorization'] = `token ${this.accessToken}`;
        }

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            console.error('GitHub API 호출 오류:', error.message);
            throw error;
        }
    }

    /**
     * 이슈 정보 가져오기
     * @param {number} issueNumber - 이슈 번호
     * @returns {Promise<Object>} - 이슈 정보
     */
    async fetchIssueDetails(issueNumber) {
        if (!issueNumber) {
            throw new Error('이슈 번호가 필요합니다');
        }

        const url = `${this.apiUrl}/repos/${this.owner}/${this.repo}/issues/${issueNumber}`;

        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (this.accessToken) {
            headers['Authorization'] = `token ${this.accessToken}`;
        }

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            console.error('GitHub API 호출 오류:', error.message);
            throw error;
        }
    }

    /**
     * 이슈 코멘트를 Document 객체로 변환
     * @param {number} issueNumber - 이슈 번호
     * @returns {Promise<Array<Document>>} - Document 객체 배열
     */
    async loadIssueComments(issueNumber) {
        const comments = await this.fetchIssueComments(issueNumber || this.issueNumber);

        return comments.map(comment => new Document({
            pageContent: comment.body,
            metadata: {
                author: comment.user.login,
                created_at: comment.created_at,
                updated_at: comment.updated_at,
                issue_url: comment.issue_url,
                comment_id: comment.id,
                html_url: comment.html_url
            }
        }));
    }

    /**
     * 코멘트 요약 생성
     * @param {Array<Document>} comments - Document 객체 배열
     * @param {Object} options - 옵션
     * @param {boolean} options.includeMetadata - 메타데이터 포함 여부
     * @param {boolean} options.groupByHeader - 같은 해더를 그룹화할지 여부
     * @returns {string} - 요약 텍스트
     */
    summarizeComments(comments, options = { includeMetadata: true, groupByHeader: false }) {
        if (!options.groupByHeader) {
            let summary = '';

            comments.forEach((comment, index) => {
                if (options.includeMetadata) {
                    summary += `코멘트 #${index + 1} (작성자: ${comment.metadata.author}, 작성일: ${comment.metadata.created_at})\n`;
                }
                if (comment.pageContent.includes('    ')) {
                    comment.pageContent = comment.pageContent.replace("    #", '#');
                    comment.pageContent = comment.pageContent.replace("    [", '- [');
                }
                summary += `${comment.pageContent}\n\n`;
                summary += '-'.repeat(3) + '\n\n';
            });

            return summary;
        } else {
            // 해더별로 그룹화
            const headerGroups = {};

            // 첫 단계: 모든 코멘트를 파싱하여 해더와 콘텐츠를 분리
            comments.forEach(comment => {
                const content = comment.pageContent
                    .replace(/\s{4}#/g, '#')  // 들여쓰기 있는 # 수정
                    .replace(/\s{4}\[/g, '- [');  // 들여쓰기 있는 링크 수정

                // 해더와 콘텐츠를 파싱
                const segments = this._parseHeadersAndContents(content);

                segments.forEach(segment => {
                    const headerKey = segment.header || '### 기타';

                    if (!headerGroups[headerKey]) {
                        headerGroups[headerKey] = [];
                    }

                    if (segment.content.trim()) {
                        headerGroups[headerKey].push({
                            content: segment.content.trim(),
                            metadata: comment.metadata
                        });
                    }
                });
            });

            // 두 번째 단계: 그룹화된 내용으로 요약 생성
            let summary = '';

            Object.entries(headerGroups).forEach(([header, items]) => {
                if (items.length === 0) return;

                summary += `${header}\n\n`;

                items.forEach(item => {
                    if (options.includeMetadata) {
                        summary += `- ${item.content} (작성자: ${item.metadata.author}, 작성일: ${item.metadata.created_at})\n`;
                    } else {
                        summary += `- ${item.content}\n`;
                    }
                });

                summary += '\n---\n\n';
            });

            return summary;
        }
    }

    /**
     * 마크다운 콘텐츠에서 해더와 콘텐츠를 파싱
     * @private
     * @param {string} content - 마크다운 콘텐츠
     * @returns {Array<{header: string, content: string}>} - 파싱된 세그먼트
     */
    _parseHeadersAndContents(content) {
        const lines = content.split('\n');
        const segments = [];

        // 해더 라인 찾기
        const headerIndices = [];
        lines.forEach((line, index) => {
            if (line.trim().startsWith('###')) {
                headerIndices.push(index);
            }
        });

        // 해더가 없으면 전체를 기타로 분류
        if (headerIndices.length === 0) {
            segments.push({
                header: '### 기타',
                content: content.trim()
            });
            return segments;
        }

        // 각 해더 섹션 처리
        headerIndices.forEach((headerIndex, i) => {
            const headerLine = lines[headerIndex].trim();
            const headerMatch = headerLine.match(/^###\s+(.*?)$/);

            if (!headerMatch) return;

            const headerTitle = headerMatch[1].trim();
            const currentHeader = `### ${headerTitle}`;

            // 현재 해더부터 다음 해더 전까지의 콘텐츠 범위 결정
            const nextHeaderIndex = i < headerIndices.length - 1 ? headerIndices[i + 1] : lines.length;
            const sectionLines = lines.slice(headerIndex + 1, nextHeaderIndex);

            // 항목 라인 찾기
            const itemLines = sectionLines.filter(line => {
                const trimmed = line.trim();
                return trimmed.startsWith('- ') || trimmed.startsWith('• ');
            });

            // 항목이 있으면 각 항목을 추가
            if (itemLines.length > 0) {
                itemLines.forEach(itemLine => {
                    // 링크 패턴 추출
                    const linkMatch = itemLine.match(/^\s*[-•]\s+\[(.*?)\]\((.*?)\)\s*:?\s*(.*)/);
                    let content = '';

                    if (linkMatch) {
                        // 링크 형식 (제목, URL, 설명)
                        const title = linkMatch[1].trim();
                        const url = linkMatch[2].trim();
                        const description = linkMatch[3] ? linkMatch[3].trim() : '';

                        if (description) {
                            content = `[${title}](${url}) : ${description}`;
                        } else {
                            content = `[${title}](${url})`;
                        }
                    } else {
                        // 일반 텍스트 항목
                        content = itemLine.replace(/^\s*[-•]\s+/, '').trim();
                    }

                    if (content) {
                        segments.push({
                            header: currentHeader,
                            content: content
                        });
                    }
                });
            } else {
                // 항목이 없으면 해더 다음 전체 내용을 하나의 항목으로 추가
                const fullContent = sectionLines.join(' ').trim();

                if (fullContent) {
                    segments.push({
                        header: currentHeader,
                        content: fullContent
                    });
                }
            }
        });

        return segments;
    }

    /**
     * 이슈 코멘트 로드 및 요약
     * @param {Object} options - 옵션
     * @param {boolean} options.includeMetadata - 메타데이터 포함 여부
     * @param {boolean} options.includeIssueDetails - 이슈 세부 정보 포함 여부
     * @param {boolean} options.groupByHeader - 같은 해더를 그룹화할지 여부
     * @returns {Promise<string>} - 요약 텍스트
     */
    async load(options = { includeMetadata: true, includeIssueDetails: true, groupByHeader: false }) {
        if (!this.issueNumber) {
            throw new Error('이슈 번호가 필요합니다. options에 issueNumber를 제공하세요.');
        }

        let summary = '';

        if (options.includeIssueDetails) {
            const issueDetails = await this.fetchIssueDetails(this.issueNumber);
            summary += `# ${issueDetails.title}\n\n`;
            summary += `이슈 #${issueDetails.number} | 작성자: ${issueDetails.user.login} | 상태: ${issueDetails.state}\n\n`;
            summary += `${issueDetails.body || '본문 없음'}\n\n`;
            summary += '='.repeat(50) + '\n\n## 코멘트\n\n';
        }

        const comments = await this.loadIssueComments();
        summary += this.summarizeComments(comments, {
            includeMetadata: options.includeMetadata,
            groupByHeader: options.groupByHeader
        });

        return summary;
    }
}

export default GitHubIssueLoader; 