import React, {useEffect, useRef, useState} from 'react';
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {home} from "../../../06_shared/assets";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {
    TGalleryPortfolioPhotoType,
    useGetGalleryPortfolioPhotoTypesQuery,
    useGetGalleryPortfolioQuery, useGetLangQuery, useLazyGetGalleryPortfolioQuery
} from "../../../05_entities/FetchData";
import {usePhotoSliderStore} from "../../../05_entities/PhotoSlider";
import {useLangStore} from "../../../05_entities/LangInfo";

type PortfolioProps = {}

type TData = {
    portfolio: string
    more: string
}

export const Portfolio: React.FC<PortfolioProps> = ({}) => {
    const [activeMenu, setActiveMenu] =
        useState<number>(1)
    const [currPage, setCurrPage] =
        useState<number>(1)
    const [isNextPage, setIsNextPage] =
        useState<boolean>(true)
    const [photoTypes, setPhotoTypes] =
        useState<TGalleryPortfolioPhotoType[]>([])
    const [photosContent, setPhotosContent] =
        useState<{file: string, photo_type: number}[]>([])
    const [limitPage, setLimitPage] = useState(() => window.screen.width > 768
        ? 9
        : 6
    )
    const [isActiveToolBarBlur, setIsActiveToolBarBlur] =
        useState<{right: boolean; left: boolean}>({right: false, left: false})

    const toolBarMenuRef = useRef<HTMLDivElement>(null)

    const {setIsActive, setPhotos, setActiveId} = usePhotoSliderStore()
    const {content} = useLangStore()

    const {data: photoTypesFetch} = useGetGalleryPortfolioPhotoTypesQuery()
    const [trigger, {data: photoContentFetch}] =
        useLazyGetGalleryPortfolioQuery()

    useEffect(() => {
        toolBarMenuRef.current!.scrollWidth > toolBarMenuRef.current!.clientWidth &&
            setIsActiveToolBarBlur(prevState => ({...prevState, right: true}))
    }, [photoTypes])

    useEffect(() => {
        photoTypesFetch && setPhotoTypes(() => {
            setActiveMenu(photoTypesFetch[0].id)
            return photoTypesFetch
        })
    }, [photoTypesFetch]);

    useEffect(() => {
        setCurrPage(1)
        setIsNextPage(true)
        setPhotosContent([])
        trigger({photo_type: activeMenu, page: currPage, page_size: limitPage})
    }, [activeMenu]);

    useEffect(() => {
        isNextPage && trigger({photo_type: activeMenu, page: currPage, page_size: limitPage})
    }, [activeMenu, currPage]);

    useEffect(() => {
        if (photoContentFetch) {
            currPage * limitPage >= photoContentFetch.count && setIsNextPage(false)
            setPhotosContent(prevState =>
                [...prevState, ...photoContentFetch.results])
        }
    }, [trigger, photoContentFetch]);

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setCurrPage(prevState => ++prevState)
    };

    const handleShowPhotoSlider = (e: React.MouseEvent<HTMLImageElement>, activeId: number) => {
        setIsActive(true)
        setPhotos(photosContent.map((photo, id) =>
            ({file: photo.file, id})))
        setActiveId(activeId)
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

    window.onresize = () => {
        setLimitPage(window.screen.width > 768
            ? 9
            : 6
        )

        const {scrollWidth, clientWidth} = toolBarMenuRef.current!

        if (scrollWidth > clientWidth + 50)
            setIsActiveToolBarBlur(prevState => ({...prevState, right: true}))

        if (scrollWidth < clientWidth + 50)
            setIsActiveToolBarBlur(prevState => ({left: false, right: false}))
    }

    return (
        <div className="mt-[8vh] w-full overflow-hidden
        max-ph:mt-[5vw]"
             id="portfolio">
            <MyH2 styles="mb-2 uppercase">{content.portfolio}</MyH2>
            <div className="flex flex-col justify-start mb-[30px] relative">
                <div className="flex gap-x-6 border-b-[1px] border-b-black/[0.35] overflow-x-auto"
                     ref={toolBarMenuRef}
                     onScroll={handleScrollToolBar}
                >
                    {photoTypes.map(photoType => (
                        <MyH4 styles={`py-2 cursor-pointer select-none transition-all duration-500 ease-in-out
                        ${activeMenu === photoType.id && 'border-b-4 border-b-primary'}
                        whitespace-nowrap`}
                              key={photoType.id}
                              onClick={(e: React.MouseEvent<HTMLHeadElement>) => {
                                  setActiveMenu(photoType.id)
                                  const photoTypeRef = e.currentTarget
                                  if (toolBarMenuRef.current && photoTypeRef) {
                                      const menuScrollWidth = toolBarMenuRef.current.offsetWidth;
                                      const photoTypeOffset = photoTypeRef.offsetLeft;
                                      const photoTypeWidth = photoTypeRef.offsetWidth;

                                      const scrollTo = photoTypeOffset - (menuScrollWidth / 2) + (photoTypeWidth / 2);
                                      toolBarMenuRef.current.scrollLeft = scrollTo;
                                  }
                              }}
                        >
                            {photoType.title}</MyH4>
                    ))}
                </div>
                {isActiveToolBarBlur.left &&
                    <div className="absolute -left-5 top-1/5 w-[13vw] h-[13vw] rounded-full bg-white
                opacity-90 blur-sm
                max-tb:w-[5vw] max-tb:h-[5vw]"/>}
                {isActiveToolBarBlur.right &&
                    <div className="absolute -right-5 top-1/5 w-[13vw] h-[13vw] rounded-full bg-white
                opacity-90 blur-sm
                max-tb:w-[5vw] max-tb:h-[5vw]"/>}
            </div>
            {photoTypes.map(photoType => photoType.id === activeMenu && (
                <div className="grid grid-cols-3 gap-6 w-full
                max-tb:grid-cols-2
                max-ph:gap-3"
                     key={photoType.id}>
                    {photosContent.map((photoContent, id) => (
                        <img src={photoContent.file} alt="" key={id} className="w-[500px] aspect-square
                        object-cover object-top rounded-3xl
                        max-tb:w-[370px]
                        max-ph:w-[180px]"
                             onClick={(e) => handleShowPhotoSlider(e, id)}
                        />
                    ))}
                </div>
            ))}
            {isNextPage && photosContent.length > 0 &&
                <div className="flex justify-center mt-[30px]">
                    <Button size={ESizes.s} type={EType.blue} onClick={handleLoadMore}>
                        {content.more}
                    </Button>
                </div>}
        </div>
    );
};