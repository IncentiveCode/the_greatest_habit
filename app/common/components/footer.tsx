import { CopyrightIcon } from "lucide-react";


export default function Footer() {
	return (
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
	);
}