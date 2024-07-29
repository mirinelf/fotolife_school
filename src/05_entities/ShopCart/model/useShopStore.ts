import {TPurchase, TService} from "./types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type States = {
    albumId: string
    lastSaved: number
    purchases: TPurchase
}

type Actions = {
    addPurchase: (idPurchase: string, photoType: number, file: string) => void
    setService: (idPurchase: string, idService: number, count: number) => void
    setSum: (idPurchase: string, newSum: number) => void
    setAlbum: (albumId: string) => void
    delPurchaseById: (id: string) => void
    isEmpty: (idPurchase: string) => boolean
    setError: (idPurchase: string, isError: boolean) => void
    clearPurchase: () => void
}

// Секунд * минуту * час * день
const TTL = 1000 * 60 * 60 * 24 * 5;

export const useShopStore = create<States & Actions>()(
    devtools(
        persist(
            (set, get) => ({
                albumId: '',
                lastSaved: 0,
                purchases: {},
                addPurchase: (idPurchase, photoType, file) => set(state => {
                    if (idPurchase in state.purchases)
                        return {purchases: {...state.purchases}}

                    const purchases = {...state.purchases,
                        [idPurchase]: {
                            photoType,
                            file,
                            albumId: state.albumId,
                            sum: 0,
                            services: {}
                        }
                    }

                    return {purchases, lastSaved: Date.now()}
                }),
                setService: (idPurchase, idService, count) => set(state => {
                    state.purchases[idPurchase].services[idService] = count
                    return {purchases: {...state.purchases}}
                }),
                setSum: (idPurchase, newSum) => set(state => {
                    state.purchases[idPurchase].sum = newSum
                    return {purchases: {...state.purchases}}
                }),
                setAlbum: (albumId) => set((state) =>
                    ({albumId})),
                delPurchaseById: (id) => set(state => {
                    delete state.purchases[id]
                    return {purchases: {...state.purchases}}
                }),
                isEmpty: (idPurchase) => {
                    const purchases = get().purchases

                    if (!purchases[idPurchase])
                        return true

                    return Object.keys(purchases[idPurchase].services).every(serKey => {
                        return purchases[idPurchase].services[parseInt(serKey)] === 0;
                    });
                },
                setError: (idPurchase, isError) => set(state => {
                    const updatePur = {...state.purchases[idPurchase], isError}
                    return {...state.purchases, [idPurchase]: updatePur}
                }),
                clearPurchase: () => set(state => ({
                    ...state,
                    purchases: {}
                }))
            }), {
                name: 'useShopStore',
                onRehydrateStorage: () => (state) => {
                    if (state && Date.now() - state.lastSaved > TTL) {
                        state.purchases = {}
                    }
                }
            }
        )
    )
)