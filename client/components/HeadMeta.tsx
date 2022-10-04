import Head from "next/head";

interface Props {
	title?: string;
	description?: string;
	url?: string;
}

export function HeadMeta({ title, description, url }: Props) {
	return (
		<Head>
			<title>{title || "Tech IT"}</title>
			<meta name="description" content={description || "Best IT Shopping Website"} />
			<meta property="og:title" content={title || "Tech IT"} />
			<meta property="og:url" content={url || "https://tech-it.com"} />
		</Head>
	);
}
