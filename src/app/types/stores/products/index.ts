export type ResultProductDto = {
    id: number,
    name: string,
    description: string,
    reference: string,
    image: string,
    price: number,
    priceUnit: number,
    priceUnitType: string,
    quantity: number,
    isUnlimited: boolean,
    createdAt: string,
    updatedAt: string,
    store: ResultProductStore,
    productCategory: ResultProductCategory,
    files: ResultProductFilesDto[],
    rating: number
}

export type ResultProductStore = {
    id: number,
    name: string,
    reference: string,
    userId: number,
    currency: {
        name: string,
        code: string,
        symbol: string,
    }
}

export type ResultProductCategory = {
    id: number,
    name: string,
}

export type ResultProductFilesDto = {
    id: number,
    url: string,
    previewUrl: string,
    type: string,
}

export type ResultProductRatingDto = {
    id: number,
    userId: number,
    rating: number
}