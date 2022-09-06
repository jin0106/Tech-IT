import SignUpType from "@pages/signup/SignUpType";
import { atom } from "recoil";

export const addressState = atom<Pick<SignUpType, "address" | "addressDetail">>(
	{
		key: "address",
		default: {
			address: "",
			addressDetail: "",
		},
	}
);
