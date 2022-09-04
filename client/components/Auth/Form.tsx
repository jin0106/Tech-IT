import Link from "next/link";
import { Button } from "..";

interface FormProps {
	title: string;
	paragraph: string;
	link: string;
	description: string;
	children: React.ReactNode;
	handleSubmit: () => void;
	buttonText: string;
}

export const Form = ({
	handleSubmit,
	title,
	paragraph,
	link,
	description,
	children,
	buttonText,
}: FormProps) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col justfiy-center items-center rounded p-6 bg-white border w-96"
		>
			<h2 className="text-3xl text-center mb-4">{title}</h2>
			{children}
			<Button role="submit-button">{buttonText}</Button>
			<div className="flex">
				<p className="mr-2 font-medium">{paragraph}</p>
				<Link href={link}>
					<a className="text-sky-500">{description}</a>
				</Link>
			</div>
		</form>
	);
};
