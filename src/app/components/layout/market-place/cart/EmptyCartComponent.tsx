import useCustomRouter from "@/app/hooks/useCustomRouter";
import { marketplacePathUrl } from "@/app/lib/constants/app";
import { useScopedI18n } from "@/app/locales/client";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

export function MarketPlaceEmptyCartComponent() {
  //
  const { push } = useCustomRouter();
  const scopedT = useScopedI18n("marketPlace.emptyCart");

  return (
    <div className="p-4 dark:text-gray-100 text-center grid justify-items-center">
      {/* // */}
      <Typography placeholder={""} variant="h4" className="py-3 gap-2">
        {scopedT("title")}
      </Typography>

      <Image
        alt=""
        className="object-cover my-20"
        width={250}
        height={250}
        src={"/empty-cart2.webp"}
      />
      {/* // */}
      <div className="">
        <Button
          onClick={() => push(marketplacePathUrl)}
          placeholder={""}
          className="dark:bg-pink-400"
        >
          {scopedT("back_to_marketplace")}
        </Button>
      </div>
      {/* // */}
    </div>
  );
}
