'use client';

import AboutComponent from "./about";
import HowItsWorkComponent from "./howItsWork";
import NewMembersComponent from "./newMembers";

export default function HomePageComponent() {
    return (
        <div className="h-vh mh-300">
            <div className="w-full-width items-center py-12">
                <div className="container justify-between mt-12 items-center">
                    <NewMembersComponent />
                </div>
            </div>
            <div className="w-full-width items-center bg-gray-100 py-12">
                <div className="container justify-between mt-12 items-center">
                    <AboutComponent />
                </div>
            </div>
            <div className="w-full-width items-center bg-white-100 py-12">
                <div className="container justify-between mt-12 items-center">
                    <HowItsWorkComponent />
                </div>
            </div>
        </div>
    );
}
