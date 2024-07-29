import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "../01_app";
import {HomePage} from "../02_pages/home";
import {LangSwitcher} from "../06_shared/ui/switcher";
import {Button, ESizes, EType} from "../05_entities/Buttons";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Button">
                <div className="flex flex-col p-10 gap-y-2 items-start justify-start">
                    <Button size={ESizes.s} type={EType.blue}>
                        Blue S
                    </Button>
                    <Button size={ESizes.x} type={EType.blue}>
                        Blue X
                    </Button>
                    <Button size={ESizes.s} type={EType.green}>
                        Green S
                    </Button>
                    <Button size={ESizes.x} type={EType.green}>
                        Green X
                    </Button>
                    <Button size={ESizes.s} type={EType.border}>
                        Border S
                    </Button>
                    <Button size={ESizes.x} type={EType.border}>
                        Border X
                    </Button>
                </div>
            </ComponentPreview>
            <ComponentPreview path="/Button">
                <Button size={ESizes.x} type={EType.blue}>
                    _
                </Button>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/LangSwitcher">
                <LangSwitcher/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;