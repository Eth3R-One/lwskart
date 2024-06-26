import CustomLink from "@/components/CustomLink";
import ProductDetails from "@/components/landing/products/ProductDetails";
import RelatedProducts from "@/components/landing/products/RelatedProducts";
import { getProductById } from "@/database/queries";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const productId = params.productId;

  // fetch data
  const product = await getProductById(productId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const title = product
    ? product?.title + " | " + product?.category + " | LWSKart"
    : "404 | LWSKart";
  return {
    title: title,
    description: product?.description,
    openGraph: {
      images: [
        product?.thumbnail ??
          `${process.env.NEXT_PUBLIC_HOST}/api/og?title=Not-Found`,
        ...previousImages,
      ],
    },
  };
}

const ProductPage = async ({ params: { productId, lang } }) => {
  const product = await getProductById(productId);
  if (product) {
    return (
      <>
        <ProductDetails lang={lang} product={product} />
        <RelatedProducts product={product} />
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center py-10">
        <div className="bg-gray-200 text-rose-500 p-5 rounded-lg">
          <h2 className="text-center text-2xl">Not Found</h2>
          <p>Could not find requested resource</p>
          <div className="pt-10 items-center flex flex-col">
            <CustomLink
              className="bg-blue-300 text-blue-700 px-5 py-2 rounded-lg hover:bg-inherit"
              href="/shop/"
            >
              Return Shop
            </CustomLink>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
