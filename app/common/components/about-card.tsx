import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AboutCardProps {
	title: string;
	content: string;
}

export function AboutCard({ title, content }: AboutCardProps) {
	return (
		<Card className="bg-transparent hover:bg-card/50 transition-colors w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>	
			<CardContent className="text-muted-foreground">
				{content}
			</CardContent>
		</Card>	
	);
} 