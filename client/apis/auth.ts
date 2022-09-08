import SignUpType from "@pages/signup/SignUpType";
import request from "./request";
import { AxiosResponse } from "axios";

const authApi = {
	signUp: async ({ email, password, username, phoneNumber, address, addressDetail }: SignUpType): Promise<AxiosResponse> => {
		return await request.post("members", {
			email,
			password,
			username,
			phoneNumber,
			address,
			addressDetail,
		});
	},
	isEmailExist: async (email: string): Promise<{ result: boolean }> => {
		const { data } = await request.post<{ result: boolean }>("members/exist-email", email);
		return data;
	},
	signIn: async ({ email, password }: Pick<SignUpType, "email" | "password">): Promise<AxiosResponse> => {
		return await request.post("members/login", { email, password });
	},
};

export default authApi;
