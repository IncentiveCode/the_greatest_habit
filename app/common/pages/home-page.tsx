import { CoverPage } from "../components/cover-page";
import { AnimatedGridPattern } from "~/common/components/ui/animated-grid-pattern";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/home-page";
import { BellIcon, CalendarIcon, CopyrightIcon, FileInputIcon, FileTextIcon, GlobeIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "../components/ui/bento-grid";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: FileInputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function HomePage() {
  return (
    <div className="h-full w-full overflow-y-scroll scroll-smooth">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />

      <section className="h-screen flex justify-center items-center p-5" id="home">
          <CoverPage
            title="작은 습관, 위대한 변화" 
            description="위대한 변화는 거창한 결심이 아니라 작은 습관에서 시작됩니다.||이 작은 습관 하나가 언젠가 당신이 꿈꾸던 인생의 시작점이 됩니다."
          />
      </section>

      {/**
      <section className="flex justify-center items-center p-5" id="about">
        <div className="flex flex-col justify-center items-center w-screen h-screen rounded-md space-y-20">
          <h1 className="text-5xl font-bold text-center">
            혹시 이런 경험이 있으신가요?
					</h1>

          <BentoGrid className="w-full lg:w-3/4 grid grid-rows-5 lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
            <Card className="w-2/3 lg:w-full justify-self-center">
              <CardHeader>
                <CardTitle>
                  <h3 className="text-xl font-bold text-center">
                    잃어버린 시간
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  연초에 큰 뜻을 품고 목표를 세웠는데, 연말에도 목표 진행이 0% 인 경험
                </p>
              </CardContent>
            </Card>

            <Card className="w-2/3 lg:w-full justify-self-center">
              <CardHeader>
                <CardTitle>
                  <h3 className="text-xl font-bold text-center">
                    작심삼일도 아닌 작심일일
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  좋은 습관을 만들기 위해 도전했는데, 2일 차에 도전이 종료된 경험
                </p>
              </CardContent>
            </Card>

            <Card className="w-2/3 lg:w-full justify-self-center">
              <CardHeader>
                <CardTitle>
                  <h3 className="text-xl font-bold text-center">
                    시간이 흘러도 여전히 제자리걸음
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  일에 치여 사람에 치여, 어떤 도전도 하지 못한 경험
                </p>
              </CardContent>
            </Card>
          </div>

					<h4 className="text-2xl font-light text-center">
            The Greatest Habit 은 당신이 세운 목표가 단순 기록으로 끝나지 않게 만듭니다.
          </h4>
				</div>
      </section>

      <section className="flex justify-center items-center">
        <CoverPage
          title="The greatest habit은"
          description="당신이 세운 목표가 습관이 되게 만들고||그 습관이 삶의 변화를 이끌어낼 수 있도록 돕습니다."
          link="/about"
        />
      </section>

      <section className="flex justify-center items-center" id="tutorial">
        <CoverPage 
          title="사용 방법이 궁금하신가요?"
          description="목표를 세우는 방법, 습관을 만드는 방법부터||하나하나 차근차근 안내해드립니다."
          link="/tutorial"
        />
      </section>

      <section className="flex justify-center items-center" id="plan">
        <CoverPage
          title="가격정책"
          description="현재는 MVP 제작 중이라 가격정책이 정해지지 않았습니다.||추후 안내드리겠습니다."
        />
      </section>

      <div 
				className="flex flex-col gap-5 justify-center items-center px-10 md:px-20 py-10 w-full border-t-2 border-accent/20" 
				id="footer"
			>
				<p className="text-center">
					We create what inspires. <br/>
					We create <span className="text-accent font-bold text-shadow-md capitalize">incentive</span>.
				</p>
				<p className="flex gap-1 justify-center items-center mx-auto">
					<CopyrightIcon className="w-4 h-4" /> 
					<p className="text-sm leading-relaxed">2025 Incentive code. All rights reserved.</p>
				</p>
			</div>
      */}
    </div>
  );
}