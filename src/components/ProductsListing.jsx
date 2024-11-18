import Link from "next/link";
import Image from "next/image";

function ProductsListing({ sortedProducts, add }) {
  return (
    <div className="grid grid-cols-2 gap-5 px-5 pt-10 lg:grid-cols-4 lg:px-20">
      {sortedProducts?.map((product) => {
        return (
          <div
            key={product?.id}
            className="overflow-hidden rounded-lg bg-gray-200 shadow"
          >
            <Link
              href={`/products/${product?.Title.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
            >
              <Image
                className="w-full object-cover"
                src={product.photoURL[2]}
                alt="product image"
                width="640"
                height="640"
              />
            </Link>

            <div className="flex flex-col p-4 pt-5">
              <h2>{product?.Title}</h2>
              <p className="py-3 text-xl font-semibold">
                NGN {Intl.NumberFormat().format(product?.Price)}
              </p>

              <button
                onClick={() => add(product)}
                className="rounded-lg bg-primary p-4 font-semibold text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsListing;
