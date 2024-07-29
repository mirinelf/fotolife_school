import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type TPhoto = {
    id: string | number,
    file: string
    photoType?: number
}

type State = {
    isActive: boolean,
    activeId: number | string
    photos: TPhoto[]
}

type Actions = {
    setIsActive: (newState: boolean) => void,
    setPhotos: (newPhotos: TPhoto[]) => void
    setActiveId: (id: number | string) => void
}

export const usePhotoSliderStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                isActive: false,
                photos: [],
                activeId: 0,
                setPhotos: (newPhotos) => set(() => ({
                    photos: newPhotos
                })),
                setIsActive: (newState) => set(() => ({
                    isActive: newState
                })),
                setActiveId: (id) => set(() => ({
                    activeId: id
                }))
            }), {name: 'usePhotoSliderStore'}
        )
    )
)