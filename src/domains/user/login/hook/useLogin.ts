import { useEffect } from "react";
import { userAtom } from "../../../../recoil/user";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import LoginService from "../service/Login.service";
import crypto from "crypto";

export default function useLogin(
    accountName: string,
    password: string
): void {
    const setUser = useSetRecoilState(userAtom);
    const router = useRouter();

    useEffect(() => {
        setUser({});
    }, []);

    // login logic
    useEffect(() => {
        (async () => {
            if (!accountName || !password) return;
            const passwordHash = crypto.createHash("sha256").update(password).digest("hex");
            const response = await LoginService.login(accountName, passwordHash);

            setUser(prev => ({
                ...prev,
                accountName: accountName,
                jwt: response,
            }));
            router.push("/dashboard");
        })();
    }, [accountName, password]);
}
