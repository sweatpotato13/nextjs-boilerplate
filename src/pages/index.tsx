import type { NextPage } from "next";
import { RecoilRoot } from "recoil";
import Login from "../domains/user/login/Login.impl";

const Home: NextPage = () => {
    return (
        <RecoilRoot>
            <Login />
        </RecoilRoot>
    );
};

export default Home;
