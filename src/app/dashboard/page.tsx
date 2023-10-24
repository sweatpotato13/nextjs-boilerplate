import Link from "next/link";

export default function Page() {
    return (
        <>
            <Link href="/dashboard/settings">Settings</Link>
            <br></br>
            <Link href="/dashboard/account">Account</Link>
            <h1>Hello, Dashboard Page!</h1>
        </>
    );
}
