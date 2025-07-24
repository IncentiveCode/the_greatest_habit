
interface HeroProps {
	title: string;
	description?: string;
}

export default function Hero( 
	props : HeroProps
) {
	const arrDesc = props.description?.split("||") ?? [];

	return (
		<section className="flex flex-col items-center px-10 md:px-20 pt-28 pb-10">
			<h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
				{props.title}	
			</h2>
			<p className="flex flex-col justify-center items-center md:text-lg mb-16 leading-relaxed">
				{arrDesc.map((desc) => (
					<h4 key={desc} className="text-lg md:text-2xl font-light text-center leading-relaxed text-pretty md:text-balance">{desc}</h4>
				))}
			</p>
		</section>
	);
}