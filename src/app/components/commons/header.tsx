'use client';

import React from "react";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import LoginPopupComponent from "./authentication/login";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <>
                    <LoginPopupComponent>
                        <Button
                            placeholder={""}
                            size="sm"
                            variant="text"
                            color="blue-gray"
                            className="flex items-center gap-1 rounded-full py-0.5 pr-5 pl-5 lg:ml-auto">
                            <span>Log In</span>
                        </Button>
                    </LoginPopupComponent>


                    {/* <Button
                        placeholder={""}
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    >
                        <Avatar
                            placeholder={""}
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                }`}
                        />
                    </Button> */}
                </>
            </MenuHandler>
            <MenuList placeholder={""} className="p-1 bg-white">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            placeholder={""}
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded  mt-2 ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 "
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                placeholder={""}
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list component
const navListItems = [
    {
        label: "Account",
        icon: UserCircleIcon,
    },
    {
        label: "About Us",
        icon: CubeTransparentIcon,
    },
    {
        label: "Docs",
        icon: CodeBracketSquareIcon,
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-7 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    placeholder={""}
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium"
                >
                    <MenuItem placeholder={""} className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span className="text-white"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export default function HeaderComponent() {

    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar placeholder={""} className="mx-auto w-full p-2 border-0 lg:pl-6 bg-pink-500">
            <div className="relative mx-auto flex items-center justify-between text-white-900">
                <Typography
                    placeholder={"MboaMeet"}
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    MboaMeet
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    placeholder={""}
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                <ProfileMenu />
            </div>
            {/* <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse > */}
        </Navbar>
    );
}
