import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { range } from "@/app/lib/utils";
import CustomNextImage from "../../widgets/CustomNextImage";

export function CarouselProductsComponent() {
  //

  const responsive = {
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
  };

  return (
    <Carousel responsive={responsive}>
      {range(1, 10).map((value: number, index: number) => (
        <div className="p-2" key={index}>
          <Card
            placeholder={""}
            className="dark:bg-gray-700 w-full shadow-none border-2 border-gray-100 dark:border-none"
          >
            <CardHeader
              placeholder={""}
              style={{ height: "120px" }}
              className="mt-5 shadow-none object-cover"
            >
              <CustomNextImage
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
                <Button size="sm" fullWidth placeholder={""} className="">
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
