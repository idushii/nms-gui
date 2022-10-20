export interface StationProduct {
    product: string,
    count?: number
    rate?: number
    price?: number
}

export interface Station {
    uid: number,
    title: string,
    level: number
    type1: string
    type2: string
    products: StationProduct[],
    cell: {
        product: string,
        rate?: number
        price?: number
    }[]
}

