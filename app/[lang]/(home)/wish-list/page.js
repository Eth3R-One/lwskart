import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CustomLink from "@/components/CustomLink";
import { getWishList } from "@/database/queries";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { MdDelete } from "react-icons/md";
import AddToWishListButton from "@/components/landing/products/cart/AddToWishListButton";
import { toggleWishList } from "@/app/actions";
import { revalidatePath } from "next/cache";

const WishListPage = async ({
  params: { lang },
  searchParams: { productId },
}) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  let userWishList = await getWishList(session?.user?.id);
  if (productId) {
    const isWishListed = userWishList?.products?.some(
      (product) => product?._id.toString() === productId.toString()
    );
    if (!isWishListed) {
      const res = await toggleWishList(session?.user?.id, productId);
      console.log(res);
      if (res?.status == 201) {
        userWishList = await getWishList(session?.user?.id);
      }
    }
  }

  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        {userWishList?.products?.length > 0 ? (
          userWishList?.products?.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
            >
              <div className="w-28">
                <CustomLink href={`/shop/${product._id}`}>
                  <Image
                    src={product?.thumbnail}
                    width={100}
                    height={100}
                    alt={product.title}
                    className="w-full rounded-md"
                  />
                </CustomLink>
              </div>
              <div className="w-1/3">
                <CustomLink href={`/shop/${product._id}`}>
                  <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {product.title}
                  </h2>
                </CustomLink>
                <p className="text-gray-500 text-sm">
                  Availability:{" "}
                  {product?.quantity ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>
              <div className="text-primary text-lg font-semibold">
                $
                {Math.round(
                  getDiscountPrice(product?.price, product?.discountPercentage)
                )}
              </div>

              <div className="flex flex-row items-center justify-end">
                {product?.quantity ? (
                  <a
                    href="#"
                    className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    add to cart
                  </a>
                ) : (
                  <a
                    href="#"
                    className="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
                  >
                    add to cart
                  </a>
                )}

                <div className="text-red-600 cursor-pointer pl-5 hover:text-primary">
                  <AddToWishListButton
                    userId={session?.user?.id}
                    productId={product?.id}
                  >
                    <MdDelete />
                  </AddToWishListButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-primary text-center border gap-6 p-4 border-gray-200 rounded">
            You have no product wishlisted
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;
