import Link from "next/link";

interface MovePageProps {
	paragraph: string;
	link: string;
	description: string;
}

export const MovePage = ({ paragraph, link, description }: MovePageProps) => (
	<div className="flex">
		<p className="mr-2 font-medium">{paragraph}</p>
		<Link href={link}>
			<a className="text-sky-500">{description}</a>
		</Link>
	</div>
);
