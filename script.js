// 전역 변수
let currentCategory = 'all';
let currentSearchTerm = '';
let filteredData = [];
let isLoading = true;
let hashtagData = null;
let selectedHashtags = new Set();

// DOM 요소들
const timelineElement = document.getElementById('timeline');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadingElement = document.getElementById('loading');

// 통계 요소들
const totalItemsElement = document.getElementById('totalItems');
const aiItemsElement = document.getElementById('aiItems');
const companyItemsElement = document.getElementById('companyItems');
const totalHashtagsElement = document.getElementById('totalHashtags');

// 해시태그 요소들
const hashtagToggle = document.getElementById('hashtagToggle');
const hashtagContent = document.getElementById('hashtagContent');
const hashtagRanking = document.getElementById('hashtagRanking');
const hashtagCloud = document.getElementById('hashtagCloud');
const hashtagSearch = document.getElementById('hashtagSearch');
const uniqueHashtagsElement = document.getElementById('uniqueHashtags');
const totalHashtagCountElement = document.getElementById('totalHashtagCount');

// 초기화
document.addEventListener('DOMContentLoaded', function () {
    // 로딩 시뮬레이션
    setTimeout(() => {
        initializeApp();
    }, 1000);
});

// 앱 초기화
function initializeApp() {
    filteredData = [...techTrendData];
    loadHashtagData();
    setupEventListeners();
    renderTimeline();
    updateStats();
    hideLoading();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 검색 입력 (디바운스 적용)
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // 필터 버튼들
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // 키보드 네비게이션
    document.addEventListener('keydown', handleKeydown);
}

// 검색 처리
function handleSearch(event) {
    currentSearchTerm = event.target.value.toLowerCase().trim();
    filterAndRender();
}

// 필터 버튼 클릭 처리
function handleFilterClick(event) {
    const category = event.target.dataset.category;

    // 활성 버튼 변경
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    currentCategory = category;
    filterAndRender();
}

// 키보드 네비게이션
function handleKeydown(event) {
    if (event.key === 'Escape') {
        clearSearch();
    }
}

// 검색 초기화
function clearSearch() {
    searchInput.value = '';
    currentSearchTerm = '';
    filterAndRender();
}

// 필터링 및 렌더링
function filterAndRender() {
    filteredData = filterData(techTrendData, currentCategory, currentSearchTerm);
    renderTimeline();
    updateStats();
}

// 데이터 필터링
function filterData(data, category, searchTerm) {
    return data.map(section => {
        const filteredItems = section.items.filter(item => {
            // 카테고리 필터
            const categoryMatch = category === 'all' || item.category === category;

            // 검색어 필터
            const searchMatch = !searchTerm ||
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm);

            return categoryMatch && searchMatch;
        });

        return {
            ...section,
            items: filteredItems
        };
    }).filter(section => section.items.length > 0);
}

