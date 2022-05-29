import { IUserAtom } from "@/recoil/user/user-atom.interface";
import { LocalStorageService } from ".";

class UserLocalStorage {
    static getUser(): IUserAtom | null {
        return LocalStorageService.getItem<IUserAtom>("user");
    }

    static getUserItem<T extends keyof IUserAtom>(key: T): IUserAtom[T] {
        const user = LocalStorageService.getItem<IUserAtom>("user");
        if (user === null) {
            return undefined;
        } else {
            return user[key];
        }
    }

    static setItem(value: IUserAtom): void {
        const prevUser = UserLocalStorage.getUser();
        if (prevUser === null) {
            LocalStorageService.setItem<IUserAtom>("user", value);
        } else {
            LocalStorageService.setItem<IUserAtom>("user", {
                ...prevUser,
                ...value,
            });
        }
    }
    static removeItem(): void {
        if (typeof window == "undefined") {
            console.warn(
                `Tried setting localStorage key “user” even though environment is not a client`
            );
        }
        LocalStorageService.removeItem("user");
    }
}

export default UserLocalStorage;