import { atom } from "recoil";

type userAtomType = {
    id: string;
};
export default atom<userAtomType>({
    key: "userAtom",
    default: {
        id: "",
    },
});
