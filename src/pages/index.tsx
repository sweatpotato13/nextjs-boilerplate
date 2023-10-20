import { RecoilRoot } from "recoil";
import Login from "../domains/user/login/Login.impl";

function Home() {
    return (
        <RecoilRoot>
            <Login />
        </RecoilRoot>
    );
}

export default Home;
