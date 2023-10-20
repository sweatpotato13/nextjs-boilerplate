/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { UseFormRegister } from "react-hook-form";

export namespace ILogin {
    export interface IProps {}
    export interface IVProps {
        onLogin: () => void;
        register: UseFormRegister<IInput>;
    }
    export interface IInput {
        accountName: string;
        password: string;
    }
}
