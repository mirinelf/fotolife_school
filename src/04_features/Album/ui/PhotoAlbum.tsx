import React, {useEffect, useRef, useState} from 'react';
import {MyH3} from "../../../06_shared/ui/headings/MyH3";
import {
    TGalleryAlbumPhotoTypes, useGetLangQuery,
    useLazyGetGalleryAlbumPhotoTypesQuery,
    useLazyGetGalleryAlbumQuery
} from "../../../05_entities/FetchData";
import {MyH4} from "../../../06_shared/ui/headings";
import {home} from "../../../06_shared/assets";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {useShopStore} from "../../../05_entities/ShopCart";
import {useParams, useSearchParams} from "react-router-dom";
import {NotFoundPage} from "../../../02_pages/notFound";
import {usePopUpStore} from "../../../05_entities/PopUp";
import {usePhotoSliderStore} from "../../../05_entities/PhotoSlider";
import {useAlbumStore} from "../lib/useAlbumStore";
import {useLangStore} from "../../../05_entities/LangInfo";

type PhotoAlbumProps = {}

enum ButtonAction {
    DEL = 'del',
    ADD = 'add'
}

export const PhotoAlbum: React.FC<PhotoAlbumProps> = ({}) => {
    const [currPage, setCurrPage] =
        useState<number>(1)
    const [isNextPage, setIsNextPage] =
        useState<boolean>(true)
    const [photosType, setPhotosType] =
        useState<TGalleryAlbumPhotoTypes>({} as TGalleryAlbumPhotoTypes)
    const [photosContent, setPhotosContent] =
        useState<{id: string, file: string}[]>([])
    const [limitPage, setLimitPage] = useState(() => window.screen.width > 768
        ? 9
        : 6
    )
    const [isActiveToolBarBlur, setIsActiveToolBarBlur] =
        useState<{right: boolean; left: boolean}>({right: false, left: false})
    const [uuidAlbum, setUuidAlbum] =
        useState<string>('')

    const toolBarMenuRef = useRef<HTMLDivElement>(null)

    const [searchParams] = useSearchParams()

    const {activeMenu, setActiveMenu} = useAlbumStore()
    const {purchases, addPurchase, albumId: activeAlbumId,
        delPurchaseById, setAlbum, lastSaved} = useShopStore()
    const {setIsActiveAlbum, setIsDifferentAlbums, setLastAlbumId} = usePopUpStore()
    const {setIsActive, setActiveId, setPhotos} = usePhotoSliderStore()
    const {content} = useLangStore()


    const [firstActiveMenu, setFirstActiveMenu] =
        useState<number>(activeMenu)

    const [triggerPhotoType, {data: photosTypeFetch}] =
        useLazyGetGalleryAlbumPhotoTypesQuery()
    const [triggerContent, {data: photosContentFetch}] =
        useLazyGetGalleryAlbumQuery()

    useEffect(() => {
        searchParams &&
            setUuidAlbum(searchParams.get('album') ?? '')
    }, [searchParams]);

    useEffect(() => {
        if (uuidAlbum) {
            triggerPhotoType(uuidAlbum)
            setAlbum(uuidAlbum)
        }
    }, [uuidAlbum]);

    useEffect(() => {
        toolBarMenuRef.current!.scrollWidth > toolBarMenuRef.current!.clientWidth &&
            setIsActiveToolBarBlur(prevState => ({...prevState, right: true}))
    }, [photosType]);

    useEffect(() => {
        setCurrPage(1)
        setIsNextPage(true)
        setPhotosContent([])
        uuidAlbum &&
            triggerContent({album: uuidAlbum, page: currPage, page_size: limitPage, photo_type: activeMenu})
    }, [activeMenu]);

    useEffect(() => {
        isNextPage && uuidAlbum &&
            triggerContent({album: uuidAlbum, page: currPage, page_size: limitPage, photo_type: activeMenu})
    }, [currPage, uuidAlbum]);

    useEffect(() => {
        if (photosTypeFetch) {
            setPhotosType(photosTypeFetch)
            firstActiveMenu !== activeMenu && setActiveMenu(photosTypeFetch.photo_types[0].id)
        }
    }, [photosTypeFetch]);

    useEffect(() => {
        if (photosContentFetch) {
            currPage * limitPage >= photosContentFetch.count && setIsNextPage(false)
            setPhotosContent(prevState =>
                [...prevState, ...photosContentFetch.results])
        }
    }, [triggerContent, photosContentFetch]);

    const handleButtonCart = (e: React.MouseEvent<HTMLButtonElement>, id: string, file: string, action: ButtonAction) => {
        if (Object.values(purchases).length > 0 && Object.values(purchases)[0].albumId !== activeAlbumId) {
            setIsDifferentAlbums(true)
            setLastAlbumId(Object.values(purchases)[0].albumId)
            return;
        }

        if (action === ButtonAction.ADD) {
            setIsActiveAlbum(true, id)
            addPurchase(id, activeMenu, file)
        }

        if (action === ButtonAction.DEL) {
            delPurchaseById(id)
        }
    }

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setCurrPage(prevState => ++prevState)
    };

    const handleScrollToolBar = () => {
        const targetRef = toolBarMenuRef.current
        if (targetRef && targetRef.scrollWidth - targetRef.clientWidth === targetRef.scrollLeft) {
            setIsActiveToolBarBlur(prevState =>
                ({left: true, right: false}))
        } else {
            targetRef && targetRef.scrollLeft === 0
                ? setIsActiveToolBarBlur(prevState =>
                    ({left: false, right: true}))
                : setIsActiveToolBarBlur(prevState =>
                    ({left: true, right: true}))
        }
    };

    return (
        <div className="flex flex-col mb-24">
            <MyH3 styles="mt-12">{photosType.title}</MyH3>
            <div className="flex flex-col justify-start mb-[30px] mt-6">
                <div className="flex gap-x-6 border-b-[1px] border-b-black whitespace-nowrap overflow-y-auto"
                     ref={toolBarMenuRef}
                     onScroll={handleScrollToolBar}
                >
                    {photosType.photo_types?.map(photoType => (
                        <MyH4
                            styles={`py-2 cursor-pointer select-none transition-all duration-500 ease-in-out
                            ${activeMenu === photoType.id && 'border-b-4 border-b-primary'}`}
                            key={photoType.id}
                            onClick={(e) => setActiveMenu(photoType.id)}
                        >
                            {photoType.title}</MyH4>
                    ))}
                    {isActiveToolBarBlur.left &&
                        <div className="absolute -left-5 top-1/5 w-[13vw] h-[13vw] rounded-full bg-white
                opacity-90 blur-sm"/>}
                    {isActiveToolBarBlur.right &&
                        <div className="absolute -right-5 top-1/5 w-[13vw] h-[13vw] rounded-full bg-white
                opacity-90 blur-sm"/>}
                </div>
            </div>
            {photosType.photo_types?.map(photoType => activeMenu === photoType.id && (
                <div className="grid grid-cols-3 gap-6 w-full
                max-tb:grid-cols-2
                max-ph:gap-3"
                     key={photoType.id}>
                    {photosContent.map((photoContent, id) => (
                        <div className="flex flex-col gap-y-4" key={id}>
                            <img src={photoContent.file} alt="Album img" key={id} className="w-[550px] aspect-square
                            object-cover object-top rounded-3xl
                            max-tb:w-[350px]
                            max-ph:w-[180px]"
                                 onClick={() => {
                                     setIsActive(true)
                                     setActiveId(photoContent.id)
                                     addPurchase(photoContent.id, activeMenu, photoContent.file)
                                     setPhotos(photosContent.map(photoContent => ({
                                         photoType: activeMenu,
                                         ...photoContent
                                     })))
                                 }}
                            />
                            {purchases && purchases[photoContent.id]
                                ? <Button size={ESizes.x} type={EType.green}
                                          onClick={(e) =>
                                              handleButtonCart(e, photoContent.id, photoContent.file, ButtonAction.DEL)}>
                                    {content.delCart}</Button>
                                : <Button size={ESizes.x} type={EType.blue}
                                          onClick={(e) =>
                                              handleButtonCart(e, photoContent.id, photoContent.file, ButtonAction.ADD)}>
                                    {content.addCart}</Button>}
                        </div>
                    ))}
                </div>
            ))}
            {isNextPage && photosContent.length > 0 &&
                <div className="flex justify-center mt-[30px]">
                    <Button size={ESizes.s} type={EType.border} onClick={handleLoadMore}>
                        {content.more}
                    </Button>
                </div>}
        </div>
    );
};