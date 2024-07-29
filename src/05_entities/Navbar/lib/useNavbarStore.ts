import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    isActive: boolean
}

type Actions = {
    setIsActive: (newState: boolean) => void
}

export const useNavbarStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                isActive: false,
                setIsActive: (newState) => set(() => ({
                    isActive: newState
                }))
            }), {name: 'useNavbarStore'}
        )
    )
)