import dotenv from 'dotenv';
import { GitHubIssueLoader } from '../src/index.js';

dotenv.config();

async function main() {
    // GitHub 액세스 토큰은 .env 파일이나 환경 변수에서 가져옵니다.
    const accessToken = process.env.GITHUB_ACCESS_TOKEN;

    if (!accessToken) {
        console.warn('경고: GITHUB_ACCESS_TOKEN이 설정되지 않았습니다. API 요청 제한이 있을 수 있습니다.');
    }

    const loader = new GitHubIssueLoader(
        'https://github.com/langchain-ai/langchainjs',
        {
            issueNumber: 13, // 실제 존재하는 이슈 번호로 변경해주세요
            accessToken: accessToken
        }
    );

    try {
        console.log('이슈 코멘트를 가져오는 중...');
        const summary = await loader.load();
        console.log(summary);
    } catch (error) {
        console.error('오류 발생:', error.message);
    }
}

main(); 