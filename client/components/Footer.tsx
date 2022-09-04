import tw from "tailwind-styled-components";

export const Footer = () => {
	const getYear = () => {
		const now = new Date();
		return now.getFullYear();
	};

	const footerTexts = [
		"All Departments",
		"Careers",
		"Our Company",
		"Help",
		"Term & Use",
		"Privacy & Security",
		"Accessbility",
		"Sales & Refunds",
	];
	return (
		<footer className="h-44 bg-slate-50 flex flex-col justify-center bottom-0">
			<div className="flex justify-center mb-5">
				<ul className="grid grid-cols-2 text-sky-500 font-medium max-w-7xl mx-auto sm:grid-cols-4 lg:flex lg:justify-center">
					{footerTexts.map((text) => (
						<LI key={text} href="#">
							{text}
						</LI>
					))}
				</ul>
			</div>
			<div className="text-center font-medium">
				&copy; {getYear()} TECH-IT All Rights Reserved.
			</div>
		</footer>
	);
};

const LI = tw.li`
  sm:mr-5
`;
