import React, {useEffect, useRef, useState} from 'react';
import {createAlbum} from "../../../06_shared/assets";
import {MyH3} from "../../../06_shared/ui/headings/MyH3";
import {MyP1} from "../../../06_shared/ui/paragraph";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    TRespAlbumUploadPhoto,
    useLazyGetGalleryAlbumPhotoTypesQuery,
    useUploadAlbumPhotosMutation
} from "../../../05_entities/FetchData";
import f from "compose-function";
import {useLazyGetAlbumUploadPhotoQuery} from "../../../05_entities/FetchData/lib/langInfoApi";
import {Loading} from "../../../06_shared/ui/loading";

type CreateAlbumProps = {}

type TPhoto = {
    id: number | string
    file: File
    name: string
}

export const CreateAlbum: React.FC<CreateAlbumProps> = ({}) => {
    const [photos, setPhotos] =
        useState<TPhoto[]>([])
    const [textError, setTextError] =
        useState<string>('')
    const [textSuccess, setTextSuccess] =
        useState<string>('')
    const [isEdit, setIsEdit] =
        useState<boolean>(false)
    const [isActiveDrag, setIsActiveDrag] =
        useState<boolean>(false)
    const [params, setParams] =
        useState<{album: string}>()
    const [albumData, setAlbumData] =
        useState<TRespAlbumUploadPhoto>({} as TRespAlbumUploadPhoto)
    const [activePhotoType, setActivePhotoType] =
        useState<string>("1")

    const imgRef = useRef<HTMLInputElement>(null)
    const inpRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const emptyBlockRef = useRef<HTMLDivElement>(null)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [triggerGetAlbum, {data: fetchAlbumData, isError: isErrorGetAlbum}] =
        useLazyGetAlbumUploadPhotoQuery()
    const [triggerUploadAlbum, {isError, isLoading}] =
        useUploadAlbumPhotosMutation()

    useEffect(() => {
        isEdit && inpRef.current && inpRef.current.focus()
    }, [isEdit]);

    useEffect(() => {
        setParams({album: searchParams.get('album') ?? ''})
    }, [searchParams])

    useEffect(() => {
        params?.album && triggerGetAlbum(params.album)
    }, [params]);

    useEffect(() => {
        if (fetchAlbumData && fetchAlbumData.photo_types) {
            setAlbumData(fetchAlbumData)
            setActivePhotoType(fetchAlbumData.photo_types[0]?.id.toString() ?? '')
        }
    }, [fetchAlbumData])

    useEffect(() => {
        isErrorGetAlbum && navigate('/error')
    }, [isErrorGetAlbum])

    useEffect(() => {
        isError &&
            setTextError('Упс, что-то пошло не так...')
    }, [isError]);

    const handleCloseImg = (e: React.MouseEvent<HTMLButtonElement>, id: string | number) => {
        e.preventDefault()
        setPhotos(prevState =>
            prevState.filter(photo => photo.id !== id))
    };

    const handleShowLoadImg = () => {
        imgRef.current && imgRef.current.click()
    };

    const handleLoadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach((file, id) => {
                setPhotos(prevState => [...prevState, {
                    id: prevState.length+1,
                    name: file.name,
                    file
                }])
            })
        }
    };

    const handleDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActiveDrag(false)
        if (e.dataTransfer.files) {
            Array.from(e.dataTransfer.files).forEach((file, id) => {
                setPhotos(prevState => [...prevState, {
                    id: prevState.length + 1,
                    name: file.name,
                    file
                }])
            })
        }
    };

    const handleSendImg = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // if (photos.length > 10) {
        //     setTextError('Максимальное количество изображений - 10')
        //     return
        // }

        if (photos.length === 0) {
            setTextError('Выберите изображения')
            return;
        }

        Promise.all<boolean>(photos.map(file => {
            return new Promise((resolve, reject) => {
                convertToBase64(file.file, base64 => {
                    triggerUploadAlbum({
                        title: file.name,
                        album: params!.album,
                        files: [base64 as string],
                        photo_type: activePhotoType
                    }).then(() => {
                        resolve(true)
                        setPhotos([])
                    }).catch(() => reject(false))
                })
            })
        })).then((isUploads) => {
            if (isUploads.every(isUploads => isUploads)) {
                setTextSuccess('Все файлы были успешно загружены')
            } else {
                setTextError('Не все файлы были успешно загружены')
                setTextSuccess('')
            }
        }).catch(() => {
            console.log('err')
        })
    };

    const convertToBase64 = (file: File, callback: (base64: string | ArrayBuffer) => void) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            callback(e.target?.result ?? '')
        }
        reader.readAsDataURL(file)
    }

    const handleEndDrag = (e: React.DragEvent<HTMLDivElement>, id: number | string) => {
        const contentRect = contentRef.current!.getBoundingClientRect()
        if (!(e.clientX > contentRect.left &&
            e.clientX < contentRect.left+contentRect.width &&
            e.clientY > contentRect.top &&
            e.clientY < contentRect.top + contentRect.height)
        ) {
            setPhotos(prevState => prevState.filter(photo => photo.id !== id))
        }
    };

    const handleOnLeave = () => {
        setIsActiveDrag(false)
    };

    return (
        <div className="flex flex-col items-center py-20 gap-y-8 px-32">
            <div className="flex gap-x-3">
                <MyH3 styles="whitespace-nowrap text-4xl">{albumData.title}</MyH3>
                <button onClick={() => setIsEdit(true)} className="hidden">
                    <img src={createAlbum.edit} alt="Edit name album"/>
                </button>
            </div>
            <div className="flex gap-x-3 items-center">
                <MyP1 styles="font-medium text-2xl opacity-80">Тип фото: {albumData.photo_types &&
                    albumData.photo_types.length === 0 && 'не найден'}</MyP1>
                {albumData.photo_types && albumData.photo_types.length !== 0 &&
                    <select name="" id="" placeholder="Выбрать"
                            className="font-montserrat font-medium rounded-3xl bg-transparent
                        px-5 py-2 border-solid border-black border-[1px]"
                            onChange={(e) => setActivePhotoType(e.target.value)}
                    >
                        {albumData.photo_types && albumData.photo_types.map(photoType =>
                            <option value={photoType.id} key={photoType.id}>{photoType.title}</option>
                        )}
                    </select>
                }
            </div>
            <div className={`w-full flex flex-wrap border-dashed border-2 p-3 rounded-2xl gap-4 select-none z-50 relative overflow-hidden
            transition-all ease-in-out duration-500
            ${photos.length === 0 && 'justify-center'}
            ${isActiveDrag ? 'border-primary' : 'border-black'}
            `}
                 ref={contentRef}
                 onDragLeave={handleOnLeave}
                 onDragOver={(e) => {
                     e.preventDefault()
                     setIsActiveDrag(true)
                 }}
                 onDrop={handleDropFiles}
            >
                {isLoading &&
                    <div className="absolute bg-white/[0.35] z-10 top-0 left-0
                    w-full h-full flex justify-center items-center">
                        <Loading/>
                    </div>}
                {photos.map(photo => (
                    <div className="flex flex-col relative justify-center items-center ring-1 ring-black/[0.05] rounded-2xl
                shadow-2xl px-1 py-5 w-1/6"
                         draggable
                         onDragEnd={(e) => handleEndDrag(e, photo.id)}
                         key={photo.id}
                    >
                        <img src={URL.createObjectURL(photo.file)} alt="Load img"
                             className="w-24 h-24 object-cover"
                        />
                        <div className="w-[80%] text-center break-words">
                            <MyP1>{photo.name}</MyP1>
                        </div>
                        <button onClick={(e) => handleCloseImg(e, photo.id)}>
                            <img src={createAlbum.close} alt="Close img"
                                 className="absolute right-2 top-2 w-4"
                            />
                        </button>
                    </div>
                ))}
                {photos.length === 0 &&
                    <div className="flex flex-col items-center my-12 gap-y-6 cursor-pointer"
                         ref={emptyBlockRef}
                         onClick={handleShowLoadImg}
                    >
                        <svg width="104" height="82" viewBox="0 0 104 82"
                             className={`transition-all ease-in-out duration-500
                             ${isActiveDrag ? 'fill-primary' : 'fill-[#1E1E1E]'}`}
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.114258 13.6229C0.114258 10.1338 1.48472 6.78764 3.92415 4.32048C6.36359
                                  1.85332 9.67217 0.467285 13.1221 0.467285H91.1688C92.877 0.467285 94.5685
                                  0.807566 96.1467 1.4687C97.7249 2.12983 99.1589 3.09887 100.367 4.32048C101.575
                                  5.5421 102.533 6.99236 103.186 8.58848C103.84 10.1846 104.177 11.8953 104.177
                                  13.6229V69.1689C104.177 70.8966 103.84 72.6073 103.186 74.2034C102.533
                                  75.7995 101.575 77.2498 100.367 78.4714C99.1589 79.693 97.7249 80.662 96.1467
                                  81.3232C94.5685 81.9843 92.877 82.3246 91.1688 82.3246H13.1221C9.67217 82.3246
                                  6.36359 80.9385 3.92415 78.4714C1.48472 76.0042 0.114258 72.658 0.114258
                                  69.1689V13.6229ZM8.78612 47.5937V69.1689C8.78612 71.5896 10.7286 73.5542
                                  13.1221 73.5542H91.1688C92.3188 73.5542 93.4217 73.0921 94.2348 72.2698C95.048
                                  71.4474 95.5048 70.332 95.5048 69.1689V53.4407L82.6704 40.4663C81.8574 39.6451
                                  80.7554 39.1838 79.6064 39.1838C78.4573 39.1838 77.3553 39.6451 76.5423 40.4663L65.5001
                                  51.6281L68.2173 54.3762C68.6433 54.7776 68.985 55.2618 69.222 55.7997C69.459
                                  56.3376 69.5864 56.9183 69.5967 57.5071C69.6069 58.0959 69.4998 58.6807 69.2818
                                  59.2268C69.0637 59.7728 68.7391 60.2688 68.3274 60.6852C67.9156 61.1017 67.4252
                                  61.4299 66.8853 61.6505C66.3454 61.871 65.7671 61.9794 65.1849 61.969C64.6027
                                  61.9586 64.0286 61.8297 63.4967 61.59C62.9648 61.3503 62.4861 61.0048 62.0892
                                  60.5739L32.0845 30.2341C31.2715 29.4129 30.1695 28.9516 29.0205 28.9516C27.8714
                                  28.9516 26.7694 29.4129 25.9564 30.2341L8.78612 47.5937ZM63.7079 23.8551C63.7079
                                  25.4058 63.0988 26.893 62.0146 27.9895C60.9305 29.086 59.46 29.702 57.9267
                                  29.702C56.3934 29.702 54.9229 29.086 53.8387 27.9895C52.7545 26.893 52.1454
                                  25.4058 52.1454 23.8551C52.1454 22.3044 52.7545 20.8172 53.8387 19.7207C54.9229
                                  18.6242 56.3934 18.0081 57.9267 18.0081C59.46 18.0081 60.9305 18.6242 62.0146
                                  19.7207C63.0988 20.8172 63.7079 22.3044 63.7079 23.8551Z"
                                  fillOpacity="0.5"/>
                        </svg>
                        <MyP1 styles={`font-medium text-2xl opacity-80 transition-all ease-in-out duration-500
                        ${isActiveDrag && 'text-primary'}`}>Перетащите изображения или нажмите
                            сюда</MyP1>
                    </div>}
                <input type="file" accept="image/*" multiple
                       className="hidden"
                       onChange={handleLoadImg}
                       ref={imgRef}
                />
            </div>
            {textError &&
                <p className="w-full font-montserrat text-lg flex justify-start text-red -mt-6">
                    {textError}
                </p>}
            {!textError && textSuccess &&
                <p className="w-full font-montserrat text-lg flex justify-start text-emerald-500 -mt-6">
                    {textSuccess}
                </p>}
            <Button size={ESizes.s} type={EType.blue} onClick={handleSendImg}>
                Загрузить
            </Button>
        </div>
    );
};