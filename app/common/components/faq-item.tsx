import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface FaqItemProps {
	group_id: number;
	question: string;
	answer: string;
	sort_order: number;
}

export default function FaqItem(
	props: FaqItemProps
) {
	return (
		<AccordionItem value={`${props.group_id}-${props.sort_order}`}>
			<AccordionTrigger className="font-semibold">{props.question}</AccordionTrigger>
			<AccordionContent className="font-light flex flex-col gap-4">
				<p className="leading-relaxed">{props.answer}</p>
			</AccordionContent>
		</AccordionItem>
	)
}