import React, { useState } from 'react';

// 메인 앱 컴포넌트
const App = () => {
  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState('summary');

  // 문서의 모든 섹션 데이터
  const sections = {
    summary: {
      title: '요약',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            2025년 8월 7일 출시된 GPT-5는 인공지능 분야의 중요한 진전으로 평가받습니다. OpenAI CEO 샘 알트만은 GPT-5를 "박사 수준의 전문가"에 비유하며, 단순한 업그레이드가 아닌 "시스템 수준의 변화"라고 강조했습니다. 이 모델은 추론, 코딩, 글쓰기, 건강 관리 등 다양한 분야에서 성능이 크게 향상되었으며, 환각 현상을 줄이고 에이전트 기능을 강화했습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 2, 3]</a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5는 혼합 전문가(MoE) 원칙을 통합한 "통합 시스템" 아키텍처를 사용합니다. 지능형 라우터가 쿼리를 전문화된 모델로 동적으로 라우팅하여 성능과 효율성을 최적화합니다. MoE는 모델 용량을 확장하면서도 계산 오버헤드를 최소화하여, "경쟁력 있는" 가격 책정의 핵심 요소가 되었습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[7, 9, 10]</a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            OpenAI는 ChatGPT 사용자를 위해 계층별 사용량 정책을 시행하며, API 접근은 다양한 계층으로 제공됩니다. 특히, Microsoft 생태계에 깊이 통합되어 Copilot 사용자는 더 높은 사용량 제한을 받습니다. 이는 전략적 파트너십의 중요성을 보여줍니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 7]</a>
          </p>
        </>
      ),
    },
    intro: {
      title: 'GPT-5 소개',
      content: (
        <>
          <h3 className="text-xl font-semibold mb-2">공식 출시 및 전략적 포지셔닝</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5는 2025년 8월 7일 Microsoft 365 Copilot 등 Microsoft 생태계 전반에 걸쳐 우선 출시되었고, OpenAI 플랫폼에는 점진적으로 배포될 예정입니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 2, 3, 8]</a> OpenAI CEO 샘 알트만은 GPT-5를 "AGI(범용 인공지능)를 향한 중요한 단계"로 소개하며 장기 비전과 즉각적인 시장 영향력을 동시에 강조했습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[4]</a> 이는 Microsoft와의 파트너십을 통해 신속한 기업 통합을 유도하려는 전략적 움직임입니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1]</a>
          </p>
          <h3 className="text-xl font-semibold mb-2">주요 발전 및 역량</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5는 "가장 똑똑하고 유능한" 모델로, 특히 환각 현상이 현저히 줄었습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[7, 11]</a> 코딩 능력, 건강 관리 지원, 에이전트 능력, 다중 모드 기능, 그리고 세션 간 기억력을 유지하는 '영구 기억력'이 핵심 개선 사항입니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 6, 8, 9, 10]</a>
          </p>
          <h3 className="text-xl font-semibold mb-2">"박사 수준 전문가" 비유와 통합 시스템 설계</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            샘 알트만은 GPT-5를 "박사 수준의 전문가"로 묘사하며, 사용자가 모델을 수동으로 선택할 필요 없이 시스템이 쿼리에 가장 적합한 내부 모델로 자동 라우팅하는 "통합 AI 시스템"을 도입했습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 4, 7, 10, 15]</a> 이는 사용자 경험을 단순화하고 효율성을 높이는 중요한 변화입니다.
          </p>

          <h3 className="text-xl font-semibold mb-2">표 1: GPT-5 모델 제품군 및 주요 특성</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-6">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">모델명</th>
                  <th className="py-3 px-6 text-left">지식 차단 시점</th>
                  <th className="py-3 px-6 text-left">컨텍스트 창 (토큰)</th>
                  <th className="py-3 px-6 text-left">주요 기능</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">GPT-5 (메인)</td>
                  <td className="py-3 px-6 text-left">2024년 9월 30일</td>
                  <td className="py-3 px-6 text-left">400,000</td>
                  <td className="py-3 px-6 text-left">추론, 코딩, 채팅, 에이전트 행동, 영구 기억, 다중 모드<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 19, 20]</a></td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">GPT-5 Mini</td>
                  <td className="py-3 px-6 text-left">2024년 5월 30일</td>
                  <td className="py-3 px-6 text-left">400,000</td>
                  <td className="py-3 px-6 text-left">경량 버전, 사용량 제한 도달 시 대체 모델<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 7, 19, 21]</a></td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">GPT-5 Nano</td>
                  <td className="py-3 px-6 text-left">2024년 5월 30일</td>
                  <td className="py-3 px-6 text-left">400,000</td>
                  <td className="py-3 px-6 text-left">가장 작고 비용 효율적인 모델<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 18, 19]</a></td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">GPT-5 Thinking (Pro)</td>
                  <td className="py-3 px-6 text-left">2024년 9월 30일</td>
                  <td className="py-3 px-6 text-left">400,000</td>
                  <td className="py-3 px-6 text-left">심층 추론, Pro/Team 사용자 전용<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 7, 9, 10]</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    moe: {
      title: 'MoE 아키텍처',
      content: (
        <>
          <h3 className="text-xl font-semibold mb-2">혼합 전문가(MoE) 원리</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            MoE는 복잡한 작업을 "전문가"라 불리는 작은 네트워크로 분할하는 신경망 아키텍처입니다. "게이팅 네트워크"(라우터)가 입력 쿼리를 전문가 그룹에 할당하고, 활성화된 전문가만 입력을 처리하는 "희소 활성화" 방식입니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[11, 12, 13, 14]</a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 font-bold">장점:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>**계산 효율성:** 입력당 전체 매개변수의 일부만 활성화하여 계산 비용을 줄입니다.</li>
            <li>**확장성:** 추론 비용 증가 없이 수조 개의 매개변수로 확장 가능합니다.</li>
            <li>**성능 향상:** 동적 적응성을 통해 다양한 작업에서 성능을 높입니다.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">GPT-5의 MoE 구현</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5는 "통합 시스템"을 통해 MoE 원칙을 구현합니다. 라우터는 사용자의 피드백을 기반으로 지속적으로 학습하며, 라우팅 결정을 개선합니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[9, 10]</a> MoE 아키텍처는 환각 현상을 줄이고 지시를 더 정확하게 따르는 능력에 직접적으로 기여합니다.
          </p>
          <h3 className="text-xl font-semibold mb-2">경쟁 환경에서의 MoE 비교</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            MoE는 LLM 산업의 표준이 되어가고 있습니다. 구글의 Gemini 모델은 MoE를 명시적으로 활용하며,<a href="#references" className="text-blue-500 hover:text-blue-700">[23, 25]</a> 앤트로픽의 Claude 3.5 Sonnet 또한 유사한 아키텍처를 탐색하고 있습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[26]</a> 이는 MoE가 대규모 AI 모델의 비용 효율성과 성능을 높이는 필수적인 기술임을 보여줍니다.
          </p>
        </>
      ),
    },
    usage: {
      title: '사용량 및 접근성 정책',
      content: (
        <>
          <h3 className="text-xl font-semibold mb-2">ChatGPT 사용자 계층: 무료, Plus, Pro, Team, Enterprise</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5는 기존 ChatGPT 유료 요금제(Plus, Pro, Team)에 점진적으로 배포되며, Enterprise 및 Education 요금제에도 곧 접근이 가능합니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[7]</a> 무료 사용자도 접근할 수 있지만, 사용 가능한 기능과 한도는 구독 계층에 따라 다릅니다. 특히, Microsoft Copilot 사용자는 일반 ChatGPT 사용자보다 더 높은 사용량 제한을 받습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 7]</a>
          </p>
          <h3 className="text-xl font-semibold mb-2">플랜별 메시지 및 토큰 제한</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            무료 사용자는 5시간마다 최대 10개의 메시지를 보낼 수 있으며, 한도에 도달하면 자동으로 GPT-5 Mini로 전환됩니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[7]</a> Plus 사용자는 3시간마다 80개의 메시지 제한이 있습니다. Pro 및 Team 구독자는 "무제한 접근"을 이용할 수 있습니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[7, 16, 17]</a>
          </p>
          <h3 className="text-xl font-semibold mb-2">표 2: ChatGPT 플랜별 GPT-5 사용량 제한</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-6">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">플랜 유형</th>
                  <th className="py-3 px-6 text-left">GPT-5 메시지 제한</th>
                  <th className="py-3 px-6 text-left">GPT-5 Thinking 메시지 제한</th>
                  <th className="py-3 px-6 text-left">제한 도달 시 대체 모델</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">무료</td>
                  <td className="py-3 px-6 text-left">5시간마다 10 메시지</td>
                  <td className="py-3 px-6 text-left">하루 1 메시지</td>
                  <td className="py-3 px-6 text-left">GPT-5 Mini</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">Plus</td>
                  <td className="py-3 px-6 text-left">3시간마다 80 메시지</td>
                  <td className="py-3 px-6 text-left">주간 200 메시지</td>
                  <td className="py-3 px-6 text-left">GPT-5 Mini</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">Pro/Team</td>
                  <td className="py-3 px-6 text-left">무제한</td>
                  <td className="py-3 px-6 text-left">무제한</td>
                  <td className="py-3 px-6 text-left">해당 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    api: {
      title: 'API 가격 및 경제성',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5, Mini, Nano 모델은 API를 통해 제공되며, 입력 및 출력 토큰 수에 따라 가격이 책정됩니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 18, 19]</a>
          </p>
          <h3 className="text-xl font-semibold mb-2">표준 계층 가격 (100만 토큰당)</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>GPT-5: 입력 $1.25, 출력 $10.00</li>
            <li>GPT-5 Mini: 입력 $0.25, 출력 $2.00</li>
            <li>GPT-5 Nano: 입력 $0.05, 출력 $0.40</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            **계층형 처리 서비스:** Batch, Flex, Priority와 같은 추가 서비스는 요청의 속도와 비용에 따라 다른 가격을 제공합니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[18]</a>
          </p>
        </>
      ),
    },
    conclusion: {
      title: '결론',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            GPT-5 출시는 AI 발전의 중요한 이정표입니다. "박사 수준의 전문가"라는 비유처럼, 추론, 코딩 등 핵심 분야에서 뛰어난 역량을 보여줍니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 4, 6]</a> 핵심 기술인 혼합 전문가(MoE) 아키텍처는 효율성과 확장성을 가능하게 하여, "경쟁력 있는" 가격 책정의 기반이 됩니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[2, 13]</a>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            사용량 정책은 다양한 사용자 요구를 충족하도록 설계되었습니다. 특히 Microsoft Copilot 사용자에게 제공되는 우선적인 제한은 OpenAI의 전략적 파트너십의 중요성을 부각합니다.<a href="#references" className="text-blue-500 hover:text-blue-700">[1, 7]</a> 전반적으로, GPT-5는 AI가 단순한 도구를 넘어 진정한 "협력자"로 진화하고 있음을 보여줍니다.
          </p>
        </>
      ),
    },
  };

  // 참고문헌 데이터
  // 원본 문서에 URL이 없어 링크는 더미(placeholder)로 처리했습니다.
  const references = [
    { id: 1, text: 'OpenAI의 CEO 샘 알트만이 GPT-5를 "박사 수준의 전문가"에 비유하며, 환각 현상을 줄이고 에이전트와 유사한 기능을 강화했다고 강조했습니다.' },
    { id: 2, text: 'GPT-5는 Microsoft 365 Copilot, GitHub Copilot, Azure AI Foundry 등 Microsoft 생태계 전반에 걸쳐 공식적으로 출시되었습니다.' },
    { id: 3, text: 'GPT-5는 인공지능 분야의 중대한 진전을 의미하며, 단순한 업그레이드를 넘어선 "시스템 수준의 변화"라고 강조되었습니다.' },
    { id: 4, text: '샘 알트만은 GPT-5를 "AGI를 향한 중요한 단계"로 포지셔닝하며, 매주 약 7억 명의 ChatGPT 사용자를 위한 즉각적인 유용성을 강조했습니다.' },
    { id: 5, text: 'GPT-5의 중요한 새로운 기능은 과거 채팅, 톤 선호도, 프로젝트 기록을 세션 간에 기억하는 능력으로, 인간 동료와 함께 작업하는 것과 유사한 경험을 제공합니다.' },
    { id: 6, text: 'GPT-5는 의료 인식을 통해 복잡한 의료 용어를 해석하고, 잠재적인 건강 위험을 식별하며, 증상 및 치료 옵션을 일반인이 이해하기 쉬운 용어로 설명합니다.' },
    { id: 7, text: 'GPT-5는 혼합 전문가(MoE) 원칙을 통합한 정교한 "통합 시스템" 아키텍처를 활용하며, ChatGPT 사용자(무료, Plus, Pro, Team, Enterprise)를 위한 계층별 사용량 정책을 시행합니다.' },
    { id: 8, text: 'GPT-5는 고품질 코드 생성, 디버깅, 에이전트 워크플로우에서 탁월한 성능을 보이며, "가장 강력한 코딩 모델"로 묘사됩니다.' },
    { id: 9, text: 'GPT-5는 지능형 라우터를 통해 쿼리를 전문화된 "추론" 또는 "비추론" 모델로 동적으로 라우팅하여 성능을 최적화합니다.' },
    { id: 10, text: 'GPT-5는 "통합 AI 시스템"을 도입하여 사용자가 특정 모델 버전을 수동으로 선택할 필요 없이, 시스템이 쿼리를 가장 적합한 내부 모델로 지능적으로 자동 라우팅합니다.' },
    { id: 11, text: 'GPT-5는 "환각 현상 발생률이 현저히 낮아졌다"는 점에서 상당한 개선을 입증했습니다.' },
    { id: 12, text: '혼합 전문가(MoE)는 복잡한 작업을 "전문가"라고 알려진 더 작고 전문화된 네트워크에 분할하는 원리로 작동합니다.' },
    { id: 13, text: 'MoE 모델은 입력당 전체 매개변수의 일부만 활성화하여 계산 요구 사항과 추론 비용을 크게 줄입니다.' },
    { id: 14, text: 'MoE는 모델 크기를 확장하면서도 계산 오버헤드를 최소화하여, 강력한 AI를 더 경제적으로 접근 가능하고 배포 가능하게 만듭니다.' },
    { id: 15, text: 'GPT-5의 "생각이 내장되어 있다"는 명시적 언급과 API의 `reasoning_effort` 매개변수는 OpenAI가 복잡한 다단계 추론을 기본적이고 내부적인 기능으로 공식화하고 통합하고 있음을 시사합니다.' },
    { id: 16, text: 'ChatGPT Plus 사용자는 3시간마다 80개의 메시지라는 훨씬 더 높은 제한을 누립니다.' },
    { id: 17, text: 'Pro 및 Team 구독자는 복잡한 작업에 최적화된 가장 강력한 GPT-5 Thinking Pro를 포함하여 GPT-5 모델에 "무제한 접근"을 누립니다.' },
    { id: 18, text: 'OpenAI는 API를 통해 GPT-5, GPT-5 Mini, GPT-5 Nano 모델을 제공하여 개발자에게 성능, 비용 및 지연 시간의 균형을 맞출 수 있는 다양한 옵션을 제공합니다.' },
    { id: 19, text: 'API 사용자에 대한 요금 제한은 RPM 및 TPM으로 정의된 여러 계층에 걸쳐 구조화됩니다.' },
    { id: 20, text: 'GPT-5는 통합된 Sora를 통해 텍스트, 이미지, 오디오 입력/출력 및 비디오 해석 기능을 지원합니다.' },
    { id: 21, text: '사용량 제한에 도달하면 "미니 버전"(GPT-5 Mini)이 자동으로 인계받아, 사용자가 한도에 도달했을 때에도 갑작스러운 서비스 중단을 방지합니다.' },
    { id: 22, text: '혼합 전문가 아키텍처는 LLM 산업 전반에 걸쳐 빠르게 성장하고 널리 채택되는 추세입니다.' },
    { id: 23, text: 'Google의 Gemini 1.5 Pro 및 Gemini 2.5 Flash 모델은 명시적으로 MoE 아키텍처를 활용합니다.' },
    { id: 24, text: 'GPT-5의 "공격적인 경쟁력 있는" 가격 책정은 MoE에서 파생된 기본 아키텍처 효율성에 의해 근본적으로 가능해졌습니다.' },
    { id: 25, text: 'Google의 MoE에 대한 기초 연구, 특히 "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"는 이 접근 방식에 대한 Google의 오랜 노력을 강조합니다.' },
    { id: 26, text: 'Claude 3.5 Sonnet은 "보안 및 신뢰성에 최적화된 독점 아키텍처"에 의존하지만, MoE에 대한 광범위한 산업 논의는 유사한 아키텍처 최적화를 구현하거나 탐색하고 있음을 시사합니다.' },
    { id: 27, text: 'API 사용량 제한은 동적이며 사용자의 전반적인 사용량 및 API 지출에 따라 자동으로 증가하여 더 높은 소비를 장려합니다.' },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* 문서 제목 섹션 */}
      <header className="bg-white shadow-sm py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            GPT-5의 MoE와 사용량 제한 정책
          </h1>
          <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
            OpenAI GPT-5의 아키텍처 및 정책 분석 보고서
          </p>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 가로 탭 네비게이션 */}
        <nav className="border-b-2 border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
            {Object.keys(sections).map((tabKey) => (
              <li key={tabKey} className="mr-2" role="presentation">
                <button
                  onClick={() => handleTabClick(tabKey)}
                  className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors duration-200 ease-in-out
                    ${activeTab === tabKey
                      ? 'text-blue-600 border-blue-600 font-semibold'
                      : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`
                  }
                  id={`${tabKey}-tab`}
                  role="tab"
                  aria-controls={`${tabKey}-panel`}
                  aria-selected={activeTab === tabKey}
                >
                  {sections[tabKey].title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 탭 콘텐츠 패널 */}
        <div className="mt-8">
          {Object.keys(sections).map((tabKey) => (
            <div
              key={tabKey}
              className={`p-6 bg-white rounded-lg shadow-md transition-opacity duration-300 ease-in-out
                ${activeTab === tabKey ? 'block opacity-100' : 'hidden opacity-0'}`}
              id={`${tabKey}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabKey}-tab`}
            >
              {sections[tabKey].content}
            </div>
          ))}
        </div>

        {/* 참고문헌 섹션 */}
        <section id="references" className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">참고문헌</h2>
          <ol className="list-decimal list-inside text-gray-700 text-sm">
            {references.map((ref) => (
              <li key={ref.id} className="mb-2">
                <a href="#" className="text-blue-500 hover:underline">
                  {ref.text}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>

    </div>
  );
};

export default App;
