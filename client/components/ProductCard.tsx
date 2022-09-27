import Image from "next/image";
import Link from "next/link";
import ProductData from "types/ProductType";

interface Props {
	product: ProductData;
}

function ProductCard({ product }: Props) {
	const sliceString = (name: string) => {
		if (name.length > 50) return `${name.substring(0, 55)}...`;
		return name;
	};

	return (
		<div className="w-56 h-52 relative">
			<Link href={`products/${product.productId}`}>
				<div>
					<Image src={`${product.mainImage}`} unoptimized={true} width="224" height="100" alt={`${product.name}`} />
					<p className="h-12 break-words mb-1">{sliceString(product.name)}</p>
					<div className="flex justify-between">
						<p>{product.ratingAverage}</p>
						<Link href="#">
							<a className="absolute right-0">{product.category}</a>
						</Link>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ProductCard;
