import axios, { AxiosInstance } from "axios";
import authApi from "./auth";
import cookies from "react-cookies";

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(res) => {
			return res;
		},
		(error) => {
			const { accessToken, refreshTokenId } = cookies.loadAll();
			if (error.response.data.error_code === "J01") authApi.reissue({ accessToken, refreshTokenId });
			// if (error.data.error_code==='J11') 로그아웃 api
			throw error;
		}
	);
	return instance;
};

const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	});
	return setInterceptors(instance);
};
const request = createInstance();
export default request;
