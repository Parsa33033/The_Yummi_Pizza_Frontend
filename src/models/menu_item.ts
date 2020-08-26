

export interface MenuItem {
    id: number,

    name: string,

    description: string,

    ingredient: string,

    priceDollor: number,

    priceEuro: number,

    type: FoodType,

    picJpg: string,

    picJpgContentType: string,

    picPng: string,

    picPngContentType: string,

    pizzariaId: number,

}


export enum FoodType {
    PIZZA, BURGER, PASTA, DRINK
}