import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import SignUpType from "types/SignUpType";
import authApi from "apis/auth";
import errorCode from "types/errorCode";

const useSignUp = (options?: UseMutationOptions<AxiosResponse, AxiosError<errorCode>, SignUpType>) => {
	return useMutation<AxiosResponse, AxiosError<errorCode>, SignUpType>(authApi.signUp, options);
};

export default useSignUp;
