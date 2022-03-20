import { render } from "@/utils/test-utils";
import TitleText from ".";

it("title text", async () => {
    const title = "Test Title";
    const container = render(<TitleText title={title} />);
    expect(container.queryByText(title)).toBeDefined();
});
