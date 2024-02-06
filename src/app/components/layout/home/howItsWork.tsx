'use client';

import { Typography } from "@material-tailwind/react";
import AboutCardComponent from "../../widgets/aboutCard";
import Image from "next/image";

export default function HowItsWorkComponent() {
    return (
        <>
            <div className="w-full text-center my-12">
                <Typography
                    placeholder={""}
                    variant="h2"
                    color="white"
                    className="mb-6 font-bold text-pink-600 leading-[1.5] text-xl"
                >
                    How Does It Work?
                </Typography>
                <Typography placeholder={""} variant="h2" className="mb-4 text-gray-600 text-4xl font-bold">
                    You're Just 3 Steps Away From A Great Date
                </Typography>
            </div>
            <div className="grid lg:grid-rows-1 grid-flow-col gap-4 sm:grid-rows-3 md:grid-rows-2">
                <div className="">
                    <AboutCardComponent title="Members in Total" subTitle="29,991" icon={'/01.png'} />
                </div>
                <div className="">
                    <AboutCardComponent title="Members Online" subTitle="29,000" icon={"/02.png"} />
                </div>
                <div className="">
                    <AboutCardComponent title="Men Online" subTitle="14,000" icon={"/03.png"} />
                </div>
                <div className="">
                    <AboutCardComponent title="Women Online" subTitle="15,000" icon={"/04.png"} />
                </div>
            </div>
        </>
    );
}
