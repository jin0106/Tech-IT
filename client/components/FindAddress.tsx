import React from "react";
import { useRef } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { addressState } from "recoil/addressState";
import { Input, Button } from "./index";

export const FindAddress = () => {
	const detailInput = useRef<HTMLInputElement>(null);
	const open = useDaumPostcodePopup();
	const [address, setAddress] = useRecoilState(addressState);

	const handleComplete = (data: {
		address: string;
		addressType: string;
		bname: string;
		buildingName: string;
	}) => {
		setAddress({ ...address, address: data.address });
	};

	const handleChange = () => {
		setAddress({ ...address, addressDetail: detailInput.current?.value });
	};
	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	return (
		<>
			<Input placeholder="address" disabled value={address.address} />
			<div className="w-72 flex items-center">
				<Input
					placeholder="Detail"
					$width="w-50"
					$margin="mr-1"
					onChange={handleChange}
					ref={detailInput}
				/>
				<Button type="button" onClick={handleClick} $width="w-28">
					Find Address
				</Button>
			</div>
		</>
	);
};
