import { css } from "@emotion/react";
import { ITitleText } from "./TitleText.interface";

function TitleText(props: ITitleText.IProps) {
    const { title } = props;
    return <h1 css={titleStyle}>{title}</h1>;
}
const titleStyle = css`
    text-align: center;
`;

export default TitleText;
