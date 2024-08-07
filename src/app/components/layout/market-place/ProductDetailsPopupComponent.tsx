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
import { useScopedI18n } from "@/app/locales/client";

export type ProductDetailsPopupComponentProps = {
  open: boolean;
  product: ResultProductDto;
  handleOpen: () => void;
  handleRating?: (productRef: string, rating: number) => void;
  handleDealNow?: (productId: number) => void;
  handleShare?: (product: ResultProductDto) => void;
};

export function ProductDetailsPopupComponent({
  open,
  product,
  handleOpen,
  handleRating,
  handleDealNow,
  handleShare,
}: ProductDetailsPopupComponentProps) {
  //
  const scopedT = useScopedI18n("marketPlace.products.details.popup");

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
        size="xl"
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
        <DialogBody placeholder={""} className="overflow-y-auto h-[75vh]">
          <div className="">
            <div className={`${isDark ? "bg-black" : "bg-gray-400"} w-full rounded-md mb-4`}>
              <CustomNextImage
                alt={product.name}
                src={selectedImage.url}
                height={300}
                width={1000}
                className="h-auto w-full max-w-full rounded-lg object-contain object-center md:h-[50vh]"
                blurDataURL={selectedImage.previewUrl}
              />
            </div>
            <div
              className={`w-full flex items-end gap-4 overflow-x-auto rounded-lg ${
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
          </div>

          <div className="w-full mt-4">
            <Typography
              placeholder={""}
              color="pink"
              className="font-medium text-xs flex gap-1"
              as={"div"}
            >
              <HomeIcon className="w-3 h-3 mt-[1px]" />{" "}
              <span>
                {scopedT("seller")}: {product.store.name}
              </span>
            </Typography>
            <Typography
              placeholder={""}
              color="blue-gray"
              className={`font-bold ${isDark ? "text-gray-200" : ""}`}
              as={"div"}
            >
              {scopedT("price")}: {product.price} {product.store.currency.code}{" "}
              - {product.priceUnit} {product.priceUnitType}
            </Typography>
            <Rating
              placeholder={""}
              value={4}
              className="xs-product-rating px-0"
              onChange={(value) => handleRating?.(product.reference, value)}
            />
            <Button
              placeholder={""}
              size="sm"
              color="pink"
              className="my-5 flex items-center shadow-none"
              onClick={() => handleDealNow?.(product.id)}
            >
              {scopedT("deal_now")}
            </Button>
            <Typography
              placeholder={""}
              color="gray"
              className={`font-medium mt-3 ${isDark ? "text-gray-100" : ""}`}
            >
              {scopedT("description")}
            </Typography>
            <div
              className={`${isDark ? "text-gray-300" : ""} text-sm`}
              dangerouslySetInnerHTML={{ __html: product.description }}
            >
              {/* // */}
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
              onClick={() => handleShare?.(product)}
            >
              {scopedT("share")}
            </Button>
            <Button
              onClick={() => handleDealNow?.(product.id)}
              placeholder={""}
              size="sm"
              color="pink"
            >
              {scopedT("deal_now")}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
