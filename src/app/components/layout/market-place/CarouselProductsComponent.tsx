import { useMemo, useState } from "react";
import { Card, CardBody, Rating, Typography } from "@material-tailwind/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomNextImage from "../../widgets/CustomNextImage";
import useProducts from "@/app/hooks/pages/marketplace/useProducts";
import { NoDataFound } from "../../widgets/NoDataFound";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export function CarouselProductsComponent() {
  //
  const [responsive] = useState({
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  });

  const { products, isLoading } = useProducts({});

  const formattedProducts = useMemo(() => {
    if (isLoading) return <>Loading...</>;
    if (products.length === 0)
      return (
        <NoDataFound
          customClass="dark:shadow-none dark:bg-gray-800"
          message="Products not found"
        />
      );

    return (
      <>
        <Carousel responsive={responsive}>
          {products.map((product, index) => (
            <div
              className="p-2 hover:scale-105 transform transition duration-2"
              key={index}
            >
              <Card
                placeholder={""}
                className="dark:bg-gray-900 p-0 cursor-pointer bg-gray-100 w-full shadow-none border-2 border-gray-100 dark:border-none"
              >
                <CardBody
                  placeholder={""}
                  className="min-h-[30vh] dark:text-gray-100 py-2 pb-4 p-0 hover:shadow-lg"
                >
                  <div className="h-[160px] relative">
                    <CustomNextImage
                      alt=""
                      className="object-cover rounded-lg"
                      fill={true}
                      src={product.image}
                    />
                  </div>
                  <div className="w-full p-2 px-4 dark:text-gray-400">
                    <div className="line-clamp-1">
                      <Typography
                        className="text-sm p-0 font-medium capitalize"
                        placeholder={""}
                      >
                        {product.name}
                      </Typography>
                    </div>

                    <div className="flex gap-3 mt-2">
                      <Rating
                        placeholder={""}
                        value={4}
                        className="xs-product-rating px-0"
                      />
                      <div className="line-clamp-1 text-xs flex gap-1 dark:text-gray-600">
                        <HomeIcon className="h-3 w-3 mt-[1px]" />{" "}
                        {product.store.name}
                      </div>
                    </div>

                    <div className="w-full mt-4 flex justify-between text-xs">
                      <span className="">{product.price}</span>
                      <ShoppingCartIcon className="h-4 w-4 text-pink-300" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </Carousel>
      </>
    );
  }, [products, isLoading, responsive]);

  return <>{formattedProducts}</>;
}
