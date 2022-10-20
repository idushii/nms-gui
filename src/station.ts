export interface Station {
    title: string,
    products: {
        product: string,
        count?: number
        rate?: number
        price?: number
    }[],
    buy: {
        product: string,
        rate?: number
        price?: number
    }[]
}

