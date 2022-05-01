import { UserLocalStorageService } from "@/common/service";
import { atom, AtomEffect } from "recoil";
import { IUserAtom } from "./user-atom.interface";

const localStorageEffect =
    (): AtomEffect<IUserAtom> =>
    ({ setSelf, onSet }) => {
        const savedValue = UserLocalStorageService.getUser();

        if (savedValue !== null) {
            setSelf(savedValue);
        }

        onSet(newValue => {
            if (Object.keys(newValue).length === 0) {
                UserLocalStorageService.removeItem();
            } else {
                UserLocalStorageService.setItem(newValue);
            }
        });
    };

const userAtom = atom<IUserAtom>({
    key: "user",
    default: {},
    effects_UNSTABLE: [localStorageEffect()],
});

export default userAtom;
