export interface StationProduct {
    product: string,
    count?: number
    rate?: number
    price?: number
}

export interface Station {
    uid: number,
    title: string,
    note: string,
    desc: string,
    level: number
    type: string
    rasa: string
    danger: string
    products: StationProduct[],
    cell: {
        product: string,
        rate?: number
        price?: number
    }[]
}

