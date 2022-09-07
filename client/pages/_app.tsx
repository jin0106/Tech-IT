import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Footer } from "@components/index";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<Toaster />
				<Footer />
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default MyApp;
