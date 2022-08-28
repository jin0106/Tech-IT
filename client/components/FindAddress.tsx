import { useDaumPostcodePopup } from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { addressState } from "recoil/addressState";
import { Input, Button } from "./index";

export const FindAddress = () => {
	const open = useDaumPostcodePopup();
	const [address, setAddress] = useRecoilState(addressState);

	const handleComplete = (data: {
		address: string;
		addressType: string;
		bname: string;
		buildingName: string;
	}) => {
		setAddress(data.address);
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	return (
		<>
			<Input placeholder="address" disabled value={address} />
			<div className="w-72 flex items-center">
				<Input placeholder="Detail" $width="w-50" $margin="mr-1" />
				<Button type="button" onClick={handleClick} $width="w-28">
					Find Address
				</Button>
			</div>
		</>
	);
};
