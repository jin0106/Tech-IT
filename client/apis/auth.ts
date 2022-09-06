import SignUpType from "@pages/signup/SignUpType";
import request from "./request";
import { AxiosResponse } from "axios";

const authApi = {
	signUp: async ({
		email,
		password,
		username,
		phoneNumber,
		address,
		addressDetail,
	}: SignUpType): Promise<AxiosResponse> => {
		const { data } = await request.post("members", {
			email,
			password,
			username,
			phoneNumber,
			address,
			addressDetail,
		});
		return data;
	},
};

export default authApi;
