import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Rating,
} from "@material-tailwind/react";
import {
  ResultProductDto,
  ResultProductFilesDto,
} from "@/app/types/stores/products";
import CustomNextImage from "../../widgets/CustomNextImage";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useMainContext } from "@/app/contexts/main";

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

  const [selectedImage, setSelectedImage] = useState<ResultProductFilesDto>(
    product.files[0]
  );
  const { isDark } = useMainContext();

  useEffect(() => {
    if (open) {
      setSelectedImage(product.files[0]);
    }
  }, [open, product, setSelectedImage]);

  return (
    <>
      <Dialog
        placeholder={""}
        open={open}
        handler={handleOpen}
        size="lg"
        className={`${isDark ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <DialogHeader placeholder={""}>
          <div className="w-full">
            <div className="line-clamp-2">
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className={`font-medium ${isDark ? "text-gray-100" : ""}`}
              >
                {product.name}
              </Typography>
            </div>
            <Typography
              placeholder={""}
              variant="small"
              color="gray"
              className={`text-xs font-normal ${isDark ? "text-gray-400" : ""}`}
            >
              {product.productCategory.name}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody
          placeholder={""}
          className="overflow-y-auto max-h-[70vh] max-w-[900px]"
        >
          <div className="lg:flex">
            <div className="sm:flex xs:grid gap-1 w-full pb-5">
              <div
                className={`lg:w-[90px] xs:flex gap-2 overflow-y-auto max-h-[300px] px-1 rounded-lg ${
                  isDark ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                {product.files.map((file, index) => (
                  <CustomNextImage
                    key={index}
                    alt={product.name}
                    src={file.url}
                    height={80}
                    width={80}
                    className="rounded-lg mb-2 cursor-pointer"
                    onClick={() => setSelectedImage(file)}
                  />
                ))}
              </div>
              <div className="w-full sm:w-[350px] xs:w-full">
                <CustomNextImage
                  alt={product.name}
                  src={selectedImage.url}
                  height={300}
                  width={1000}
                  className="rounded-lg shadow-lg"
                  blurDataURL={selectedImage.previewUrl}
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
                className={`font-bold ${isDark ? "text-gray-200" : ""}`}
                as={"div"}
              >
                Price: {product.price} {product.store.currency.code} -{" "}
                {product.priceUnit} {product.priceUnitType}
              </Typography>
              <Rating
                placeholder={""}
                value={4}
                className="xs-product-rating px-0"
              />
              <Button
                placeholder={""}
                size="sm"
                color="pink"
                className="my-5 flex items-center shadow-none"
              >
                Deal Now
              </Button>
              <Typography
                placeholder={""}
                color="gray"
                className={`font-medium mt-3 ${isDark ? "text-gray-100" : ""}`}
              >
                Description
              </Typography>
              <div
                className={`${isDark ? "text-gray-300" : ""} text-sm`}
                dangerouslySetInnerHTML={{ __html: product.description }}
              >
                {/* // */}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter placeholder={""} className="justify-between">
          <div></div>
          <div className="flex gap-3">
            <Button
              placeholder={""}
              size="sm"
              variant="outlined"
              color="blue-gray"
            >
              Share
            </Button>
            <Button placeholder={""} size="sm" color="pink">
              Deal Now
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
