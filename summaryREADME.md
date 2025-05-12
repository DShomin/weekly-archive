# GitHub 이슈 코멘트 정리 도구

GitHub 이슈의 코멘트를 가져와서 하나의 마크다운 파일로 정리해주는 도구입니다. GitHub API를 통해 이슈 정보를 가져옵니다.

## 설치 방법

```bash
# 저장소 클론
git clone https://github.com/DShomin/weekly-archive
cd github-issue-summarizer

# 의존성 설치
npm install
```

## 환경 설정

1. `.env` 파일을 프로젝트 루트 디렉토리에 생성합니다:

```
GITHUB_ACCESS_TOKEN=your_github_token_here
```

GitHub 액세스 토큰은 [GitHub 설정](https://github.com/settings/tokens)에서 생성할 수 있습니다. 
토큰에는 최소한 `repo` 스코프가 필요합니다.

## 사용 방법

### CLI 도구로 사용

```bash
# npm run으로 실행
npm run summarize -- -r https://github.com/DShomin/weekly-archive -i 123 -o output.md
```

### 옵션

- `-r, --repo <url>`: GitHub 리포지토리 URL (필수)
- `-i, --issue <number>`: 이슈 번호 (필수)
- `-o, --output <file>`: 출력 파일 경로 (기본값: 'issue-summary.md')
- `-t, --token <token>`: GitHub 액세스 토큰 (환경 변수에 설정된 경우 생략 가능)
- `--api-url <url>`: GitHub API URL (기본값: 'https://api.github.com')
- `--no-metadata`: 코멘트 메타데이터(작성자, 날짜 등) 포함하지 않음
- `--no-issue-details`: 이슈 세부 정보 포함하지 않음
- `--group-by-header`: 코멘트 내 마크다운 헤더(#, ##, ### 등)를 기준으로 내용을 그룹화

## 제약 사항

- GitHub API 요청 제한이 있으므로, 액세스 토큰 사용을 권장합니다.
- 비공개 리포지토리의 이슈에 접근하려면 적절한 권한을 가진 액세스 토큰이 필요합니다.
