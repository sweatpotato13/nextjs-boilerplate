import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "./_app.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </QueryClientProvider>
    );
}
export default App;
