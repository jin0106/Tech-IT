import { GetStaticProps } from "next";
import { productAPI } from "@apis/product";
import ProductCard from "@components/ProductCard";
import ProductData from "types/ProductType";

interface Props {
	products: ProductData[];
}

function index({ products }: Props) {
	return (
		<div className="grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-5">
			{products && products.map((product, idx) => <ProductCard key={idx} product={product} />)}
		</div>
	);
}

export const getStaticPropsL: GetStaticProps = async () => {
	const res = await productAPI.getAllProduct(0);
	const products = res.products;

	return {
		props: { products },
	};
};

export default index;
