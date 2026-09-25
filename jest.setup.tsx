import "@testing-library/jest-dom";

// Mock Next.js router - using jest.fn() to allow individual tests to override
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockRefresh = jest.fn();
const mockPrefetch = jest.fn();
const mockPathname = jest.fn().mockReturnValue("/");

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: mockPush,
        replace: mockReplace,
        back: mockBack,
        forward: mockForward,
        refresh: mockRefresh,
        prefetch: mockPrefetch,
    })),
    usePathname: () => mockPathname(),
    useSearchParams: () => new URLSearchParams(),
}));

// Export mock functions for tests to use
export const routerMocks = {
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
    prefetch: mockPrefetch,
    setPathname: (pathname: string) => mockPathname.mockReturnValue(pathname),
};

// Reset mocks before each test
beforeEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    mockBack.mockClear();
    mockForward.mockClear();
    mockRefresh.mockClear();
    mockPrefetch.mockClear();
    mockPathname.mockReturnValue("/");
});

// Mock Next.js Image component
type NextImageMockProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
};

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: NextImageMockProps) => {
        // Drop Next-only props so React does not warn about unknown DOM attributes
        // oxlint-disable-next-line no-unused-vars
        const { fill, priority, unoptimized, ...imgProps } = props;
        // oxlint-disable-next-line nextjs/no-img-element
        return <img {...imgProps} alt={imgProps.alt || ""} />;
    },
}));

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

// Clear localStorage before each test
beforeEach(() => {
    localStorageMock.clear();
});
