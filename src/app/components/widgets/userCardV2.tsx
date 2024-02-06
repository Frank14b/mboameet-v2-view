import { UserCardV2Component } from "@/app/types";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";


export default function UserCardV2Component({ bgImage, image, title, description }: UserCardV2Component) {

    return <>
        <Card
            placeholder={""}
            shadow={true}
            className="relative grid h-[20rem] w-full max-w-[100rem] items-end justify-center overflow-hidden text-center"
        >
            <CardHeader
                placeholder={""}
                floated={false}
                shadow={true}
                color="transparent"
                style={{ background: `url(${bgImage}) center/cover` }}
                className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 backdrop-blur-sm" />
            </CardHeader>
            <CardBody placeholder={""} className="relative py-14 px-6 md:px-12">
                {
                    description && (
                        <Typography
                            placeholder={""}
                            variant="h2"
                            color="white"
                            className="mb-6 font-medium leading-[1.5] text-lg"
                        >
                            {description}
                        </Typography>
                    )
                }

                <Typography placeholder={""} variant="h5" className="mb-4 text-gray-300 text-md">
                    {title}
                </Typography>
                <Avatar
                    placeholder={""}
                    size="xl"
                    variant="circular"
                    alt="tania andrew"
                    className="border-2 border-white"
                    src={image}
                />
            </CardBody>
        </Card>
    </>
}