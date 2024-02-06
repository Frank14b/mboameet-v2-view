import { AboutCardComponent } from "@/app/types";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export default function AboutCardComponent({ title, icon, subTitle }: AboutCardComponent) {

    return (
        <Card placeholder={""} className="mt-6 w-full text-center bg-indigo-500">
            <CardBody placeholder={""}>

                <div className="w-full justify-center flex">
                    <img alt="MboaMeet" width={100} height={100} src={icon} />
                </div>

                <div className="my-6">

                    <Typography placeholder={""} variant="h2" color="white" className="text-4xl font-bold">
                        {subTitle}
                    </Typography>

                    <Typography placeholder={""} variant="h5" color="white" className="text-sm font-medium">
                        {title}
                    </Typography>

                </div>
            </CardBody>
        </Card>
    )
}