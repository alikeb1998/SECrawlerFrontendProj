import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ pageProps, children }: React.PropsWithChildren<any>) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {/* <Hydrate
            // state={
            //     //@ts-ignore
            //     pageProps.dehydratedState
            // }
            ></Hydrate> */}
            {children}
        </QueryClientProvider>
    );
}
