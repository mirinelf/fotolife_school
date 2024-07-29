import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    activeId: string,
    isActiveCart: boolean,
    isActiveAlbum: boolean
    isDifferentAlbums: boolean
    lastAlbumId: string
    isAcceptCookie: boolean
}

type Actions = {
    setIsActiveCart: (newState: boolean) => void
    setIsActiveAlbum: (newState: boolean, activeId: string) => void
    setIsDifferentAlbums: (isDifferentAlbums: boolean) => void
    setLastAlbumId: (lastAlbumId: string) => void
    setIsAcceptCookie: (isAcceptCookie: boolean) => void
}

export const usePopUpStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                isActiveAlbum: false,
                isActiveCart: false,
                isDifferentAlbums: false,
                lastAlbumId: '',
                activeId: '0',
                isAcceptCookie: false,
                setIsActiveAlbum: (newState, activeId) => set(() => ({
                    isActiveAlbum: newState,
                    activeId
                })),
                setIsActiveCart: (newState) => set(() => ({
                    isActiveCart: newState
                })),
                setIsDifferentAlbums: (isDifferentAlbums) => set(() => ({
                    isDifferentAlbums
                })),
                setLastAlbumId: (lastAlbumId) => set(() => ({
                    lastAlbumId
                })),
                setIsAcceptCookie: (isAcceptCookie) => set(() => ({
                    isAcceptCookie
                }))
            }), {name: 'usePopUpStore'}
        )
    )
)