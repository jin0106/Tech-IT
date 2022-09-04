import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Footer } from "@components/index";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Component {...pageProps} />
			<Footer />
		</RecoilRoot>
	);
}

export default MyApp;
