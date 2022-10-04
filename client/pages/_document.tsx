import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="title" content="Tech IT" />
					<meta name="description" content="Best IT Shopping Website" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta property="og:title" content="Tech IT" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://tech-it.com" />
					<meta property="og:article:author" content="Tech IT" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
