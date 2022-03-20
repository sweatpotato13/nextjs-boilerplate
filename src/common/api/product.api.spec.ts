import productApiClient from "./product.api";
describe("api client test", () => {
    test("should return base url of axois client", () => {
        expect(productApiClient.defaults.baseURL).toEqual(
            process.env.NEXT_PUBLIC_BASE_URL
        );
    });
});
