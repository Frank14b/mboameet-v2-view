import { FeedNews } from "@/app/types";
import { ChatBubbleBottomCenterIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import {
    Avatar,
    Carousel,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

export default function FeedNewsComponent({ title, icon, subTitle, fileType }: FeedNews) {

    return (
        <>
            <div className="grid justify-items-between">
                <List placeholder={""} className="px-0">

                    <ListItem placeholder={""} className="px-2">
                        <ListItemPrefix placeholder={""}>
                            <Avatar placeholder={""} variant="circular" alt="candice" src={"https://docs.material-tailwind.com/img/face-1.jpg"} />
                        </ListItemPrefix>
                        <div>
                            <Typography placeholder={""} variant="h6" color="blue-gray">
                                George Lobko
                            </Typography>
                            <Typography placeholder={""} variant="small" color="gray" className="font-normal">
                                2 hours ago
                            </Typography>
                        </div>
                    </ListItem>
                </List>
            </div>

            <div className="grid justify-items-between rounded-xl px-3 text-sm text-black">
                <p>
                    Hi everyone, todayi adlkasdkasd skdlsak sdlklkadf kldaslkadslksadf
                    Hi everyone, todayi adlkasdkasd skdlsak sdlklkadf kldakasd skdlsak sdlklkadf <a href="#">kldaslkadslksadf</a>
                </p>
            </div>

            {
                fileType == "caroussel" && <div className="p-3 h-60">
                    <Carousel placeholder={""} loop={true} autoplay={true} className="rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="image 1"
                            className="h-full w-full object-cover object-center"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="image 2"
                            className="h-full w-full object-cover object-center"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                            alt="image 3"
                            className="h-full w-full object-cover object-center"
                        />
                    </Carousel>
                </div>
            }

            {
                fileType == "images" && <>
                    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-3 lg:overflow-visible">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                                    alt="" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                                    alt="" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2560&amp;q=80"
                                    alt="" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }

            {
                fileType == "video" && <>
                    <div className="p-3 h-100">
                        <video className="h-full w-full rounded-lg objectfit-cover" controls autoPlay>
                            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </>
            }


            <div className="px-3 pt-2 flex">
                <span className="flex text-gray-600 text-sm cursor-pointer"><EyeIcon className="h-5 w-5" />&nbsp;6356</span>
                <span className="flex px-6 text-pink-300 text-sm cursor-pointer"><HeartIcon className="h-5 w-5" />&nbsp;Like</span>
                <span className="flex text-gray-600 text-sm cursor-pointer"><ChatBubbleBottomCenterIcon className="h-5 w-5" />&nbsp;Comment</span>
            </div>
        </>
    )
}