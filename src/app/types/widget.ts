import { HTMLInputTypeAttribute } from "react";

export type InpputFormComponent = {
	title: string;
	name?: string;
	type?: HTMLInputTypeAttribute;
	id?: string;
	onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
	value?: string;
	defaultValue?: string | number;
	placeholder?: string;
};

export type UserCardComponent = {
	image?: string;
	title?: string;
	description?: string;
};

export type UserCardV2 = {
	bgImage: string;
	image: string;
	title: string;
	description?: string;
};

export type AboutCardComponent = { 
    title: string; 
    icon: any; 
    subTitle: string 
};

export type SideBarMenuList = {
	title: string; 
    icon: any;
	active?: boolean;
	badge?: string;
}

export type SideBarMenuListUser = {
	title: string; 
    image?: any;
	active?: boolean;
	badge?: string;
}
