import { CoverPage } from "../components/cover-page";
import { AnimatedGridPattern } from "~/common/components/ui/animated-grid-pattern";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/home-page";
import { BadgeQuestionMarkIcon, BellIcon, CalendarIcon, CopyrightIcon, FileInputIcon, FileTextIcon, FlagIcon, GlobeIcon, LayoutDashboardIcon, PresentationIcon, TableOfContentsIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "../components/ui/bento-grid";
import Footer from "../components/footer";
import Hero from "../components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const features = [
  {
    Icon: BadgeQuestionMarkIcon,
    name: "The greatest habit?",
    description: "당신에게 이 서비스가 왜 필요할까요?",
    href: "/about",
    cta: "서비스 톺아보기",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: PresentationIcon,
    name: "사용 방법이 궁금하신가요?",
    description: "목표를 세우고, 습관을 만드는 방법부터 하나하나 차근차근 안내해드립니다.",
    href: "/tutorial",
    cta: "사용 방법 배워보기",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4",
  },
  {
    Icon: LayoutDashboardIcon,
    name: "대시보드",
    description: "당신의 모든 활동 기록을 확인해보세요. 그리고 오늘도 좋은 습관을 만들기 위해 함께 노력해요.",
    href: "/user",
    cta: "오늘도 한 뼘 성장하기",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: FlagIcon,
    name: "챌린지",
    description: "습관 만들기가 처음이시라면, 여러 사람과 함께하는 챌린지로 시작해보세요.",
    href: "/challengs",
    cta: "챌린지로 시작하기",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: TableOfContentsIcon,
    name: "더 궁금하신 사항이 있으시다면,",
    description: "'자주 물어보시는 질문들'을 한번 확인해보세요. 도움이 될 거에요.",
    href: "/faq",
    cta: "FAQ 살펴보기",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-4",
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
          "inset-x-0 inset-y-[-30%] h-[140%] skew-y-12",
        )}
      />

      <section className="flex justify-center items-center p-5">
        <Hero
          title="작은 습관, 위대한 변화" 
          description="&nbsp;&nbsp;||위대한 변화는 거창한 결심이 아니라||작은 습관에서 시작됩니다.||&nbsp;&nbsp;||오늘 만든 작은 습관 하나가||당신이 꿈꾸던 인생의 시작점이 됩니다."
        />
      </section>

      <section className="flex flex-col justify-start items-center p-5">
        <BentoGrid className="w-full lg:w-3/4 grid grid-rows-5 lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      <section className="flex justify-center items-center p-5">
        <Hero
          title="The greatest habit" 
          description="우리는 삶의 변화를 만들어가는||당신의 도전을 응원합니다."
        />
      </section>

        {
          /*  
        }
          <h1 className="text-5xl font-bold text-center">
            혹시 이런 경험이 있으신가요?
					</h1>
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
      {
        */
      }
    </div>
  );
}