import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CarouselProductsComponent } from "./carouselProductsComponent";

export function MarketPlaceComponent() {
  //

  return (
    <Card placeholder={""} className="dark:bg-gray-900 w-full rounded-none shadow-none pb-12">
      <CardHeader placeholder={""} style={{ height: "200px" }} className="mt-5">
        <Image
          alt=""
          className="object-cover object-top"
          fill={true}
          src={"/marketplace-hero.jpg"}
        />
      </CardHeader>
      <CardBody placeholder={""} className="p-4 dark:text-gray-100">
        {/* // */}
        <Typography placeholder={""} variant="h6" className="py-3 flex gap-2 px-5">
          <ShoppingCartIcon className="w-4 h-4 mt-1" /> Latest
        </Typography>
        <CarouselProductsComponent />

        {/* // */}
        <Typography placeholder={""} variant="h6" className="py-3 flex gap-2 px-5">
          <ShoppingCartIcon className="w-4 h-4 mt-1" /> Recommended
        </Typography>
        <CarouselProductsComponent />
        {/* // */}
      </CardBody>
    </Card>
  );
}
