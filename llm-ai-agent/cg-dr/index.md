# LLM을 활용한 AI 에이전트 개발 입문: 혼자 공부 가이드

**이 가이드는** *“Do it! LLM을 활용한 AI 에이전트 개발 입문”* 책의 내용을 토대로, 혼자서 단계별로 실습하고 학습할 수 있도록 정리한 **주피터 노트북 스타일 자료**입니다. Python과 주피터 노트북 환경에 익숙하지만, 컴퓨터 공학 전공자는 아니며 LangChain 라이브러리를 처음 접하는 독자를 염두에 두었습니다. VS Code의 Jupyter 확장과 OpenAI 호환 API를 사용할 수 있는 환경을 가정하며, **각 섹션마다 개념 설명과 함께 핵심 코드 예시**를 포함하였습니다. 회사 등 보안 제한이 있는 환경에서 실습할 경우를 대비하여 **특수 상황에서의 대처법**도 함께 설명합니다.

이 가이드를 따라가다 보면 **GPT API 활용 기본기부터, 텍스트/음성/이미지 처리, LangChain을 이용한 대화 메모리와 툴 통합, 검색 기능 연계, 최종적으로는 여러 에이전트를 조합한 고급 프로젝트 구현**까지 한걸음씩 배우게 됩니다. 

---

## OpenAI API 기본 사용법

시작하기에 앞서, OpenAI의 GPT API(챗GPT API)를 호출하는 기본 방법을 알아봅시다. OpenAI 계정에서 API 키를 발급받아 환경변수 `OPENAI_API_KEY`에 설정하거나 코드에서 직접 설정해야 합니다. 주피터 노트북에서는 다음과 같이 키를 지정할 수 있습니다:

```python
import openai
openai.api_key = "발급받은-나의-API키"
```

또는 `.env` 파일이나 OS 환경변수를 사용하는 방법도 있습니다 (예: `python-dotenv` 사용). 회사 내 폐쇄망 등에서 자체 호환 API를 쓰는 경우, OpenAI 라이브러리의 `api_base` 엔드포인트를 변경해주는 방식으로 설정할 수 있습니다. 예를 들어 내부 호환 API URL이 `https://corp-api.example.com/v1`라면 `openai.api_base = "https://corp-api.example.com/v1"` 과 같이 지정하면 호환됩니다.

**모델 선택:** OpenAI API에서는 `"gpt-3.5-turbo"`, `"gpt-4"` 등의 모델명을 사용합니다. 책의 코드에서는 `gpt-4` 기반 사설 모델 명시를 위해 `"gpt-4o"`처럼 접미사를 붙여 표기했으나(예: ), 실제로는 **사용 권한이 있는 모델 명**을 입력해야 합니다. 예제를 실행할 때 접근 가능한 모델로 변경하세요.

**한글 입출력:** GPT API는 기본적으로 다국어를 지원하므로 프롬프트와 응답을 한글로 주고받을 수 있습니다. 다만 정확한 결과를 얻기 위해 **역할(Role) 지시어와 구체적인 지침**을 프롬프트에 명시하는 것이 중요합니다. 예를 들어 시스템 프롬프트에 AI의 역할과 출력 형식을 한국어로 상세히 알려주는 식입니다.

이제 본격적인 각 챕터별 주제 학습을 시작하겠습니다.

---

## 문서 요약: PDF 텍스트 처리와 LLM 요약

**대용량 텍스트 요약**은 LLM 활용의 대표 사례입니다. 책의 4장에서는 **연구 보고서 PDF 문서**를 읽어 요약하는 과정을 다룹니다. 주요 단계는 **PDF -> 텍스트 변환**과 **텍스트 -> 요약 생성**으로 나뉩니다.

1. **PDF를 텍스트로 추출**  
   `PyPDF2`나 `pdfplumber` 등의 라이브러리를 이용해 PDF 파일의 본문을 추출합니다. 추출한 원문 텍스트는 용량이 크므로 필요시 **전처리(헤더/푸터 제거 등)**를 수행합니다.

2. **LLM에게 요약 요청**  
   ```python
   with open(file_path, 'r', encoding='utf-8') as f:
       txt = f.read()

   system_prompt = f'''
   너는 다음 글을 요약하는 봇이다. 아래 글을 읽고, 저자의 문제 인식과 주장을 파악하고, 주요 내용을 요약하라. 

   작성해야 하는 포맷은 다음과 같다. 
   # 제목
   ## 저자의 문제 인식 및 주장 (15문장 이내)
   ## 저자 소개

   =============== 이하 텍스트 ===============
   {txt}
   '''
   ```
   이후 GPT 호출로 요약 결과를 받습니다.

3. **응답 처리**  
   GPT가 생성한 요약 결과를 파일로 저장하거나 출력합니다.

> **회사 환경:** PDF 두 개(서울·뉴욕 계획 보고서)가 필요한데 사내 망 차단 시 외부에서 USB로 가져오거나 대체 공개 문서를 사용합니다.

---

## 음성 인식과 요약: Whisper를 활용한 STT

