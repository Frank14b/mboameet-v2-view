'use client';

import { Typography } from "@material-tailwind/react";
import UserCardV2Component from "../../widgets/userCardV2";

export default function NewMembersComponent() {

    const bgImage = "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    const mainImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

    return (
        <>
            <div className="w-full text-center my-12">
                <Typography
                    placeholder={""}
                    variant="h2"
                    color="white"
                    className="mb-6 font-bold text-pink-600 leading-[1.5] text-xl"
                >
                    Meet New People Today!
                </Typography>
                <Typography placeholder={""} variant="h2" className="mb-4 text-gray-400 text-xxl font-bold">
                    New Members in the World
                </Typography>
            </div>
            <div className="grid lg:grid-rows-1 grid-flow-col gap-4 sm:grid-rows-3 md:grid-rows-2">
                <div className="">
                    <UserCardV2Component title="Tania Andrew" image={mainImage} bgImage={bgImage} />
                </div>
                <div className="">
                    <UserCardV2Component title="Tania Andrew" image={mainImage} bgImage={bgImage} />
                </div>
                <div className="">
                    <UserCardV2Component title="Tania Andrew" image={mainImage} bgImage={bgImage} />
                </div>
                <div className="">
                    <UserCardV2Component title="Tania Andrew" image={mainImage} bgImage={bgImage} />
                </div>
                <div className="">
                    <UserCardV2Component title="Tania Andrew" image={mainImage} bgImage={bgImage} />
                </div>
            </div>
        </>
    );
}
