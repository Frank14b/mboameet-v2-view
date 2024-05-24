import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { MarketPlaceEmptyCartComponent } from "./emptyCartComponent";

export function MarketPlaceCartComponent() {
  //

  return (
    <Card
      placeholder={""}
      className="dark:bg-gray-900 w-full dark:shadow-none pb-12 bg-transparent"
    >
      <CardHeader placeholder={""} className="mt-5 bg-transparent shadow-none">
        <Typography placeholder={""} variant="h6" className="py-3 dark:text-gray-100 bg-transparent text-center gap-2">
          Stores
        </Typography>
      </CardHeader>
      <CardBody placeholder={""} className="p-4 dark:text-gray-100">
        {/* // */}
        <MarketPlaceEmptyCartComponent />
        {/* // */}
      </CardBody>
    </Card>
  );
}
