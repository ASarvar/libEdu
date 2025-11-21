"use client";

import Link from "next/link";
import { useState } from "react";

interface Product {
	id: number;
	name: string;
	price: string;
	image: string;
	categories: string[];
}

const products: Product[] = [
	{ id: 1, name: "Show Piece", price: "$32.00", image: "images/resource/products/1.jpg", categories: ["cat-2"] },
	{ id: 2, name: "Leather Belt", price: "$52.00", image: "images/resource/products/2.jpg", categories: ["cat-1", "cat-2"] },
	{ id: 3, name: "Sunglasses", price: "$43.00", image: "images/resource/products/3.jpg", categories: ["cat-1", "cat-2", "cat-4"] },
	{ id: 4, name: "Backpack", price: "$22.00", image: "images/resource/products/4.jpg", categories: ["cat-1", "cat-3"] },
	{ id: 5, name: "Hand Watch", price: "$34.00", image: "images/resource/products/4.jpg", categories: ["cat-1", "cat-3", "cat-5"] },
	{ id: 6, name: "Party Bag", price: "$52.00", image: "images/resource/products/3.jpg", categories: ["cat-2", "cat-3", "cat-4"] },
	{ id: 7, name: "Coffee Mug", price: "$25.00", image: "images/resource/products/2.jpg", categories: ["cat-1", "cat-2", "cat-5"] },
	{ id: 8, name: "Smart Watch", price: "$30.00", image: "images/resource/products/1.jpg", categories: ["cat-1", "cat-4", "cat-5"] },
];

export default function PortfolioFilter2() {
	const [filterKey, setFilterKey] = useState("*");

	const handleFilterKeyChange = (key: string) => () => {
		setFilterKey(key);
	};

	const activeBtn = (value: string) => (value === filterKey ? "filter active" : "filter");

	const filteredProducts = filterKey === "*"
		? products
		: products.filter(product => product.categories.includes(filterKey));

	return (
		<>
		<div className="filters clearfix">
			<ul className="filter-tabs filter-btns clearfix" role="tablist">
				<li className={activeBtn("*")} onClick={handleFilterKeyChange("*")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("*")()}> All </li>
				<li className={activeBtn("cat-1")} onClick={handleFilterKeyChange("cat-1")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("cat-1")()}>Cyber</li>
				<li className={activeBtn("cat-2")} onClick={handleFilterKeyChange("cat-2")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("cat-2")()}>Digital</li>
				<li className={activeBtn("cat-3")} onClick={handleFilterKeyChange("cat-3")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("cat-3")()}>Software</li>
				<li className={activeBtn("cat-4")} onClick={handleFilterKeyChange("cat-4")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("cat-4")()}>Technology</li>
				<li className={activeBtn("cat-5")} onClick={handleFilterKeyChange("cat-5")} role="tab" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleFilterKeyChange("cat-5")()}>Development</li>
			</ul>
		</div>
		<div className="items-container row">
			{filteredProducts.map((product) => (
				<div key={product.id} className="product-block small-column product lenses mb-50 col-lg-4 col-md-6">
					<div className="inner-box">
						<div className="image-box">
							<div className="image">
								<Link href="shop-product-details">
									<img src={product.image} alt={product.name} />
								</Link>
							</div>
							<div className="icon-box">
								<Link href="shop-product-details" className="ui-btn" aria-label="Add to wishlist">
									<i className="fa fa-heart"></i>
								</Link>
								<Link href="shop-cart" className="ui-btn" aria-label="Add to cart">
									<i className="fa fa-shopping-cart"></i>
								</Link>
							</div>
						</div>
						<div className="content">
							<h4><Link href="shop-product-details">{product.name}</Link></h4>
							<span className="price">{product.price}</span>
							<span className="rating" aria-label="5 star rating">
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
		</>
	);
}
