import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import SignUpType from "@pages/signup/SignUpType";
import authApi from "apis/auth";

const useSignUp = (
	options?: UseMutationOptions<AxiosResponse, Error, SignUpType>
) => {
	return useMutation<AxiosResponse, Error, SignUpType>(authApi.signUp, options);
};

export default useSignUp;
