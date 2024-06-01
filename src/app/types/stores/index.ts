export type ResultStoreDto = {
    id: number,
    name: string,
    email?: string,
    description: string,
    reference: string,
    logo: string,
    address: string,
    country: string,
    city: string,
    zipCode?: string,
    phoneNumber: string,
    callingCode: string,
    website?: string,
    createdAt: string,
    updatedAt: string,
    status: boolean,
    user: StoreOwnerDto,
    storeType: StoreCategoryDto,
    currency: StoreCurrencyDto,
}

export type StoreOwnerDto = {
    id: number,
    name: string,
}

export type StoreCategoryDto = {
    id: number,
    name: string,
}

export type StoreCurrencyDto = {
    id: number,
    name: string,
    code: string,
}