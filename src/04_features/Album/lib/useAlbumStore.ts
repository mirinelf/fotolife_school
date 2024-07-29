import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    activeMenu: number
}

type Actions = {
    setActiveMenu: (activeMenu: number) => void
}

export const useAlbumStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                activeMenu: 1,
                setActiveMenu: (activeMenu) => set(() => ({
                    activeMenu
                }))
            }), {name: 'useAlbumStore'}
        )
    )
)