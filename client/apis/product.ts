import ProductData from "types/ProductType";
import request from "./request";

interface Response {
	products: ProductData[];
	totalPageCount: number;
	currentPageCount: number;
}

export const productAPI = {
	getAllProduct: async (pageNum: number) => {
		const { data } = await request.get<Response>(`products?page=${pageNum}&size=20`);
		return data;
	},
};
