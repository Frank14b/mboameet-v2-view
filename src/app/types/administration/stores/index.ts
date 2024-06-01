export type CreateStoreFormDto = {
    name: string,
    description: string,
    email?: string,
    phoneNumber: string,
    country: {
        callingCode: string,
        name: string
    },
    address: string,
    website: string,
    photo: any,
    storeTypeId: number,
    currencyId: number,
    city: string,
    zipCode: string,
}