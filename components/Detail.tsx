import { useParams } from "next/navigation";
import { useProductDetail } from "./hooks/useProductDetail";
import { useEffect } from "react";
import Spinner from "./ui/Spinner";
import ImageCarousel from "./ui/ImageCarousell";
import Icon from "./ui/Icon";
import creditCard from "./ui/assets/icons/creditCard.svg";
import star from "./ui/assets/icons/star.svg";
import truck from "./ui/assets/icons/truck.svg";
import repeat from "./ui/assets/icons/repeat.svg";
import AddToCartBtn from "./ui/addToCartBtn";
import Section from "./Section";
import Recommended from "./ui/Recommended";
import Link from "next/link";

function Detail() {
  const { product, getProductDetail, loading, error } = useProductDetail();
  const { id } = useParams();

  useEffect(() => {
    getProductDetail(String(id));
  }, [id, getProductDetail]);

  if (loading) {
    return <Spinner />;
  }

  if (!product || error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mx-4 lg:mx-24">
        <h1>
          The product you tried to reach does not exist, please search another
          one.
        </h1>

        <Link
          href="/shop"
          className="w-full lg:w-[50%] mt-6 bg-main flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-110 transition-transform"
        >
          <button className="flex items-center gap-2">Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 md:mx-24">
        {product && (
          <div className="flex-row lg:flex gap-12">
            <div className="mx-[-1rem]">
              {product.image && Array.isArray(product.image) && product.image[0] && (
                <img 
                  src={product.image[0]} 
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>

            <div>
              <div>
                <h2 className="text-icon font-medium text-lg mt-6 mb-7">
                  {product.category[0].toUpperCase() +
                    product.category.slice(1)}
                </h2>
                <h1 className="text-[#3C4242] font-semibold text-3xl">
                  {product.title}
                </h1>
                <div className="flex items-center gap-6 mt-[2.5rem] justify-center lg:justify-left">
                  <AddToCartBtn product={product} />
                  <div className="border-[#3C4242] border-[1px] rounded-lg px-10 py-3">
                    <h1 className="font-semibold text-lg text-[#3C4242]">
                      ${product.price}
                    </h1>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Description */}

              <Section title="Description">
                <div className="mt-4">
                  <p>{product.description}</p>
                </div>
              </Section>

              <hr className="my-6" />

              {/* Assurances */}

              <div className="grid grid-cols-2 gap-5 justify-items-left">
                <div className="flex items-center gap-3">
                  <Icon iconLink={creditCard} />
                  <h2 className="text-icon font-medium text-md">
                    Secure Payment
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Icon iconLink={star} />
                  <h2 className="text-icon font-medium text-md">Fit for You</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Icon iconLink={truck} />
                  <h2 className="text-icon font-medium text-md">
                    Free Shipping
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Icon iconLink={repeat} />
                  <h2 className="text-icon font-medium text-md">
                    Free Returns
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recomendations */}
        <div className="mt-16">
          <Section title="Similar Products">
            <div className="mt-4">
              <Recommended product={product} />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

export default Detail;
