import type { MetaFunction } from "react-router";
import { CoverPage } from "../components/cover-page";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="h-screen snap-start flex justify-center items-center" id="home">
        <CoverPage
          title="작은 습관, 위대한 변화" 
          description="위대한 변화는 거창한 결심이 아니라 작은 습관에서 시작됩니다.||이 작은 습관 하나가 언젠가 당신이 꿈꾸던 인생의 시작점이 됩니다."
        />
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="about">
        <CoverPage
          title="The greatest habit"
          description="우리는 당신이 세운 목표와 만들고 싶은 습관이||삶의 변화를 이끌어낼 수 있도록 함께합니다."
          link="/about"
        />
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="tutorial">
        <CoverPage 
          title="사용 방법이 궁금하신가요?"
          description="목표를 세우는 방법, 습관을 만드는 방법부터||하나하나 차근차근 안내해드립니다."
          link="/tutorial"
        />
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="plan">
        <CoverPage
          title="가격정책"
          description="제공하는 도구와 요금제를 확인해보세요."
          link="/plan"
        />
      </section>
    </div>
  );
}