/* eslint-disable no-console */
class LocalStorage {
    static getItem<T>(key: string): T | null {
        if (typeof window === "undefined") {
            return null;
        }
        const parseJSON = <T>(value: string | null): T | undefined => {
            try {
                return value === "undefined"
                    ? undefined
                    : JSON.parse(value ?? "");
            } catch (error) {
                console.error("parsing error on", { value });
                return undefined;
            }
        };
        const item = window.localStorage.getItem(key);
        return item ? (parseJSON(item) as T) : null;
    }
    static setItem<T>(key: string, value: T): void {
        if (typeof window == "undefined") {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client`
            );
        }
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            window.dispatchEvent(new Event("local-storage"));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }
    static removeItem(key: string): void {
        if (typeof window == "undefined") {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client`
            );
        }
        window.localStorage.removeItem(key);
    }
}

export default LocalStorage;
