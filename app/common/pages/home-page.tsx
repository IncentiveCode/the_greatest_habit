import type { MetaFunction } from "react-router";
import { CoverPage } from "../components/cover-page";
import { AnimatedGridPattern } from "~/common/components/ui/animated-grid-pattern";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth px-5">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "skew-y-12",
        )}
      />

      <section className="h-screen snap-start flex justify-center items-center" id="home">
          <CoverPage
            title="작은 습관, 위대한 변화" 
            description="위대한 변화는 거창한 결심이 아니라 작은 습관에서 시작됩니다.||이 작은 습관 하나가 언젠가 당신이 꿈꾸던 인생의 시작점이 됩니다."
          />
      </section>

      <section className="h-screen snap-start flex justify-center items-center" id="about">
        <div className="flex flex-col justify-center items-center w-screen h-screen rounded-md space-y-20">
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

					<h4 className="text-2xl font-light text-center text-muted-foreground">
            The Greatest Habit 은 당신이 세운 목표가 단순 기록으로 끝나지 않게 만듭니다.
          </h4>
				</div>
      </section>

      <section className="h-screen snap-start flex justify-center items-center">
        <CoverPage
          title="The greatest habit은"
          description="당신이 세운 목표가 습관이 되게 만들고||그 습관이 삶의 변화를 이끌어낼 수 있도록 돕습니다."
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
          description="현재는 MVP 제작 중이라 가격정책이 정해지지 않았습니다.||추후 안내드리겠습니다."
        />
      </section>
    </div>
  );
}