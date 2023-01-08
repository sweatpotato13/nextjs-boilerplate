/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { FC, ReactElement, ReactNode, useState } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

jest.mock(
    "next/image",
    () =>
        function Image(params: {
            src: string;
            alt: string;
            "data-testid"?: string;
        }) {
            const { src, alt } = params;
            return (
                <img src={src} alt={alt} data-testid={params["data-testid"]} />
            );
        }
);

jest.mock("next/link", () => ({ children }: { children: ReactNode }) => (
    <a>{children}</a>
));

const AllTheProviders: FC = () => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { retry: false } },
            })
    );
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>{}</RecoilRoot>
        </QueryClientProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
