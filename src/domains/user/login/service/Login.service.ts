import axios from "axios";

import { Tokens } from "./Login.service.interface";

class LoginService {
    private static instance: LoginService;
    public static get Instance(): LoginService {
        return this.instance || (this.instance = new this());
    }

    public async login(account: string, passwordHash: string) {
        const { data } = await axios.post<Tokens>(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
            {
                account: account,
                passwordHash: passwordHash,
            }
        );
        return data;
    }
}

export default LoginService.Instance;
