import { atom } from "recoil";
import SignUpType from "@pages/signup/SignUpType";

export const addressState = atom<Pick<SignUpType, "address" | "addressDetail">>(
	{
		key: "address",
		default: {
			address: "",
			addressDetail: "",
		},
	}
);
