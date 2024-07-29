import React from 'react';
import {findAllByDisplayValue} from "@testing-library/react";
import {Navbar} from "../../05_entities/Navbar";
import {Footer} from "../../06_shared/ui/footer";
import {MyH2} from "../../06_shared/ui/headings";
import {createAlbum} from "../../06_shared/assets";
import {CreateAlbum} from "../../04_features/CreateAlbum";

type CreateAlbumPageProps = {}

export const CreateAlbumPage: React.FC<CreateAlbumPageProps> = ({}) => {
    return (
        <div className="max-w-screen h-full flex flex-col bg-white">
            <Navbar isEmpty/>
            <div className="px-[5vw] flex flex-col gap-y-20 overflow-hidden">
                <CreateAlbum/>
                <Footer/>
            </div>
        </div>
    );
};