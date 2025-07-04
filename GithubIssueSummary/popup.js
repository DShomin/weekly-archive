document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const status = document.getElementById('status');

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        status.style.display = 'block';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }

    extractBtn.addEventListener('click', async function() {
        try {
            // 현재 활성 탭 가져오기
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // GitHub 이슈 페이지인지 확인
            if (!tab.url.includes('github.com') || !tab.url.includes('/issues/')) {
                showStatus('Please navigate to a GitHub issue page first', 'error');
                return;
            }

            extractBtn.disabled = true;
            extractBtn.textContent = 'Extracting...';

            // Content script 실행
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: triggerExtraction
            });

            showStatus('Extraction started! Check the page for download.', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            showStatus('Failed to extract comments. Please try again.', 'error');
        } finally {
            extractBtn.disabled = false;
            extractBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 13.25 13H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 14.543V13H2.75A1.75 1.75 0 0 1 1 11.25v-8.5C1 1.784 1.784 1 2.75 1ZM2.5 2.75v8.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25Z"/>
                </svg>
                Extract Comments
            `;
        }
    });

    // Content script에서 실행할 함수
    function triggerExtraction() {
        // 페이지의 extractComments 함수 호출
        const button = document.getElementById('extract-comments-btn');
        if (button) {
            button.click();
        } else {
            // 버튼이 없으면 직접 추출 실행
            if (typeof window.extractComments === 'function') {
                window.extractComments();
            } else {
                alert('추출 기능을 사용할 수 없습니다. 페이지를 새로고침하고 다시 시도해주세요.');
            }
        }
    }
});