import toast from "react-hot-toast";

const useToastMessage = (message: string, type: "success" | "error") => {
	if (type === "success") {
		toast.success(message, {
			position: "top-right",
			duration: 3000,
		});
	}
	if (type === "error") {
		toast.error(message, {
			position: "top-right",
			duration: 3000,
		});
	}
};
export default useToastMessage;