// 타임라인 렌더링
function renderTimeline() {
    if (filteredData.length === 0) {
        timelineElement.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>검색 결과가 없습니다</h3>
                <p>다른 키워드나 카테고리를 시도해보세요.</p>
            </div>
        `;
        return;
    }

    const timelineHTML = filteredData.map((section, sectionIndex) => {
        const itemsHTML = section.items.map((item, itemIndex) => {
            const categoryData = categoryInfo[item.category];
            const animationDelay = (sectionIndex * 0.1) + (itemIndex * 0.05);

            // 해시태그 HTML 생성
            const hashtagsHtml = item.hashtags && item.hashtags.length > 0
                ? `<div class="item-hashtags">
                    ${item.hashtags.map(tag => `<span class="hashtag-tag" data-hashtag="${tag}">#${tag}</span>`).join('')}
                   </div>`
                : '';

            return `
                <div class="timeline-item" style="animation-delay: ${animationDelay}s" onclick="window.open('${item.link}', '_blank')">
                    <div class="item-category ${categoryData.color}">
                        <i class="${categoryData.icon}"></i>
                        ${categoryData.name}
                    </div>
                    <h3 class="item-title">${highlightSearchTerm(item.title)}</h3>
                    ${hashtagsHtml}
                    <div class="tooltip">
                        <strong>${item.title}</strong><br>
                        ${item.description}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="timeline-section">
                <div class="timeline-date">
                    <i class="fas fa-calendar-alt"></i>
                    ${section.date}
                </div>
                <div class="timeline-items">
                    ${itemsHTML}
                </div>
            </div>
        `;
    }).join('');

    timelineElement.innerHTML = timelineHTML;

    // 애니메이션 트리거
    setTimeout(() => {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => item.style.opacity = '1');
    }, 100);
}

// 검색어 하이라이트
function highlightSearchTerm(text) {
    if (!currentSearchTerm) return text;

    const regex = new RegExp(`(${escapeRegExp(currentSearchTerm)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// 정규식 이스케이프
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 통계 업데이트
function updateStats() {
    const allItems = getAllItems(filteredData);
    const aiItems = allItems.filter(item => item.category === 'ai-model');
    const companyItems = allItems.filter(item => item.category === 'company');

    // 애니메이션과 함께 숫자 업데이트
    animateNumber(totalItemsElement, parseInt(totalItemsElement.textContent) || 0, allItems.length);
    animateNumber(aiItemsElement, parseInt(aiItemsElement.textContent) || 0, aiItems.length);
    animateNumber(companyItemsElement, parseInt(companyItemsElement.textContent) || 0, companyItems.length);
}

// 모든 아이템 추출
function getAllItems(data) {
    return data.reduce((acc, section) => {
        return acc.concat(section.items);
    }, []);
}

// 숫자 애니메이션
function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const difference = end - start;

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic 이징 함수
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(start + (difference * easeProgress));

        element.textContent = currentNumber;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// 로딩 숨기기
function hideLoading() {
    loadingElement.classList.add('hidden');
    isLoading = false;
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 날짜 파싱 및 정렬 (필요시 사용)
function parseDate(dateString) {
    // "2025년 1월 25일" 형식을 Date 객체로 변환
    const match = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (match) {
        const [, year, month, day] = match;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return new Date();
}

// 스크롤 최적화 (Intersection Observer)
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // 타임라인 아이템들 관찰
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// 검색 결과 없음 스타일 추가
const noResultsCSS = `
    .no-results {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-muted);
    }
    
    .no-results i {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .no-results h3 {
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    mark {
        background: linear-gradient(135deg, var(--warning-color), #fbbf24);
        color: var(--bg-primary);
        padding: 0.1rem 0.3rem;
        border-radius: 0.25rem;
        font-weight: 600;
    }
`;

// CSS 추가
const style = document.createElement('style');
style.textContent = noResultsCSS;
document.head.appendChild(style);

// 성능 모니터링 (개발용)
if (window.performance && window.performance.mark) {
    window.performance.mark('app-init-start');

    window.addEventListener('load', () => {
        window.performance.mark('app-init-end');
        window.performance.measure('app-init', 'app-init-start', 'app-init-end');

        const measure = window.performance.getEntriesByName('app-init')[0];
        console.log(`앱 초기화 시간: ${measure.duration.toFixed(2)}ms`);
    });
}

// PWA 지원 (Service Worker 등록)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 다크/라이트 모드 토글 (미래 확장용)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.dataset.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
}

// 테마 복원
function restoreTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;
}

// 초기 테마 설정
restoreTheme();

// 에러 핸들링
window.addEventListener('error', (event) => {
    console.error('앱 오류:', event.error);
    // 사용자에게 친화적인 오류 메시지 표시
});

// 해시태그 데이터 로드
async function loadHashtagData() {
    try {
        const response = await fetch('hashtag_analysis.json');
        hashtagData = await response.json();
        setupHashtagEventListeners();
        renderHashtagSection();
        updateHashtagStats();
    } catch (error) {
        console.warn('해시태그 데이터를 로드할 수 없습니다:', error);
        // 해시태그 섹션 숨기기
        const hashtagSection = document.querySelector('.hashtag-section');
        if (hashtagSection) {
            hashtagSection.style.display = 'none';
        }
    }
}

// 해시태그 이벤트 리스너 설정
function setupHashtagEventListeners() {
    // 해시태그 토글 버튼
    if (hashtagToggle) {
        hashtagToggle.addEventListener('click', toggleHashtagSection);
    }

    // 해시태그 검색
    if (hashtagSearch) {
        hashtagSearch.addEventListener('input', debounce(handleHashtagSearch, 300));
    }
}

// 해시태그 섹션 토글
function toggleHashtagSection() {
    const content = hashtagContent;
    const button = hashtagToggle;

    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        button.classList.remove('rotated');
    } else {
        content.classList.add('collapsed');
        button.classList.add('rotated');
    }
}

// 해시태그 검색 처리
function handleHashtagSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    renderHashtagCloud(searchTerm);
}

// 해시태그 섹션 렌더링
function renderHashtagSection() {
    if (!hashtagData) return;

    renderHashtagRanking();
    renderHashtagCloud();
}

// 해시태그 순위 렌더링
function renderHashtagRanking() {
    if (!hashtagData || !hashtagRanking) return;

    const rankingHTML = hashtagData.top_10.map((item, index) => {
        return `
            <div class="hashtag-rank-item" onclick="toggleHashtagFilter('${item.tag}')">
                <span class="hashtag-rank-number">${index + 1}</span>
                <span class="hashtag-rank-tag">#${item.tag}</span>
                <span class="hashtag-rank-count">${item.count}</span>
            </div>
        `;
    }).join('');

    hashtagRanking.innerHTML = rankingHTML;
}

// 해시태그 클라우드 렌더링
function renderHashtagCloud(searchTerm = '') {
    if (!hashtagData || !hashtagCloud) return;

    let hashtags = Object.entries(hashtagData.all_hashtags);

    // 검색어로 필터링
    if (searchTerm) {
        hashtags = hashtags.filter(([tag]) =>
            tag.toLowerCase().includes(searchTerm)
        );
    }

    // 사용 빈도순으로 정렬
    hashtags.sort((a, b) => b[1] - a[1]);

    // 최대 50개까지만 표시
    hashtags = hashtags.slice(0, 50);

    const cloudHTML = hashtags.map(([tag, count]) => {
        const isActive = selectedHashtags.has(tag);
        const activeClass = isActive ? 'active' : '';

        return `
            <span class="hashtag-tag ${activeClass}" onclick="toggleHashtagFilter('${tag}')">
                #${tag}
                <span class="hashtag-tag-count">${count}</span>
            </span>
        `;
    }).join('');

    hashtagCloud.innerHTML = cloudHTML;
}

// 해시태그 필터 토글
function toggleHashtagFilter(tag) {
    if (selectedHashtags.has(tag)) {
        selectedHashtags.delete(tag);
    } else {
        selectedHashtags.add(tag);
    }

    renderHashtagCloud();
    filterAndRender();
}

// 해시태그 통계 업데이트
function updateHashtagStats() {
    if (!hashtagData) return;

    if (totalHashtagsElement) {
        animateNumber(totalHashtagsElement, 0, hashtagData.total_hashtags);
    }
    if (uniqueHashtagsElement) {
        animateNumber(uniqueHashtagsElement, 0, hashtagData.unique_hashtags);
    }
    if (totalHashtagCountElement) {
        animateNumber(totalHashtagCountElement, 0, hashtagData.total_hashtags);
    }
}

// 통계 업데이트 함수 수정 (해시태그 통계 포함)
function updateStats() {
    const allItems = getAllItems(filteredData);
    const aiItems = allItems.filter(item => item.category === 'ai-model');
    const companyItems = allItems.filter(item => item.category === 'company');

    // 애니메이션과 함께 숫자 업데이트
    animateNumber(totalItemsElement, parseInt(totalItemsElement.textContent) || 0, allItems.length);
    animateNumber(aiItemsElement, parseInt(aiItemsElement.textContent) || 0, aiItems.length);
    animateNumber(companyItemsElement, parseInt(companyItemsElement.textContent) || 0, companyItems.length);
}

// 모바일 터치 이벤트 최적화
let startY;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchmove', e => {
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;

    // 스크롤 감지하여 헤더 숨기기/보이기 (미래 확장용)
    if (Math.abs(diff) > 5) {
        const header = document.querySelector('.header');
        if (diff > 0) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
}, { passive: true }); 