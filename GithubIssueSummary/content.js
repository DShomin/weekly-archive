// GitHub Issue Comment Extractor
(() => {
  'use strict';

  // 버튼이 이미 추가되었는지 확인
  if (document.getElementById('extract-comments-btn')) {
    return;
  }

  // 추출 버튼 생성
  function createExtractButton() {
    const button = document.createElement('button');
    button.id = 'extract-comments-btn';
    button.className = 'btn btn-sm btn-outline';
    button.innerHTML = `
      <svg class="octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 13.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H2.75A1.75 1.75 0 0 1 1 11.25v-8.5C1 1.784 1.784 1 2.75 1ZM2.5 2.75v8.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25Z"/>
      </svg>
      Extract to Markdown
    `;
    button.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
      background: #0969da;
      color: white;
      border: 1px solid #0969da;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      display: flex;
      align-items: center;
      gap: 6px;
    `;

    button.addEventListener('click', extractComments);
    button.addEventListener('mouseenter', () => {
      button.style.background = '#0860ca';
    });
    button.addEventListener('mouseleave', () => {
      button.style.background = '#0969da';
    });

    return button;
  }

  // React 앱 데이터 파싱
  function parseReactAppData() {
    // 두 가지 방식으로 스크립트 태그 검색
    const selectors = [
      'script[type="application/json"]',
      'script[data-target="react-app.embeddedData"]'
    ];
    
    for (const selector of selectors) {
      const scripts = document.querySelectorAll(selector);
      
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent);
          
          // preloadedQueries에서 IssueViewerViewQuery 찾기
          if (data.payload && data.payload.preloadedQueries) {
            const issueQuery = data.payload.preloadedQueries.find(
              query => query.queryName === 'IssueViewerViewQuery'
            );
            
            if (issueQuery && issueQuery.result && issueQuery.result.data) {
              return issueQuery.result.data;
            }
          }
        } catch (e) {
          continue;
        }
      }
    }
    
    return null;
  }

  // HTML을 마크다운으로 변환
  function convertHtmlToMarkdown(html) {
    let markdown = html;
    
    // HTML 태그를 마크다운으로 변환
    markdown = markdown
      // 제목 태그
      .replace(/<h([1-6])[^>]*>/gi, (match, level) => '#'.repeat(parseInt(level)) + ' ')
      .replace(/<\/h[1-6]>/gi, '\n\n')
      
      // 링크 태그
      .replace(/<a[^>]*href=['"](.*?)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      
      // 리스트 태그
      .replace(/<ul[^>]*>/gi, '')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<\/li>/gi, '\n')
      
      // 문단 태그
      .replace(/<p[^>]*>/gi, '')
      .replace(/<\/p>/gi, '\n\n')
      
      // 줄바꿈 태그
      .replace(/<br\s*\/?>/gi, '\n')
      
      // 강조 태그
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      
      // 코드 태그
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      
      // 기타 HTML 태그 제거
      .replace(/<[^>]*>/g, '')
      
      // HTML 엔티티 디코딩
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      
      // 여러 줄바꿈을 정리
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
    
    return markdown;
  }

  // HTML DOM에서 댓글 추출
  function extractCommentsFromDOM() {
    const comments = [];
    
    // 다양한 방법으로 댓글 찾기
    const selectors = [
      '[data-testid="comment-viewer-outer-box"]',
      '.react-issue-comment',
      '[id^="issuecomment-"]'
    ];
    
    const foundComments = new Set();
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      console.log(`${selector}로 찾은 댓글 개수:`, elements.length);
      
      elements.forEach(element => {
        try {
          // 댓글 ID 추출
          const commentId = element.id || element.querySelector('[id^="issuecomment-"]')?.id;
          if (commentId && foundComments.has(commentId)) {
            return; // 이미 찾은 댓글은 건너뛰기
          }
          
          // 댓글 내용 추출 - 여러 방법 시도
          let bodyText = '';
          const bodySelectors = [
            '[data-testid="markdown-body"]',
            '.markdown-body',
            '.comment-body',
            '.js-comment-body'
          ];
          
                     for (const bodySelector of bodySelectors) {
             const bodyElement = element.querySelector(bodySelector);
             if (bodyElement) {
               // innerHTML을 사용해서 마크다운 형식 유지
               if (bodyElement.innerHTML && bodyElement.innerHTML.includes('<')) {
                 bodyText = convertHtmlToMarkdown(bodyElement.innerHTML);
               } else {
                 bodyText = bodyElement.textContent || bodyElement.innerText || '';
               }
               if (bodyText.trim()) {
                 break;
               }
             }
           }
          
          if (bodyText.trim()) {
            if (commentId) {
              foundComments.add(commentId);
            }
            
            // 시간 정보 추출 시도
            let createdAt = new Date().toISOString();
            const timeElement = element.querySelector('relative-time');
            if (timeElement && timeElement.getAttribute('datetime')) {
              createdAt = timeElement.getAttribute('datetime');
            }
            
            comments.push({
              body: bodyText.trim(),
              createdAt: createdAt,
              source: 'DOM',
              commentId: commentId || 'unknown'
            });
          }
        } catch (e) {
          console.log('댓글 추출 중 오류:', e);
        }
      });
    });
    
    console.log('DOM에서 추출한 댓글 개수:', comments.length);
    return comments;
  }

  // 댓글 추출 및 마크다운 생성
  function extractComments() {
    console.log('댓글 추출 시작...');
    
    const data = parseReactAppData();
    let allComments = [];
    
    // JSON 데이터에서 댓글 수집
    if (data && data.repository && data.repository.issue) {
      const issue = data.repository.issue;
      console.log('JSON 데이터에서 이슈 정보 찾음:', issue.title);

      // frontTimelineItems에서 댓글 수집
      if (issue.frontTimelineItems && issue.frontTimelineItems.edges) {
        const frontComments = issue.frontTimelineItems.edges.filter(edge => 
          edge.node.__typename === 'IssueComment'
        );
        console.log('frontTimelineItems에서 찾은 댓글 개수:', frontComments.length);
        allComments = allComments.concat(frontComments.map(edge => ({
          body: edge.node.body || 'No content',
          createdAt: edge.node.createdAt,
          source: 'JSON-front',
          commentId: edge.node.id
        })));
      }

      // backTimelineItems에서 댓글 수집
      if (issue.backTimelineItems && issue.backTimelineItems.edges) {
        const backComments = issue.backTimelineItems.edges.filter(edge => 
          edge.node.__typename === 'IssueComment'
        );
        console.log('backTimelineItems에서 찾은 댓글 개수:', backComments.length);
        allComments = allComments.concat(backComments.map(edge => ({
          body: edge.node.body || 'No content',
          createdAt: edge.node.createdAt,
          source: 'JSON-back',
          commentId: edge.node.id
        })));
      }
    } else {
      console.log('JSON 데이터를 찾을 수 없음');
    }

    console.log('JSON에서 추출한 총 댓글 개수:', allComments.length);

    // HTML DOM에서 댓글 수집 (JSON에서 누락된 댓글 보완)
    const domComments = extractCommentsFromDOM();
    
    // 텍스트 정규화 함수
    function normalizeText(text) {
      return text.toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s가-힣]/g, '')
        .trim();
    }

    // 댓글의 핵심 내용 추출 (제목이나 링크 등)
    function extractCommentSignature(body) {
      // 여러 개의 시그니처를 조합하여 더 정확한 중복 검사
      const signatures = [];
      
      // 링크 제목들 추출
      const linkMatches = body.match(/\[([^\]]+)\]/g);
      if (linkMatches && linkMatches.length > 0) {
        linkMatches.forEach(match => {
          const title = match.replace(/[\[\]]/g, '');
          signatures.push(normalizeText(title));
        });
      }
      
      // 섹션 제목들 추출
      const titleMatches = body.match(/###?\s*([^\n]+)/g);
      if (titleMatches && titleMatches.length > 0) {
        titleMatches.forEach(match => {
          const title = match.replace(/#+\s*/, '');
          signatures.push(normalizeText(title));
        });
      }
      
      // URL들 추출
      const urlMatches = body.match(/https?:\/\/[^\s\)]+/g);
      if (urlMatches && urlMatches.length > 0) {
        signatures.push(normalizeText(urlMatches[0]));
      }
      
      // 특정 키워드들 추출
      const keywordMatches = body.match(/([가-힣A-Za-z]+\s[가-힣A-Za-z]+\s[가-힣A-Za-z]+)/g);
      if (keywordMatches && keywordMatches.length > 0) {
        signatures.push(normalizeText(keywordMatches[0]));
      }
      
      // 시그니처들을 조합
      if (signatures.length > 0) {
        return signatures.join('|');
      } else {
        // 첫 100자를 시그니처로 사용
        return normalizeText(body.substring(0, 100));
      }
    }

    // 중복 제거를 위해 댓글 시그니처로 비교
    const seenSignatures = new Set();
    const uniqueComments = [];
    
    // JSON 댓글 먼저 추가 (마크다운 형식 우선)
    allComments.forEach(comment => {
      const signature = extractCommentSignature(comment.body);
      if (!seenSignatures.has(signature)) {
        seenSignatures.add(signature);
        uniqueComments.push(comment);
        console.log(`JSON 댓글 추가: ${signature}`);
      } else {
        console.log(`JSON 댓글 중복 건너뛰기: ${signature}`);
      }
    });
    
    // DOM 댓글을 마크다운 형식으로 변환
    function convertToMarkdown(text) {
      // 이미 마크다운 형식인지 확인
      if (text.includes('### ') && text.includes('- [')) {
        return text;
      }
      
      // 간단한 텍스트를 마크다운으로 변환
      let markdown = text;
      
      // 제목 처리
      if (!markdown.startsWith('#')) {
        // 첫 번째 줄이 제목인 경우
        const lines = markdown.split('\n');
        if (lines.length > 0 && !lines[0].includes(':')) {
          lines[0] = '### ' + lines[0];
          markdown = lines.join('\n');
        }
      }
      
      // 링크가 이미 마크다운 형식이 아닌 경우 변환 시도
      // 하지만 대부분 DOM에서 가져온 것도 이미 마크다운 형식일 것임
      
      return markdown;
    }

    // DOM 댓글 추가 (JSON에 없는 것만)
    domComments.forEach(comment => {
      const signature = extractCommentSignature(comment.body);
      if (!seenSignatures.has(signature)) {
        seenSignatures.add(signature);
        // DOM 댓글을 마크다운으로 변환
        comment.body = convertToMarkdown(comment.body);
        uniqueComments.push(comment);
        console.log(`DOM 댓글 추가: ${signature}`);
      } else {
        console.log(`DOM 댓글 중복 건너뛰기: ${signature}`);
      }
    });

    console.log('중복 제거 후 총 댓글 개수:', uniqueComments.length);

    // 카테고리별로 그룹화
    function groupByCategory(comments) {
      const categories = {};
      const uncategorized = [];
      
      comments.forEach(comment => {
        const content = comment.body;
        
        // 카테고리 헤더 패턴 찾기 (### 서비스, ### 뉴스, ### 논문 등)
        const categoryMatch = content.match(/^### ([^\n]+)/);
        
        if (categoryMatch) {
          const categoryName = categoryMatch[1].trim();
          
          if (!categories[categoryName]) {
            categories[categoryName] = [];
          }
          
          // 카테고리 헤더 제거하고 내용만 추가
          const contentWithoutCategory = content.replace(/^### [^\n]+\n?/, '').trim();
          if (contentWithoutCategory) {
            categories[categoryName].push(contentWithoutCategory);
          }
        } else {
          // 카테고리가 없는 댓글은 uncategorized에 추가
          uncategorized.push(content);
        }
      });
      
      return { categories, uncategorized };
    }

    // 이슈 본문 추가
    let markdown = '';
    
    // 댓글 추가
    if (uniqueComments.length > 0) {
      // 댓글을 생성 시간순으로 정렬
      uniqueComments.sort((a, b) => {
        const timeA = new Date(a.createdAt || 0);
        const timeB = new Date(b.createdAt || 0);
        return timeA - timeB;
      });

      // 카테고리별로 그룹화
      const { categories, uncategorized } = groupByCategory(uniqueComments);
      
      // 카테고리 순서 정의 (원하는 순서로 출력)
      const categoryOrder = ['서비스', '뉴스', '논문', '기타'];
      
      // 카테고리별로 출력
      categoryOrder.forEach(categoryName => {
        if (categories[categoryName] && categories[categoryName].length > 0) {
          markdown += `### ${categoryName}\n\n`;
          categories[categoryName].forEach(content => {
            markdown += `${content}\n\n`;
          });
        }
      });
      
      // 정의된 카테고리 외의 다른 카테고리들 출력
      Object.keys(categories).forEach(categoryName => {
        if (!categoryOrder.includes(categoryName)) {
          markdown += `### ${categoryName}\n\n`;
          categories[categoryName].forEach(content => {
            markdown += `${content}\n\n`;
          });
        }
      });
      
      // 카테고리가 없는 댓글들 출력
      if (uncategorized.length > 0) {
        markdown += `### 기타\n\n`;
        uncategorized.forEach(content => {
          markdown += `${content}\n\n`;
        });
      }
      
      console.log('카테고리별 그룹화 완료:', Object.keys(categories));
    }

    // 파일 다운로드
    const issueTitle = data?.repository?.issue?.title || 'GitHub Issue';
    const issueNumber = data?.repository?.issue?.number || 'Unknown';
    downloadMarkdown(markdown, issueTitle, issueNumber);
    
    console.log('댓글 추출 완료!');
  }

  // 마크다운 파일 다운로드
  function downloadMarkdown(content, title, issueNumber) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // 파일명 생성 (특수문자 제거)
    const sanitizedTitle = title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    link.download = `issue-${issueNumber}-${sanitizedTitle}.md`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    // 성공 메시지
    showNotification('마크다운 파일이 다운로드되었습니다!');
  }

  // 알림 표시
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // 페이지 로드 완료 후 버튼 추가
  function addButton() {
    if (window.location.pathname.includes('/issues/')) {
      const button = createExtractButton();
      document.body.appendChild(button);
    }
  }

  // 초기 로드
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }

  // SPA 네비게이션 감지
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      
      // 기존 버튼 제거
      const existingButton = document.getElementById('extract-comments-btn');
      if (existingButton) {
        existingButton.remove();
      }
      
      // 새 버튼 추가 (이슈 페이지인 경우)
      setTimeout(addButton, 1000);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();