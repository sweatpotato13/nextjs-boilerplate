import axios from "axios";

const productAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default productAxiosClient;