음성 녹음 파일을 받아 **1) 텍스트로 변환(STT)**하고, **2) 중요한 내용 요약**까지 진행합니다.

| 방법 | 장점 | 단점 |
|------|------|------|
| OpenAI Whisper API | 설치 없이 고정밀 | 인터넷 필요·비용 |
| Hugging Face Whisper | 오프라인 가능 | 첫 모델 다운로드 필요·속도 |

### 예시 (OpenAI Whisper)

```python
import openai
audio_file = open("meeting_record.mp3", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)
print(transcript['text'])
```

### 예시 (Hugging Face Whisper)

```python
from transformers import pipeline
stt_pipeline = pipeline(task="automatic-speech-recognition",
                        model="openai/whisper-small", device=0)
result = stt_pipeline("meeting_record.mp3")
text = result['text']
```

> **회사 환경:** Hugging Face 모델(수백 MB)을 사전에 다운로드해 캐시 폴더를 복사해 둡니다.

---

## 이미지 분석과 활용: 시각 정보 처리

이미지 캡션 생성 → LLM 활용

```python
from transformers import BlipProcessor, BlipForConditionalGeneration
processor = BlipProcessor.from_pretrained("Salesforce/blip2-flan-t5-xl")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip2-flan-t5-xl")

image = Image.open('busan_dive.jpg')
inputs = processor(image, "사진 설명를 한국어로 자세히 써줘.", return_tensors="pt")
result = model.generate(**inputs)
description = processor.decode(result[0], skip_special_tokens=True)
```

이후 GPT에게 `description`을 주고 Q&A, 퀴즈 등을 생성.

> **회사 환경:** 모델 용량 큼. 로컬 Vision API가 있으면 태그만 받아서 LLM에 넘기는 방법도 가능.

---

## GPT 함수 호출과 도구 통합

OpenAI Function Calling + LangChain Tool

```python
import datetime, openai

def get_current_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

functions = [
  {
    "name": "get_current_time",
    "description": "현재 시간을 문자열로 반환",
    "parameters": { "type": "object", "properties": {} }
  }
]

resp = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[{"role":"user","content":"지금 몇 시야?"}],
    functions=functions,
    function_call="auto"
)
```

클라이언트가 `function_call`을 감지하여 실제 함수를 실행한 뒤 결과를 GPT에 전달해 최종 응답 완성.

---

## LangChain 기초: LLMChain, 메모리, 프롬프트 템플릿

```python
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.chat_models import ChatOpenAI

conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=ConversationBufferWindowMemory(k=3)
)

print(conversation.predict(input="안녕?"))
print(conversation.predict(input="내가 방금 뭐라고 했지?"))
```

### Output Parser 예시 (Pydantic)

```python
class QA(BaseModel):
    answer: str
    reason: str
parser = PydanticOutputParser(pydantic_object=QA)
prompt = PromptTemplate(
    template="Q: {question}\nA:",
    input_variables=["question"],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)
chain = LLMChain(prompt=prompt, llm=ChatOpenAI(), output_parser=parser)
```

---

## LangChain 도구와 에이전트: 검색 통합

```python
from langchain.tools import DuckDuckGoSearchRun
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI

search = DuckDuckGoSearchRun()
agent = initialize_agent(
    tools=[search],
    llm=ChatOpenAI(),
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
agent.run("2025년 월드컵 개최지는 어디야?")
```

> **인터넷 차단 시:** DuckDuckGo 대신 사내 검색 API를 툴로 등록.

---

## 내부 모델과 데이터 활용: 로컬 LLM 및 RAG

### 로컬 LLM (Ollama)

```python
from langchain_ollama import ChatOllama
llm = ChatOllama(model="my-llama-model")
```

### RAG 기본 흐름

```python
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

embed = HuggingFaceEmbeddings(model_name="BAAI/bge-small-ko-en")
db = FAISS.from_texts(docs, embedding=embed)
retriever = db.as_retriever(search_kwargs={"k": 5})

qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=retriever
)
qa_chain.run("서울 2040 계획에서 지속가능성 언급이 나오나요?")
```

---

## 종합 프로젝트: 멀티에이전트 책 작성

1. **Content Strategist**: 챕터·섹션 계획 생성  
2. **Research Agent**: 관련 자료 검색  
3. **Communicator**: 본문 작성  
4. **Critic/Reviewer**: 내용 검토·수정  
5. **Supervisor**: 전체 흐름 관리  

LangGraph 스타일 코드(`book_writer.py`)에서 파이프(`|`) 연산자로 체인 연결.

---

## 결론

- **멀티모달 입력(텍스트·음성·이미지)** 처리 → LLM  
- **Function Calling / LangChain Tool**로 외부 정보 활용  
- **로컬 LLM + RAG**로 사내 데이터 안전 활용  
- **멀티에이전트** 협업으로 복잡한 작업 자동화

LLM 기술은 빠르게 진화합니다. 실습 코드 실행 → 프롬프트 수정 → 결과 비교 과정을 반복하며 **직관과 노하우**를 쌓아가세요. 🚀
