import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { ResultProductDto } from "@/app/types/stores/products";
import CustomNextImage from "../../widgets/CustomNextImage";
import { range } from "@/app/lib/utils";
import { HomeIcon } from "@heroicons/react/24/solid";

export function ProductDetailsPopupComponent({
  open,
  product,
  handleOpen,
}: {
  open: boolean;
  product: ResultProductDto;
  handleOpen: () => void;
}) {
  //
  return (
    <>
      <Dialog placeholder={""} size="lg" open={open} handler={handleOpen}>
        <DialogHeader placeholder={""}>
          <div className="w-full">
            <div className="flex flex-col">
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {product.name}
              </Typography>
              <Typography
                placeholder={""}
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                {product.productCategory.name}
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody placeholder={""} className="overflow-y-auto max-h-[75vh]">
          <div className="lg:flex">
            <div className="sm:flex xs:grid gap-1 w-full pb-5">
              <div className="lg:w-[90px] xs:flex gap-2 bg-gray-200 overflow-y-auto max-h-[300px] px-1 rounded-lg">
                {range(1, 5).map((value) => (
                  <CustomNextImage
                    key={value}
                    alt={product.name}
                    src={product.image}
                    height={80}
                    width={80}
                    className="rounded-lg mb-2 cursor-pointer"
                  />
                ))}
              </div>
              <div className="w-full sm:w-[350px] xs:w-full">
                <CustomNextImage
                  alt={product.name}
                  src={product.image}
                  height={300}
                  width={1000}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="w-full pl-3">
              <Typography
                placeholder={""}
                color="pink"
                className="font-medium text-xs flex gap-1"
                as={"div"}
              >
                <HomeIcon className="w-3 h-3 mt-[1px]" />{" "}
                <span>Seller: {product.store.name}</span>
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-bold"
                as={"div"}
              >
                Price: {product.price} - {product.priceUnit}{" "}
                {product.priceUnitType}
              </Typography>
              <hr />
              <Rating
                placeholder={""}
                value={4}
                className="xs-product-rating px-0"
              />
              <Typography
                placeholder={""}
                color="gray"
                className="font-medium mt-3"
              >
                Description
              </Typography>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              >
                {/* // */}
              </div>
            </div>
          </div>
          {/* <div className="w-full bg-gray-200 rounded-lg mt-2 pt-2">
            <Typography
              placeholder={""}
              color="pink"
              className="font-bold text-sm px-3"
            >
              Similar Products
            </Typography>
            <CarouselProductsComponent
              responsive={productDetailsCarouselResponsive}
            />
          </div> */}
        </DialogBody>
        <DialogFooter placeholder={""} className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography
                placeholder={""}
                variant="small"
                color="gray"
                className="font-normal"
              >
                Views
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                44,082,044
              </Typography>
            </div>
          </div>
          <Button
            placeholder={""}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
