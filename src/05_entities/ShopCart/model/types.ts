export type TService = {
    id: number,
    count: number
}

export type TPurchase = {
    [purKey: string]: {
        photoType: number,
        sum: number,
        file: string,
        albumId: string
        services: {
            [serKey: number]: number
        }
    }
}