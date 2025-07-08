import { Link } from "react-router";
import { Button } from "./ui/button";

interface CoverPageProps {
	title: string;
	description?: string;
	link?: string;
	imagePath?: string;
}

export function CoverPage({ title, description, link, imagePath }: CoverPageProps) {
	const arrDesc = description?.split("||") ?? [];

	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen rounded-md space-y-10">
			<div className="flex justify-around items-center">
			{imagePath ? (
				<div className="w-full h-full rounded-xl shadow-xl">
					<img 
						className="object-fill w-full h-full" 
						src={imagePath}
						/>
				</div>
				) : null
			}
				<div className="w-full h-full space-y-10 m-5">
					<h1 className="text-5xl font-bold text-center">
						{title}
					</h1>
					<div className="space-y-2.5">
					{arrDesc.map((desc) => (
						<h4 key={desc} className="text-2xl font-light text-center text-muted-foreground">{desc}</h4>
					))}
					</div>
				</div>
			</div>
			{link && (
			<div>
				<Button variant={"outline"}>
					<Link to={link}>자세히 보기</Link>
				</Button>
			</div>
			)}
		</div>
	);
}