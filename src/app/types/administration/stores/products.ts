export type CreateProductFormDto = {
    name: string,
    description: string,
    price: number,
    priceUnit: string,
    priceUnitType: string,
    photo: any,
    productCategoryId: number,
    quantity: number,
}