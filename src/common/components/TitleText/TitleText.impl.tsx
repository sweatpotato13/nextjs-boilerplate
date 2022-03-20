import { css } from "@emotion/react";
import { ITitleText } from "./TitleText.interface";

const TitleText: React.FC<ITitleText.IProps> = ({ title }) => {
    return <h1 css={titleStyle}>{title}</h1>;
};
const titleStyle = css`
    text-align: center;
`;

export default TitleText;
