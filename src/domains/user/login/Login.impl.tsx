import VLogin from "./Login.view";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useLogin from "./hook/useLogin";
import { ILogin } from "./Login.interface.tsx";

const Login: React.FC<ILogin.IProps> = () => {
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");

    const { handleSubmit, register } = useForm<ILogin.IInput>();

    useLogin(accountName, password);

    const login: SubmitHandler<ILogin.IInput> = async data => {
        const { accountName, password } = data;
        if (!accountName || !password) return;
        try {
            setAccountName(accountName);
            setPassword(password);
        } catch (error) {
            alert("Login Error");
        }
    };

    return <VLogin register={register} onLogin={handleSubmit(login)} />;
};

export default Login;
