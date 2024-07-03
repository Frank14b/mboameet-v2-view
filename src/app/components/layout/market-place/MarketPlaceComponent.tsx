import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowRightIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { CarouselProductsComponent } from "./CarouselProductsComponent";
import CustomNextImage from "../../widgets/CustomNextImage";
import { useScopedI18n } from "@/app/locales/client";

export function MarketPlaceComponent() {
  //

  const scopedT = useScopedI18n("marketPlace");

  return (
    <div className="w-full">
      <Card
        placeholder={""}
        className="dark:bg-gray-800 shadow-none dark:shadow-lg w-full rounded-lg"
      >
        <CardHeader
          placeholder={""}
          className="mt-5 shadow-none px-5 bg-transparent"
        >
          <div className="flex justify-between">
            <Typography
              placeholder={""}
              variant="h5"
              className="py-3 flex gap-2 text-pink-400"
            >
              <ShoppingCartIcon className="w-5 h-5 mt-[2px]" />{" "}
              {scopedT("latest")}
            </Typography>

            <div className="mt-6 text-xs flex gap-1 hover:animate-pulse underline underline-offset-4 decoration-dotted cursor-pointer dark:text-gray-100">
              {scopedT("see_more")} <ArrowRightIcon className="w-4 h-4" />{" "}
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder={""} className="p-4 pt-0 dark:text-gray-100">
          {/* // */}
          <CarouselProductsComponent />
        </CardBody>
      </Card>

      <Card
        placeholder={""}
        className="dark:bg-gray-800 w-full shadow-none dark:shadow-lg rounded-lg mt-5"
      >
        <CardBody placeholder={""} className="p-4 pt-0 dark:text-gray-100">
          <section className="py-16 px-8">
            <div className="w-full text-center">
              <Typography
                placeholder={""}
                className="mb-4 text-pink-400"
                variant="h3"
              >
                New Collection
              </Typography>
              <p className="px-5">
                Easily preview furniture, decor, and more in your space,
                ensuring everything fits perfectly and looks just right. It{"'"}
                s the ultimate tool for hassle-free home customization and
                design!
              </p>
            </div>
            <div className="mx-auto mt-5 container grid place-items-center grid-cols-1 md:grid-cols-2">
              <CustomNextImage
                src="https://material-tailwind.com/image/product-4.png"
                alt="pink blazer"
                className="h-[26rem] w-[90%] rounded-lg object-contain"
                height={250}
                width={250}
              />
              <div>
                <Typography placeholder={""} className="mb-4" variant="h3">
                  Premium Blazer
                </Typography>
                <Typography placeholder={""} variant="h5">
                  $1,490
                </Typography>
                <Typography
                  placeholder={""}
                  className="!mt-4 text-base font-normal leading-[27px] !text-gray-500"
                >
                  As we live, our hearts turn colder. Cause pain is what we go
                  through as we become older. We get insulted by others, lose
                  trust for those others. We get back stabbed by friends. It
                  becomes harder for us to give others a hand. We get our heart
                  broken by people we love, even that we give them all we have.
                  Then we lose family over time. What else could rust the heart
                  more over time? Blackgold.
                </Typography>
                <div className="my-8 flex items-center gap-2">
                  <Rating
                    placeholder={""}
                    value={4}
                    className="text-amber-500"
                  />
                  <Typography
                    placeholder={""}
                    className="!text-sm font-bold !text-gray-700"
                  >
                    4.0/5 (100 reviews)
                  </Typography>
                </div>
                <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                  <Button placeholder={""} color="gray" className="w-52">
                    Buy Now
                  </Button>
                  <IconButton
                    placeholder={""}
                    color="gray"
                    variant="text"
                    className="shrink-0"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </IconButton>
                </div>
              </div>
            </div>
          </section>
        </CardBody>
      </Card>

      <Card
        placeholder={""}
        className="dark:bg-gray-800 shadow-none dark:shadow-lg w-full rounded-lg mt-5"
      >
        <CardHeader
          placeholder={""}
          className="mt-5 shadow-none px-5 bg-transparent"
        >
          <div className="flex justify-between">
            <Typography
              placeholder={""}
              variant="h5"
              className="py-3 flex gap-2 text-pink-400"
            >
              <ShoppingCartIcon className="w-5 h-5 mt-[2px]" />{" "}
              {scopedT("recommended")}
            </Typography>

            <div className="mt-6 text-xs dark:text-gray-100 flex gap-1 hover:animate-pulse underline underline-offset-4 decoration-dotted cursor-pointer">
              {scopedT("see_more")} <ArrowRightIcon className="w-4 h-4" />{" "}
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder={""} className="p-4 pt-0 dark:text-gray-100">
          {/* // */}
          <CarouselProductsComponent />

          <div className="flex justify-between px-5">
            <Typography
              placeholder={""}
              variant="h5"
              className="py-3 flex gap-2 text-pink-400"
            >
              <ShoppingBagIcon className="w-5 h-5 mt-[2px]" />{" "}
              {scopedT("features")}
            </Typography>

            <div className="mt-6 text-xs dark:text-gray-100 flex gap-1 hover:animate-pulse underline underline-offset-4 decoration-dotted cursor-pointer">
              {scopedT("see_more")} <ArrowRightIcon className="w-4 h-4" />{" "}
            </div>
          </div>

          <CarouselProductsComponent />
          {/* // */}
        </CardBody>
      </Card>
    </div>
  );
}
