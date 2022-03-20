import { selector } from "recoil";
import userAtom from "./user.atom";

export default selector({
    key: "withLoggined",
    get: ({ get }) => get(userAtom).id !== "",
});
