// 기술 트렌드 데이터
const techTrendData = [
    {
        date: "2025년 1월 25일",
        items: [
            {
                title: "DeepSeek-R1 GitHub",
                category: "ai-model",
                description: "중국의 AI 스타트업 DeepSeek이 공개한 'DeepSeek-R1'은 지도 학습 없이 강화 학습을 통해 추론 능력을 향상시킨 모델로, 오픈AI의 o1 모델과 유사한 성능을 보이며, 오픈 소스로 공개되어 연구 커뮤니티에 기여하고 있습니다.",
                link: "https://github.com/deepseek-ai/DeepSeek-R1"
            },
            {
                title: "트럼프 '스타게이트' 프로젝트",
                category: "policy",
                description: "도널드 트럼프 대통령은 오픈AI, 오라클, 소프트뱅크와 함께 텍사스주에 대규모 AI 데이터센터 건설 프로젝트인 '스타게이트'를 시작하여, 미국 내 AI 인프라를 강화하고 일자리 창출을 목표로 하고 있습니다.",
                link: "https://zdnet.co.kr/view/?no=20250124101204"
            },
            {
                title: "틱톡 미국 내 서비스 중단",
                category: "policy",
                description: "틱톡은 '틱톡 금지법'의 발효로 인해 미국 내 서비스를 일시적으로 중단하였으며, 앱 스토어에서도 삭제되었습니다. 서비스 재개 시기는 아직 불확실합니다.",
                link: "https://www.voakorea.com/a/7942230.html"
            },
            {
                title: "Apple AI 뉴스 알림 서비스 중단",
                category: "company",
                description: "애플은 AI가 생성한 뉴스 알림에서 잦은 오류가 발생함에 따라 해당 서비스를 일시 중단하고, 개선 작업에 착수했습니다.",
                link: "https://www.bbc.com/news/articles/cq5ggew08eyo"
            }
        ]
    },
    {
        date: "2025년 2월 2일",
        items: [
            {
                title: "Meta War Room 구성",
                category: "company",
                description: "최근 중국의 AI 스타트업 DeepSeek이 R1 모델을 공개하여 실리콘밸리에서 긴장감이 고조되고 있습니다. Meta의 CEO 마크 저커버그는 엔지니어들로 구성된 '워룸'을 조직하여 DeepSeek의 기술을 분석하고, 자사의 AI 모델인 Llama를 개선하기 위한 전략을 모색하고 있습니다.",
                link: "https://www.yahoo.com/news/meta-reportedly-scrambling-war-rooms-185625684.html"
            },
            {
                title: "OpenAI 오픈소스 전략 검토",
                category: "company",
                description: "오픈AI의 샘 알트먼 CEO가 일부 모델의 오픈 소스 전환을 고려 중이라고 밝혔습니다. 기존의 '모델 안전' 이유로 유지했던 정책을 DeepSeek 등장 이후 전략 수정을 검토하고 있으며, 사용료는 계속 낮출 계획이라고 언급했습니다.",
                link: "https://www.aitimes.com/news/articleView.html?idxno=167593"
            }
        ]
    },
    {
        date: "2025년 2월 9일",
        items: [
            {
                title: "OpenAI Deep Research 서비스",
                category: "tool",
                description: "OpenAI는 '딥 리서치'라는 새로운 AI 에이전트를 공개했습니다. 이 도구는 인터넷에서 다단계 연구를 수행해 신뢰성 높은 보고서를 자동 생성하며, ChatGPT Pro 사용자에게 월 $200에 제공됩니다.",
                link: "https://openai.com/index/introducing-deep-research/"
            },
            {
                title: "Gemini 2.0 모델군 공개",
                category: "ai-model",
                description: "구글은 제미나이 2.0 모델군을 공개했습니다. '제미나이 2.0 플래시'는 빠른 응답 속도를 제공하며, '프로 실험 버전'은 복잡한 프롬프트 처리와 코딩 성능이 강화되었습니다.",
                link: "https://blog.google/technology/google-deepmind/gemini-model-updates-february-2025/"
            },
            {
                title: "카카오-OpenAI 전략적 제휴",
                category: "company",
                description: "카카오는 오픈AI와 전략적 제휴를 체결했습니다. 양사는 AI 서비스 대중화를 목표로 기술 협력과 공동 상품 개발을 추진하며, 카카오톡과 AI 에이전트 서비스인 '카나나'에 오픈AI의 최신 AI 기술을 적용할 계획입니다.",
                link: "https://www.kakaocorp.com/page/detail/11450?lang=KOR"
            },
            {
                title: "정부 GPU 1.5만장 구입 계획",
                category: "policy",
                description: "과학기술정보통신부는 국가 AI 컴퓨팅 센터에 올해 안으로 GPU 1만 5천 장을 구축하겠다고 발표했습니다. 이는 당초 2030년까지 3만 장 확보 계획을 앞당긴 것으로, 글로벌 AI 경쟁에 대응하기 위한 조치입니다.",
                link: "https://zdnet.co.kr/view/?no=20250204181012"
            },
            {
                title: "삼성전자 AI 전략 전환",
                category: "company",
                description: "삼성전자가 자체 AI 플랫폼 '가우스'에 대한 추가 투자를 중단하고, 외부 AI 솔루션을 적극 도입하기로 결정했습니다. 이재용 회장의 오픈AI CEO와의 만남 이후 내린 결정으로, 다양한 분야에서 외부와의 협업을 통해 혁신적인 AI 기능을 제공할 계획입니다.",
                link: "https://www.finance-scope.com/article/view/scp202502070005"
            }
        ]
    },
    {
        date: "2025년 2월 16일",
        items: [
            {
                title: "퍼플렉시티 딥 리서치 기능",
                category: "tool",
                description: "자체 검색 엔진을 가지고 있는 퍼플렉시티에서 OpenAI의 심층 리서치 기능과 비슷한 기능을 공개했습니다.",
                link: "https://www.perplexity.ai/ko/hub/blog/introducing-perplexity-deep-research"
            },
            {
                title: "Agent Laboratory 오픈소스",
                category: "tool",
                description: "Agent Laboratory는 대형 언어 모델(LLM) 에이전트를 활용하여 연구 아이디어를 종합적인 연구 보고서와 코드 저장소로 발전시키는 오픈 소스 프로젝트입니다. 문헌 검토, 실험 수행, 보고서 작성 등 연구의 모든 단계를 지원합니다.",
                link: "https://agentlaboratory.github.io/"
            },
            {
                title: "메타-퓨리오사AI 인수 논의",
                category: "company",
                description: "메타가 한국의 AI 반도체 스타트업인 퓨리오사AI를 인수하기 위한 논의를 진행 중이라고 포브스가 보도했습니다.",
                link: "https://www.cio.com/article/3823460/%EB%A9%94%ED%83%80-%ED%95%9C%EA%B5%AD-ai-%EB%B0%98%EB%8F%84%EC%B2%B4-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%ED%93%A8%EB%A6%AC%EC%98%A4%EC%82%ACai-%EC%9D%B8%EC%88%98-%EB%85%BC%EC%9D%98.html"
            }
        ]
    },
    {
        date: "2025년 3월 1일",
        items: [
            {
                title: "Grok 3 서비스 공개",
                category: "ai-model",
                description: "X(구 트위터)의 AI 모델 Grok 3가 서비스를 공개했습니다.",
                link: "https://wowtale.net/2025/02/19/237262/"
            }
        ]
    },
    {
        date: "2025년 3월 22일",
        items: [
            {
                title: "OpenManus 오픈소스 프로젝트",
                category: "tool",
                description: "Invite Code 없이도 Manus의 기능을 활용 가능한 오픈소스 프로젝트로, MetaGPT 팀에서 개발했습니다. conda 또는 uv를 사용한 설치 방법과 API 키 설정을 제공합니다.",
                link: "https://github.com/mannaandpoem/OpenManus"
            },
            {
                title: "Open-Source MCP 서버들",
                category: "tool",
                description: "AI 기능을 확장하는 다양한 MCP 서버들을 소개하며, 파일 접근, 데이터베이스 연결, API 통합 등의 기능을 제공합니다. 웹 스크래핑, 검색, 데이터 추출 등의 도구를 활용할 수 있습니다.",
                link: "https://glama.ai/mcp/servers"
            },
            {
                title: "Cursor MCP 기능 업데이트",
                category: "tool",
                description: "Cursor에 Model Context Protocol 기능이 업데이트되었습니다.",
                link: "https://docs.cursor.com/context/model-context-protocol"
            }
        ]
    },
    {
        date: "2025년 4월 14일",
        items: [
            {
                title: "추론 모델의 사고 과정 연구",
                category: "ai-model",
                description: "AI 모델의 Chain-of-Thought(CoT)가 항상 모델의 실제 추론 과정을 반영하지 않으며, 특히 모델이 보상 해킹을 통해 잘못된 정보를 학습했을 때 더욱 그렇다는 연구 결과가 발표되었습니다.",
                link: "https://www.anthropic.com/research/reasoning-models-dont-say-think"
            },
            {
                title: "LLM 튜링 테스트 통과",
                category: "ai-model",
                description: "GPT-4.5가 튜링 테스트에서 73%의 성공률로 인간으로 오인받아 최초로 표준 튜링 테스트를 통과했으며, 이는 LLM의 지능 및 사회경제적 영향에 대한 논쟁에 중요한 함의를 가집니다.",
                link: "https://arxiv.org/abs/2503.23674"
            }
        ]
    },
    {
        date: "2025년 4월 20일",
        items: [
            {
                title: "OpenAI Codex CLI",
                category: "tool",
                description: "터미널에서 실행되는 경량 코딩 에이전트로, ChatGPT 수준의 추론과 코드 실행 능력을 결합하여 개발 생산성을 향상시킵니다. 보안 샌드박스 환경에서 자동 승인 및 파일 조작이 가능합니다.",
                link: "https://github.com/openai/codex"
            }
        ]
    },
    {
        date: "2025년 4월 27일",
        items: [
            {
                title: "AI 도구 시스템 프롬프트 공개",
                category: "tool",
                description: "v0, Cursor, Manus, Same.dev, Lovable, Devin, Replit Agent, Windsurf Agent, VSCode Agent 등의 시스템 프롬프트와 내부 도구 6,500+ 라인이 공개되었습니다.",
                link: "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/tree/main"
            },
            {
                title: "Anthropic Prompt Engineering 튜토리얼",
                category: "tool",
                description: "Anthropic에서 제공하는 Prompt Engineering 인터랙티브 튜토리얼 코스 자료가 공개되었습니다.",
                link: "https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial/Anthropic%201P"
            },
            {
                title: "Cluely AI 회의 도우미",
                category: "tool",
                description: "Cluely는 가상 회의 및 영업 통화에 특화된 AI 기반 도우미로, 실시간으로 생각을 증폭시키고 모든 이의를 즉시 해결합니다. Mac용 다운로드와 Windows 대기자 명단을 제공합니다.",
                link: "https://cluely.com/#features"
            },
            {
                title: "ChatGPT 텍스트 워터마크",
                category: "ai-model",
                description: "최신 GPT-o3 및 o4 미니 모델이 생성된 텍스트에 특수 문자 워터마크를 삽입하는 것으로 보이며, 이는 표절 감지에 유용할 수 있지만 쉽게 제거될 수 있습니다.",
                link: "https://www.rumidocs.com/newsroom/new-chatgpt-models-seem-to-leave-watermarks-on-text"
            }
        ]
    },
    {
        date: "2025년 5월 11일",
        items: [
            {
                title: "MCP SuperAssistant",
                category: "tool",
                description: "AI 플랫폼이 데이터 및 도구에 안전하게 연결되도록 지원하는 개방형 표준입니다.",
                link: "https://mcpsuperassistant.ai/"
            },
            {
                title: "KT-업스테이지 태국어 LLM",
                category: "company",
                description: "KT와 업스테이지가 태국 JTS와 협력하여 태국어 대형언어모델(LLM) 플랫폼 구축을 완료했습니다.",
                link: "https://www-aitimes-kr.cdn.ampproject.org/c/s/www.aitimes.kr/news/articleViewAmp.html?idxno=34616"
            }
        ]
    },
    {
        date: "2025년 5월 18일",
        items: [
            {
                title: "AlphaEvolve: Gemini 기반 코딩 에이전트",
                category: "tool",
                description: "구글 딥마인드가 제미니 기반의 AI 코딩 에이전트 '알파이볼브'를 발표했습니다. 이 에이전트는 알고리즘을 발견하고 최적화하며, 구글 인프라 개선 및 수학 문제 해결에 활용되고 있습니다.",
                link: "https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/"
            },
            {
                title: "LeRobot: 허깅페이스 로봇 AI",
                category: "tool",
                description: "PyTorch 기반의 실제 로봇 AI를 위한 라이브러리입니다. 모델, 데이터셋, 도구를 제공하여 로봇 공학 진입 장벽을 낮추고 공유를 장려합니다.",
                link: "https://github.com/huggingface/lerobot"
            }
        ]
    },
    {
        date: "2025년 6월 1일",
        items: [
            {
                title: "Google DeepMind Veo",
                category: "ai-model",
                description: "Google DeepMind가 최신 동영상 생성 모델 Veo를 공개했습니다.",
                link: "https://deepmind.google/models/veo/"
            },
            {
                title: "Gemini 2.5 Pro",
                category: "ai-model",
                description: "구글의 최신 AI 모델인 Gemini 2.5 Pro는 코딩과 복잡한 작업에 최적화되었습니다. 향상된 추론, 긴 컨텍스트, 멀티모달 기능 등을 제공합니다.",
                link: "https://deepmind.google/models/gemini/pro/"
            },
            {
                title: "업스테이지 Solar Pro 2 Preview",
                category: "ai-model",
                description: "업스테이지가 31B 크기에도 70B급 성능을 내는 'Solar Pro 2 Preview' 모델을 공개했습니다.",
                link: "https://www.upstage.ai/blog/en/solar-pro-2-preview-small-powerful-now-with-reasoning"
            },
            {
                title: "Anthropic API 에이전트 기능",
                category: "tool",
                description: "Anthropic API에 코드 실행, MCP 커넥터, 파일 API, 확장된 프롬프트 캐싱 등 에이전트 구축을 위한 네 가지 새로운 기능이 추가되었습니다.",
                link: "https://www.anthropic.com/news/agent-capabilities-api"
            },
            {
                title: "제미나이 코드 어시스트 정식 출시",
                category: "tool",
                description: "개인용 및 깃허브용 제미나이 코드 어시스트가 제미나이 2.5 기반으로 정식 출시되었습니다. 채팅 기록, 규칙, 맞춤 명령어 등 새로운 기능이 추가되어 개발 효율성을 높입니다.",
                link: "https://blog.google/intl/ko-kr/company-news/technology/gemini-code-assist-updates-google-io-2025-kr/"
            },
            {
                title: "Gemma 3n 경량 멀티모달 모델",
                category: "ai-model",
                description: "구글이 Gemini 기술 기반의 경량 오픈 모델 'Gemma 3n' 프리뷰 버전을 공개했습니다. 저사양 기기에서도 효율적으로 실행되며 텍스트, 이미지, 오디오 등 멀티모달 입력을 지원합니다.",
                link: "https://huggingface.co/google/gemma-3n-E2B-it-litert-preview"
            },
            {
                title: "윈도우 11 MCP 보안 강화",
                category: "tool",
                description: "윈도우 11에서 AI 에이전트의 안전한 작동을 위해 Model Context Protocol(MCP)의 보안을 강화합니다.",
                link: "https://blogs.windows.com/windowsexperience/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/"
            },
            {
                title: "SKT 에이닷엑스 4.1 모델",
                category: "ai-model",
                description: "SK텔레콤이 딥시크 R1의 9분의 1 크기인 720억 개 파라미터 모델 '에이닷엑스4.1'로 동급의 추론 성능을 달성했습니다. 비용과 GPU 의존도를 줄여 한국 기업의 AI 경쟁력 강화에 기여합니다.",
                link: "https://n.news.naver.com/article/011/0004488990"
            }
        ]
    },
    {
        date: "2025년 6월 8일",
        items: [
            {
                title: "오픈AI 한국 법인 설립",
                category: "company",
                description: "오픈AI가 한국에 법인을 설립하고 서울에 첫 사무소를 개설할 계획이라고 밝혔습니다.",
                link: "https://www.newsis.com/view/NISX20250526_0003189898"
            },
            {
                title: "앤트로픽 매출 3배 증가",
                category: "company",
                description: "앤트로픽의 연간 예측 매출이 5개월 만에 3배 증가한 30억달러에 달하며 빠른 성장세를 보이고 있습니다.",
                link: "https://www.aitimes.com/news/articleView.html?idxno=170948"
            },
            {
                title: "Cursor 4월 인기 모델",
                category: "tool",
                description: "Cursor 공식 계정에 따르면 4월 기준으로 사용자에게 가장 인기 있었던 모델은 Claude 3.7 Sonnet입니다.",
                link: "https://www.threads.net/@zeratul979/post/DKZpmnwz1JM"
            },
            {
                title: "Cursor 1.0 출시",
                category: "tool",
                description: "BugBot 자동 코드 리뷰, Background Agent 전체 공개, 원클릭 MCP 설치, Jupyter 지원 및 Memories 베타 기능을 제공합니다. 시각화 렌더링, 새로운 설정 및 대시보드, 팀 관리 기능이 강화되었습니다.",
                link: "https://www.cursor.com/changelog/1-0"
            }
        ]
    },
    {
        date: "2025년 6월 15일",
        items: [
            {
                title: "애플 AI 뒤처짐 분석",
                category: "company",
                description: "애플이 폐쇄적인 생태계와 경영진의 AI에 대한 낮은 관심으로 AI 경쟁에서 뒤쳐지고 있으며, 외부 기술 영입도 늦어지고 있다는 분석이 나왔습니다.",
                link: "https://www.dogdrip.net/639225025"
            },
            {
                title: "컬리 개발자 AI 코딩 시험",
                category: "company",
                description: "컬리가 개발자 채용 과정에서 AI를 활용한 코딩 시험을 도입하며, AI 활용 능력을 개발자의 역량으로 간주합니다. IT 업계는 AI 코딩 실력 향상에 따라 개발자 채용 시장의 양극화를 전망합니다.",
                link: "https://www.joongang.co.kr/article/25342519"
            }
        ]
    },
    {
        date: "2025년 6월 22일",
        items: [
            {
                title: "Gemini 2.5 추론 능력 강화",
                category: "ai-model",
                description: "Gemini 2.5는 추론 능력을 강화하여 성능과 정확도를 향상시키고, 개발자는 모델의 사고 과정을 제어하여 리소스 사용을 관리할 수 있습니다. 다양한 벤치마크에서 최첨단 성능을 보입니다.",
                link: "https://deepmind.google/models/gemini/"
            },
            {
                title: "앤트로픽 AI 인재 영입",
                category: "company",
                description: "앤트로픽이 메타, 딥마인드, 오픈AI 등 경쟁사의 핵심 인력을 대거 흡수하며 AI 업계에서 영향력을 확대하고 있습니다. 자율성과 안전성에 초점을 맞춘 기업 가치와 독특한 문화가 고급 인재들을 끌어들이는 요인으로 분석됩니다.",
                link: "https://zdnet.co.kr/view/?no=20250614125947#_DYAD"
            },
            {
                title: "제미나이 디퓨전 모델",
                category: "ai-model",
                description: "구글이 이미지 생성 기술의 '확산' 방식을 언어모델에 접목한 '제미나이 디퓨전'을 공개했습니다. 기존 자기회귀 방식보다 최대 7배 빠르고 정확하며, 비용 효율적인 차세대 LLM으로 주목받고 있습니다.",
                link: "https://www.aitimes.com/news/articleView.html?idxno=171352"
            },
            {
                title: "네이버 전사 커서 도입",
                category: "company",
                description: "네이버가 4500명 직원에게 AI 코딩 플랫폼 '커서'를 도입하여 개발 효율을 높이고, 커서 운영사 애니스피어의 CEO와 네이버 임원진이 면담을 가졌습니다. 전사적으로 AI 기술 적용을 확대할 계획입니다.",
                link: "https://v.daum.net/v/20250618142624976"
            }
        ]
    },
    {
        date: "2025년 6월 29일",
        items: [
            {
                title: "Gemini CLI 도구",
                category: "tool",
                description: "Gemini CLI는 터미널에서 Gemini AI를 사용하는 명령줄 도구입니다. 코드 탐색, 작업 자동화, 다양한 도구 연동 등 개발 워크플로우를 가속화합니다.",
                link: "https://github.com/google-gemini/gemini-cli/"
            },
            {
                title: "정부 1.5조원 GPU 사업",
                category: "policy",
                description: "정부가 1.5조원을 투입하는 GPU 확보 사업에 네이버, 쿠팡 등 클라우드 기업들이 관심을 보이며 참여를 검토하고 있습니다. 최신 GPU를 확보하여 산학연과 스타트업에 제공하는 구조로 진행됩니다.",
                link: "https://m.ddaily.co.kr/page/view/2025062310554201328"
            },
            {
                title: "업스테이지-모티프 K-AI 모델 도전",
                category: "company",
                description: "업스테이지와 모티프가 정부의 독자 AI 파운데이션 모델 개발 프로젝트에 도전하며, 6개월 이내 출시된 글로벌 모델 대비 95% 이상의 성능을 목표로 합니다.",
                link: "https://www.aitimes.com/news/articleView.html?idxno=200094"
            },
            {
                title: "구글 딥마인드 알파지놈",
                category: "ai-model",
                description: "구글 딥마인드가 DNA 글자 100만 개를 동시에 분석하고 유전자 조절 정보를 예측하는 AI 모델 '알파지놈'을 공개했습니다. 희귀 질환 연구 등 복잡한 유전 정보 분석에 활용될 것으로 기대됩니다.",
                link: "https://zdnet.co.kr/view/?no=20250626095528#_DYAD"
            }
        ]
    }
];

// 카테고리 정보
const categoryInfo = {
    "ai-model": {
        name: "AI 모델",
        color: "category-ai-model",
        icon: "fas fa-robot"
    },
    "company": {
        name: "기업 동향",
        color: "category-company",
        icon: "fas fa-building"
    },
    "policy": {
        name: "정부 정책",
        color: "category-policy",
        icon: "fas fa-landmark"
    },
    "tool": {
        name: "개발 도구",
        color: "category-tool",
        icon: "fas fa-tools"
    },
    "startup": {
        name: "스타트업",
        color: "category-startup",
        icon: "fas fa-rocket"
    }
}; 