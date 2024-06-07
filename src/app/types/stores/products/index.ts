import { ResultStoreDto } from ".."

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
    store: ResultProductStore
    productCategory: ResultProductCategory
}

export type ResultProductStore = {
    id: number,
    name: string,
    reference: string,
    userId: number,
}

export type ResultProductCategory = {
    id: number,
    name: string,
}