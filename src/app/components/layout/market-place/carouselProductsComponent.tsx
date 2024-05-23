import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { range } from "@/app/lib/utils";

export function CarouselProductsComponent() {
  //

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {range(1, 10).map((value: number, index: number) => (
        <div className="p-2">
          <Card
            key={index}
            placeholder={""}
            className="dark:bg-gray-800 w-full shadow-none border-2 border-gray-100 dark:border-none"
          >
            <CardHeader
              placeholder={""}
              style={{ height: "150px" }}
              className="mt-5 shadow-none"
            >
              <Image
                alt=""
                className="object-cover"
                fill={true}
                src={"/marketplace-hero.jpg"}
              />
            </CardHeader>
            <CardBody placeholder={""} className="dark:text-gray-100">
              <div className="w-full">
                <Typography placeholder={""}>Iphone 15 Pro Max</Typography>
                <small>adasds asds</small>
              </div>
              <div className="w-full mt-4">
                <Button size="sm" placeholder={""} className="">
                  Buy Now
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </Carousel>
  );
}
