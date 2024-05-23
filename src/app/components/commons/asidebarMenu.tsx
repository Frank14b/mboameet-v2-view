import { Button, IconButton, Typography } from "@material-tailwind/react";
import UserStoriesCard from "../widgets/userStoriesCard";
import SideBarMenuListUserComponent from "../widgets/sidebar/menuListUser";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function AsideBarMenuComponent({ children }: { children: any }) {
  return (
    <>
      <div className="w-full pb-6 dark:text-gray-200">
        <div className="relative">
          <Typography placeholder={""} className="font-bold px-1 pb-1 gap-3">
            Stories{" "}
            <Button
                placeholder={""}
                size="sm"
                className="bg-pink-600 mx-3 p-1"
              >
               <PlusIcon className="w-4 h-4 cursor-pointer" />
              </Button>
          </Typography>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../communication-social-media-icons-smartphone-device.jpg"
              />
            </div>
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../beautiful-rendering-dating-app-concept.jpg"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../beautiful-rendering-dating-app-concept.jpg"
              />
            </div>
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../bgac72c497338f11a05d3d.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-6 dark:text-gray-200">
        <Typography placeholder={""} className="font-bold px-1">
          Suggestions
        </Typography>

        <div className="w-full">
          <SideBarMenuListUserComponent
            users={[
              {
                title: "Tania Andrew",
                image: "https://docs.material-tailwind.com/img/face-1.jpg",
              },
              {
                title: "Emma Willever",
                image: "https://docs.material-tailwind.com/img/face-3.jpg",
              },
            ]}
          />
          <p className="text-xs text-undelined px-1">See All</p>
        </div>
      </div>

      <div className="w-full pb-6 dark:text-gray-200">
        <Typography placeholder={""} className="font-bold px-1">
          Recommendations
        </Typography>

        <div className="mt-6">
          <div className="flex items-center -space-x-4 hidden">
            <Image
              fill={true}
              alt="user 1"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full  border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 2"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 3"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 4"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1287&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 5"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1760&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 1"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full  border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 2"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 3"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 4"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1287&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
            <Image
              fill={true}
              alt="user 5"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1760&amp;q=80"
              className="relative inline-block h-12 w-12 !rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
