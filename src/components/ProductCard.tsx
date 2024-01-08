import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import { PureComponent } from "react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 hover:shadow-x1 transition-shadow"
    >
      {" "}
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="car-title"></h2>
        {product.name}
        {isNew && <div className="badge badge-secondary">NEW</div>}

        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
