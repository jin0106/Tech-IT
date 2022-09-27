import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import SignUpType from "types/SignUpType";
import authApi from "apis/auth";
import errorCode from "types/errorCode";

const useSignIn = (options?: UseMutationOptions<AxiosResponse, AxiosError<errorCode>, Pick<SignUpType, "email" | "password">>) => {
	return useMutation<AxiosResponse, AxiosError<errorCode>, Pick<SignUpType, "email" | "password">>(authApi.signIn, options);
};

export default useSignIn;
