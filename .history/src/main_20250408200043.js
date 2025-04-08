import "./style.css";

// TailwindCSS 4.0 주요 특징 출력
const showTailwindFeatures = () => {
  const features = [
    "🚀 성능 개선: 빌드 시간 최대 10배 향상",
    "📦 번들 크기 감소: 기본 번들 크기 50% 감소",
    "🔄 ESM 기본 지원: 모듈 시스템 현대화",
    "🎨 새로운 컬러 팔레트: 더 세련된 디자인 가능",
    "🛠️ 개선된 CLI 도구: 더 직관적인 명령어 옵션",
    "⚙️ 설정 파일 간소화: TypeScript 기본 지원",
    "🧩 플러그인 API 개선: 더 강력한 확장성",
  ];

  console.log("TailwindCSS 4.0 주요 특징:");
  features.forEach((feature) => console.log(feature));
};

showTailwindFeatures();

export { showTailwindFeatures };
