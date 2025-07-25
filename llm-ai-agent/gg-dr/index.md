[# 실무자를 위한 'Do it! LLM AI 에이전트 개발 입문' 완전 정복 가이드

## 서문: 보안 환경에서의 성공적인 학습을 위한 로드맵

이 문서는 『Do it! LLM을 활용한 AI 에이전트 개발 입문』[1, 2]을 기반으로, 특히 기업의 엄격한 보안 정책으로 인해 외부 데이터 접근에 제약이 있는 학습자를 위해 제작된 종합 독학 가이드입니다. 책의 모든 장을 심도 있게 다루며, 예제 코드[4] 실행에 필수적인 데이터셋을 공개된 대체 경로에서 확보하고, 이를 원본 코드에 통합하는 구체적이고 실용적인 방법을 제시합니다.

본 가이드를 통해 학습자는 환경적 제약 없이 책의 모든 내용을 온전히 습득하고, 실무에 즉시 적용 가능한 AI 에이전트 개발 역량을 체계적으로 갖추게 될 것입니다.

### 1. 학습 준비: 핵심 라이브러리 및 데이터셋 대체 전략

성공적인 실습을 위해서는 안정적이고 재현 가능한 개발 환경 구축이 선행되어야 합니다. 아래 표는 책의 `requirements.txt` 파일에 접근할 수 없는 상황을 가정하여, 원활한 실습에 필요한 핵심 라이브러리와 그 역할을 정리한 것입니다.

**표 1: 핵심 라이브러리 및 환경 설정**

| 라이브러리 (Library) | 권장 버전 (Version) | 책에서의 주요 역할 | 관련 챕터 |
| :--- | :--- | :--- | :--- |
| `openai` | `~=1.23.0` | OpenAI의 GPT, Whisper, Embedding 등 핵심 API와 상호작용 | 2-16 |
| `langchain` | `~=0.2.0` | LLM 애플리케이션 구축을 위한 핵심 프레임워크. 체인, 에이전트, 도구 등 제공 | 8-16 |
| `langchain-openai` | `~=0.1.7` | LangChain과 OpenAI 모델(LLM, Embedding)을 연동 | 8-16 |
| `langgraph` | `~=0.1.0` | 상태 기반의 순환 및 조건부 로직을 포함한 복잡한 멀티 에이전트 시스템 구축 | 12-15 |
| `streamlit` | `~=1.35.0` | 챗봇 및 데모 애플리케이션을 위한 대화형 웹 UI를 신속하게 개발 | 3, 7, 9 |
| `python-dotenv` | `~=1.0.1` | API 키와 같은 민감한 정보를 `.env` 파일로 분리하여 안전하게 관리 | 2-16 |
| `pypdf` | `~=4.2.0` | PDF 파일에서 텍스트를 추출하고 전처리하는 데 사용 | 4, 9, 13 |
| `langchain-community` | `~=0.2.0` | 다양한 커뮤니티 기반의 Document Loader, Tool 등을 포함 | 9, 10, 11 |
| `faiss-cpu` | `~=1.8.0` | RAG 구현 시 텍스트 청크를 벡터로 변환하여 로컬에 저장하고 검색하는 벡터 DB | 9, 13 |
| `ollama` | `~=0.2.1` | Llama, DeepSeek 등 오픈소스 LLM을 로컬 환경에서 구동 | 11, 16 |
| `tavily-python` | `~=0.3.3` | LangChain 에이전트가 실시간 정보를 얻기 위해 사용하는 Tavily 검색 엔진 API | 10, 12 |
| `yfinance` | `~=0.2.38` | Function Calling 예제에서 실시간 미국 주식 정보를 가져오는 데 사용 | 7 |
| `beautifulsoup4` | `~=4.12.3` | 웹 검색 결과(HTML)에서 특정 정보를 스크레이핑하여 추출 | 10 |
| `requests` | `~=2.31.0` | 프로그래밍 방식으로 웹의 파일(PDF, 오디오 등)을 다운로드 | 4, 5 |

**표 2: 데이터셋 문제 해결 및 대체 방안**

본 가이드의 핵심은 보안 제약으로 접근이 불가능한 원본 데이터셋을 공개적으로 접근 가능한 대체 데이터로 교체하는 것입니다. 아래 표는 각 챕터별 데이터셋 변경 사항과 그에 대한 논리적 근거를 요약하여 제공합니다.

| 챕터 | 원본 데이터 (추정) | 대체 데이터 | 선택 근거 및 해결 전략 |
| :--- | :--- | :--- | :--- |
| **4장, 9장, 13장** | 특정 주제의 PDF 파일 (클라우드 드라이브) | **"Attention Is All You Need" 논문 PDF** (arXiv.org 공개) | LLM 분야의 핵심 논문으로 주제 관련성이 높고, arXiv에서 안정적인 URL로 공개 제공되어 프로그래밍 방식으로 다운로드하기 용이합니다. `requests` 라이브러리를 사용하여 직접 다운로드하는 코드를 제공합니다. |
| **5장** | 다자간 대화 음성 파일 (클라우드 드라이브) | **LibriVox의 다중 낭독자 오디오북 클립** (archive.org 공개) | 공개 도메인 오디오북 저장소로, 합법적이고 안정적인 다운로드 링크를 제공합니다. 여러 목소리가 포함된 'Dramatic Reading' 클립을 사용하여 화자 분리 실습 목표를 달성합니다. `requests` 라이브러리를 사용합니다. |

---

## 제 1 부: LLM과 친해지기 (1-3장)

### 제 2 장: 환경 설정하고 GPT API 시작하기

이 장의 핵심은 안전하고 재현 가능한 개발 환경을 구축하는 것입니다. 특히 기업 환경에서는 API 키와 같은 민감 정보 관리가 매우 중요합니다.

**실습: `python-dotenv`를 이용한 안전한 API 키 관리**

1.  **`.env` 파일 생성**: 프로젝트 루트 디렉터리에 `.env` 파일을 만들고 아래와 같이 API 키를 저장합니다. 이 파일은 `.gitignore`에 추가하여 Git 저장소에 올라가지 않도록 해야 합니다.

    ```
    # .env
    OPENAI_API_KEY="sk-..."
    ```

2.  **파이썬 코드에서 키 로딩**: `dotenv` 라이브러리를 사용하여 환경 변수를 로드하고 사용합니다.

    ```python
    # 02-1_openai_api.py (수정 예시)
    import openai
    import os
    from dotenv import load_dotenv

    # .env 파일에서 환경 변수 로드
    load_dotenv()

    # 환경 변수에서 API 키 가져오기
    api_key = os.getenv("OPENAI_API_KEY")

    # API 키 설정
    openai.api_key = api_key

    # 이제부터 openai 라이브러리를 안전하게 사용할 수 있습니다.
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": "안녕하세요!"}]
    )
    print(response.choices[0].message.content)
    ```

---

## 제 2 부: 나만의 AI 비서 만들기 (4-7장)

이 파트에서는 LLM의 한계를 보완하는 핵심 기술들을 활용하여 구체적인 목적을 가진 AI 비서를 만듭니다. 데이터셋 접근 문제를 해결하는 것이 핵심입니다.

### 제 4 장: AI 연구원 만들기 (PDF 분석 및 요약)

**문제 상황**: 책의 예제 코드 `04-1_document_researcher.py`는 클라우드 드라이브에 저장된 PDF 파일을 사용하도록 되어 있어, 보안 환경에서는 실행이 불가능합니다.

**해결 전략**: LLM 분야의 기념비적인 논문인 "Attention Is All You Need"를 공개 저장소인 arXiv에서 직접 다운로드하여 로컬 파일로 사용합니다.

**코드 수정 제안**

1.  **데이터셋 다운로드 코드 추가**: PDF를 다운로드하는 헬퍼 함수를 만듭니다. 이 코드를 메인 스크립트 실행 전에 한 번만 실행하여 파일을 준비합니다.

    ```python
    # download_assets.py
    import requests
    import os

    def download_pdf(url, save_path):
        """지정된 URL에서 PDF를 다운로드하여 저장합니다."""
        if not os.path.exists(save_path):
            print(f"'{save_path}' 다운로드 중...")
            response = requests.get(url, stream=True)
            response.raise_for_status()  # 요청 실패 시 예외 발생
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print("다운로드 완료.")
        else:
            print(f"'{save_path}' 파일이 이미 존재합니다.")

    if __name__ == "__main__":
        # "Attention Is All You Need" 논문 PDF
        pdf_url = "[https://arxiv.org/pdf/1706.03762.pdf](https://arxiv.org/pdf/1706.03762.pdf)"
        save_dir = "data"
        os.makedirs(save_dir, exist_ok=True)
        pdf_path = os.path.join(save_dir, "attention_is_all_you_need.pdf")
        download_pdf(pdf_url, pdf_path)
    ```

2.  **원본 코드 수정**: `04-1_document_researcher.py`에서 PDF 파일 경로를 우리가 다운로드한 로컬 경로로 변경합니다.

    ```python
    # 04-1_document_researcher.py (수정 후)
    from langchain_community.document_loaders import PyPDFLoader

    # ... (기타 import 및 설정) ...

    # 클라우드 드라이브 링크 대신 로컬 파일 경로 사용
    # 원본 코드: loader = PyPDFLoader(file_path="...")
    file_path = "data/attention_is_all_you_need.pdf"
    loader = PyPDFLoader(file_path=file_path)
    
    pages = loader.load_and_split()

    # ... (이후 로직은 동일) ...
    print(f"'{file_path}'에서 총 {len(pages)}개의 페이지를 로드했습니다.")
    ```

### 제 5 장: AI 서기 만들기 (음성 파일 분석)

**문제 상황**: `05-2_meeting_minutes_generator.py` 예제는 여러 사람이 말하는 음성 파일을 클라우드에서 가져와 화자 분리 후 요약하는 기능을 수행하지만, 파일 접근이 불가능합니다.

**해결 전략**: 공개 오디오 라이브러리인 LibriVox에서 여러 낭독자가 참여한 'Dramatic Reading' 오디오 파일을 다운로드하여 대체 데이터로 사용합니다.

**코드 수정 제안**

1.  **데이터셋 다운로드 코드 추가**: `download_assets.py`에 오디오 파일 다운로드 기능을 추가합니다.

    ```python
    # download_assets.py (수정)
    import requests
    import os

    def download_file(url, save_path):
        # ... (이전 PDF 다운로드 함수와 유사하게 구현) ...
        if not os.path.exists(save_path):
            print(f"'{save_path}' 다운로드 중...")
            response = requests.get(url, stream=True)
            # ... (이하 동일) ...
        else:
            print(f"'{save_path}' 파일이 이미 존재합니다.")

    if __name__ == "__main__":
        # ... (PDF 다운로드 코드) ...

        # "The Canterville Ghost (dramatic reading)" 오디오 파일
        audio_url = "[https://archive.org/download/cantervilleghost_dr_librivox/cantervilleghost_1_wilde_64kb.mp3](https://archive.org/download/cantervilleghost_dr_librivox/cantervilleghost_1_wilde_64kb.mp3)"
        save_dir = "data"
        os.makedirs(save_dir, exist_ok=True)
        audio_path = os.path.join(save_dir, "canterville_ghost_part1.mp3")
        download_file(audio_url, audio_path)
    ```

2.  **원본 코드 수정**: `05-2_meeting_minutes_generator.py`에서 음성 파일 경로를 로컬 경로로 수정합니다.

    ```python
    # 05-2_meeting_minutes_generator.py (수정 후)
    # ... (import 및 API 키 설정) ...

    # 로컬에 다운로드한 오디오 파일 경로 지정
    audio_file_path = "data/canterville_ghost_part1.mp3"

    # Whisper API를 사용하여 텍스트 추출
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="verbose_json",
            timestamp_granularities=["word"]
        )
    
    # ... (이후 화자 분리 및 요약 로직은 원본 코드와 유사하게 진행) ...
    # 참고: 화자 분리(diarization) 로직은 오디오 특성에 따라
    # 파라미터 튜닝이 필요할 수 있습니다.
    ```

---

## 제 3 부 & 4 부: RAG, 에이전트, 그리고 멀티에이전트 (8-16장)

이 파트의 실습들은 대부분 1, 2부에서 다룬 기술과 데이터를 기반으로 합니다. 특히 RAG(검색 증강 생성) 관련 챕터는 4장에서 사용한 PDF 데이터에 의존합니다.

### 제 9 장 & 13 장: RAG 챗봇 및 에이전트 만들기

**문제 상황**: RAG 시스템을 구축하기 위한 외부 지식 베이스(PDF)가 필요합니다.

**해결 전략**: 4장에서 이미 다운로드한 **"Attention Is All You Need" 논문 PDF (`data/attention_is_all_you_need.pdf`)**를 그대로 재사용합니다. 이는 학습의 연속성을 보장하고, 하나의 데이터를 다양한 AI 작업(요약, 질의응답)에 활용하는 실무적인 시나리오를 경험하게 합니다.

**코드 적용**: 9장과 13장의 예제 코드에서 PDF 파일 경로를 묻는 부분이 있다면, `data/attention_is_all_you_need.pdf` 경로를 일관되게 사용하도록 코드를 수정하거나, 실행 시 해당 경로를 입력합니다.

```python
# 09-1_rag_chatbot.py (수정 예시)

# ... (기타 설정) ...

# PDF 파일 경로를 명시적으로 지정
pdf_path = "data/attention_is_all_you_need.pdf"

# 문서 로드
loader = PyPDFLoader(pdf_path)
documents = loader.load()

# 텍스트 분할
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
texts = text_splitter.split_documents(documents)

# 벡터 저장소 생성 (FAISS 사용)
# ... (이후 RAG 파이프라인 구축 로직은 동일) ...
](https://regpath.github.io/llm-ai-agent/gg-dr/)
