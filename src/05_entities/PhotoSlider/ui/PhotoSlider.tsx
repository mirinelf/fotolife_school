import React, {useEffect, useState} from 'react';
import {photoSlider} from "../../../06_shared/assets";
import {usePhotoSliderStore} from "../model/usePhotoSliderStore";

type PhotoSliderProps = {}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({}) => {
    const {setIsActive, photos, activeId, setActiveId} = usePhotoSliderStore()
    const [stateActiveId, setStateActiveId] = useState<number>(activeId as number)

    const handleNextPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStateActiveId(prevState => prevState + 1 >= photos.length
            ? 0
            : ++prevState
        )
    };

    useEffect(() => {
        setActiveId(stateActiveId)
    }, [stateActiveId])

    const handleLastPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStateActiveId(prevState => prevState - 1 < 0
            ? photos.length - 1
            : --prevState
        )
    };

    useEffect(() => {
        !photos[activeId as number] && setIsActive(false)
    }, [photos, activeId]);

    return (
        <div className="fixed w-full h-full bg-white z-50 flex justify-between px-10 py-20 items-center
        max-ph:px-5 max-ph:py-10">
            <button onClick={handleLastPhoto}>
                <img src={photoSlider.arrowLeft} alt="Arrow left"
                     className="max-ph:h-[10vw]"
                />
            </button>
            <img src={photos[activeId as number].file} alt="Main img"
                 className="max-w-[50vw] object-cover max-h-[50vw]
                 max-ph:max-h-[40vh]"
            />
            <button onClick={handleNextPhoto}>
                <img src={photoSlider.arrowRight} alt="Arrow right"
                     className="max-ph:h-[13vw]"
                />
            </button>
            <button className="absolute right-10 top-20
            max-ph:right-5 max-ph:top-10" onClick={() => setIsActive(false)}>
                <img src={photoSlider.close} alt="Close"
                     className="max-ph:w-[8vw]"
                />
            </button>
        </div>
    );
};