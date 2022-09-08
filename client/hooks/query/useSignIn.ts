import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import SignUpType from "@pages/signup/SignUpType";
import authApi from "apis/auth";
interface Props {
	error_code: string;
}

const useSignIn = (options?: UseMutationOptions<AxiosResponse, AxiosError<Props>, Pick<SignUpType, "email" | "password">>) => {
	return useMutation<AxiosResponse, AxiosError<Props>, Pick<SignUpType, "email" | "password">>(authApi.signIn, options);
};

export default useSignIn;
