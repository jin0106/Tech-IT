import { atom } from "recoil";
import SignUpType from "types/SignUpType";

export const addressState = atom<Pick<SignUpType, "address" | "addressDetail">>({
	key: "address",
	default: {
		address: "",
		addressDetail: "",
	},
});
