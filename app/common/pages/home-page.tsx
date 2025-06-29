import type { MetaFunction } from "react-router";

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
        <div className="grid grid-cols-2">
          <div>
	          "좋은 습관 하나가 언젠가는 당신이 꿈꾸던 인생의 시작점이 됩니다.",
          </div>
          <div>
            "올 해도 목표만 세워둔 당신의 삶에 전환점을 만들어 드립니다."
          </div>
        </div>
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="about">
				About page. <br/><br/>
				이 서비스에 대한 설명이 들어갈 예정입니다.
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="tutorial">
				tutorial page. <br/><br/>
				이 서비스의 사용 방법에 대한 설명이 들어갈 예정입니다.
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="plan">
        plan page. <br/><br/>
				이 서비스의 유료 정책에 대한 설명이 들어갈 예정입니다.
      </section>
    </div>
  );
}