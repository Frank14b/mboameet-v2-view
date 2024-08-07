import { useCallback, useMemo, useState } from "react";
import { Card, CardBody, Rating, Typography } from "@material-tailwind/react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomNextImage from "../../widgets/CustomNextImage";
import useProducts from "@/app/hooks/pages/marketplace/useProducts";
import { NoDataFound } from "../../widgets/NoDataFound";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ProductDetailsPopupComponent } from "./ProductDetailsPopupComponent";
import { ResultProductDto } from "@/app/types/stores/products";
import { productCarouselResponsive } from "@/app/lib/constants/app";
import { CarouselProductSkeleton } from "../../widgets/skeletons/products/CarouselProductSkeleton";

export function CarouselProductsComponent({
  responsive,
}: {
  responsive?: ResponsiveType;
}) {
  //
  const {
    products,
    isFetchingProduct,
    proceedRate,
    proceedShare,
    proceedDealNow,
  } = useProducts({});

  const [isPopupDetailsOpen, setIsPopupDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ResultProductDto | null>(null);

  const handleOpen = useCallback(() => {
    setIsPopupDetailsOpen(!isPopupDetailsOpen);
  }, [isPopupDetailsOpen, setIsPopupDetailsOpen]);

  const handleSelectProduct = useCallback(
    (product: ResultProductDto) => {
      setSelectedProduct(product);
      handleOpen();
    },
    [handleOpen, setSelectedProduct]
  );

  const formattedProducts = useMemo(() => {
    if (isFetchingProduct)
      return <CarouselProductSkeleton isLoading={true} count={7} />;
    if (products.length === 0)
      return (
        <NoDataFound
          customClass="dark:shadow-none dark:bg-gray-800"
          message="Products not found"
        />
      );

    return (
      <>
        <Carousel responsive={responsive ?? productCarouselResponsive}>
          {products.map((product, index) => (
            <div
              className="p-2 hover:scale-105 transform transition duration-2 rounded-lg"
              key={index}
            >
              <Card
                placeholder={""}
                className="dark:bg-gray-900 rounded-lg p-0 cursor-pointer bg-gray-100 w-full shadow-none border-2 border-gray-100 dark:border-none"
              >
                <CardBody
                  placeholder={""}
                  className="min-h-[30vh] dark:text-gray-100 py-2 pb-4 p-0"
                >
                  <div
                    className="h-[140px] relative"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <CustomNextImage
                      alt=""
                      className="object-cover rounded-lg"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      src={product.image}
                    />
                  </div>
                  <div className="w-full p-2 px-4 dark:text-gray-400">
                    <div
                      className="line-clamp-1"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <Typography
                        className="text-sm p-0 font-medium capitalize"
                        placeholder={""}
                      >
                        {product.name}
                      </Typography>
                    </div>
                    <div className="line-clamp-1 text-[10px] dark:text-gray-600">
                      {product.productCategory.name}
                    </div>

                    <div className="flex gap-3 mt-2">
                      <Rating
                        placeholder={""}
                        value={4}
                        className="xs-product-rating px-0"
                        readonly={true}
                      />
                    </div>

                    <div className="w-full mt-4 flex justify-between text-xs">
                      <span className="">{product.price}</span>
                      <ShoppingCartIcon
                        onClick={() => proceedDealNow?.(product.id)}
                        className="h-4 w-4 text-pink-300"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </Carousel>

        {selectedProduct && (
          <ProductDetailsPopupComponent
            open={isPopupDetailsOpen}
            handleOpen={handleOpen}
            product={selectedProduct}
            handleRating={proceedRate}
            handleShare={proceedShare}
            handleDealNow={proceedDealNow}
          />
        )}
      </>
    );
  }, [
    products,
    isFetchingProduct,
    responsive,
    isPopupDetailsOpen,
    selectedProduct,
    handleOpen,
    handleSelectProduct,
    proceedRate,
    proceedShare,
    proceedDealNow,
  ]);

  return <>{formattedProducts}</>;
}
