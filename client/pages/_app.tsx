import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Footer } from "@components/index";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<Footer />
				<Toaster />
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default MyApp;
