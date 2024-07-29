import React from "react";

import './index.css';
import {withProviders} from "./providers";
import {Routing} from "../02_pages";

const App = () => {
    return (
        <Routing/>
    );
}

export default withProviders(App);

