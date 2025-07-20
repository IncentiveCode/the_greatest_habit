import { CircleQuestionMarkIcon, GroupIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import type { Route } from "./+types/faq-page";


export const meta: Route.MetaFunction = () => {
	return [
		{ title: "The greatest habit" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	// TODO. FAQ loading
}

export default function FaqPage() {
	return (
		<div>
			<section className="flex flex-col items-center px-10 md:px-20 py-20">
				<h2 className="text-4xl font-bold mb-6 text-center">
					FAQ	
				</h2>
				<p className="text-lg mb-16 leading-relaxed text-center">
					고객들께서 자주 물어보시는 질문들입니다.	
				</p>
			</section>

			<h2 className="flex gap-2 items-center text-xl text-accent p-2 border-b-2">
				<CircleQuestionMarkIcon className="w-6 h-6" />
				습관 관리
			</h2>
			<Accordion
				type="single"
				collapsible
				className="w-full"
				defaultValue="item-1"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="font-semibold">습관은 최대 몇 개까지 만들 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
							무료 플랜은 최대 3개, 프로 플랜은 무제한으로 습관을 만들 수 있습니다.
						</p>
					</AccordionContent>
				</AccordionItem>
				
				<AccordionItem value="item-2">
					<AccordionTrigger className="font-semibold">진행 완료는 하루에 한 번만 체크할 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
							네. 진행 완료는 하루에 한번 체크하실 수 있습니다.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3">
					<AccordionTrigger className="font-semibold">진행도나 통계는 어디서 볼 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
						서비스에 로그인 하신 후, 대시보드 페이지에서 확인하실 수 있습니다.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-4">
					<AccordionTrigger className="font-semibold">습관 정보는 중간에 수정할 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
						네, 습관 정보는 언제든 수정하실 수 있습니다.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-5">
					<AccordionTrigger className="font-semibold">습관을 잠시 멈추거나 숨길 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
						멈추는 기능의 구현은 예정되어 있지 않습니다. 숨기는 기능은 추후 업데이트 될 예정입니다.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-6">
					<AccordionTrigger className="font-semibold">목표 달성 후 보상 기능이 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
						소량의 리워드와 목표 달성 배지가 제공됩니다.
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-7">
					<AccordionTrigger className="font-semibold">기록을 PDF나 이미지로 저장할 수 있나요?</AccordionTrigger>
					<AccordionContent className="font-light flex flex-col gap-4 text-balance">
						<p>
						현재는 구현되어 있지 않으나, 추후 업데이트 될 예정입니다.
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}