#!/usr/bin/env node

import { program } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { GitHubIssueLoader } from './index.js';

dotenv.config();

// CLI 설정
program
    .name('github-issue-summarizer')
    .description('GitHub 이슈 코멘트를 하나로 정리하는 도구')
    .version('1.0.0');

program
    .requiredOption('-r, --repo <url>', 'GitHub 리포지토리 URL')
    .requiredOption('-i, --issue <number>', '이슈 번호', parseInt)
    .option('-o, --output <file>', '출력 파일 경로', 'issue-summary.md')
    .option('-t, --token <token>', 'GitHub 액세스 토큰 (또는 GITHUB_ACCESS_TOKEN 환경 변수 사용)')
    .option('--api-url <url>', 'GitHub API URL (기본값: https://api.github.com)')
    .option('--no-metadata', '메타데이터 포함하지 않음')
    .option('--no-issue-details', '이슈 세부 정보 포함하지 않음')
    .option('--group-by-header', '같은 해더를 그룹화함')
    .parse(process.argv);

const options = program.opts();

async function main() {
    try {
        const loader = new GitHubIssueLoader(options.repo, {
            issueNumber: options.issue,
            accessToken: options.token || process.env.GITHUB_ACCESS_TOKEN,
            apiUrl: options.apiUrl,
        });

        console.log(`🔍 ${options.repo}의 이슈 #${options.issue} 코멘트를 가져오는 중...`);

        const summary = await loader.load({
            includeMetadata: options.metadata !== false,
            includeIssueDetails: options.issueDetails !== false,
            groupByHeader: options.groupByHeader,
        });

        // 출력 파일 경로 확인 및 생성
        const outputPath = path.resolve(options.output);

        // 요약 내용을 파일로 저장
        await fs.writeFile(outputPath, summary, 'utf8');

        console.log(`✅ 요약이 성공적으로 ${outputPath} 파일에 저장되었습니다.`);
    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        process.exit(1);
    }
}

main(); 