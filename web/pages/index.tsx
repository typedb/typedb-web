import React from 'react';
import ReactDOM from 'react-dom';
import "typedb-visualiser/prism.scss";
import "../common/assets/css/reset.css";
import "../common/assets/css/base.scss";
import {VaticleWebApp} from "./app";
import smoothscroll from "smoothscroll-polyfill";
import "smoothscroll-anchor-polyfill";
import scrollSnapPolyfill from "css-scroll-snap-polyfill";
import { installPrismJava, installPrismPython } from "../common/code/prism";
import { installPrismTypeQL } from "typedb-visualiser";

smoothscroll.polyfill(); // Prerequisite for css-scroll-snap-polyfill
scrollSnapPolyfill(); // window.scrollTo({behavior: 'smooth'}) in Safari

installPrismTypeQL();
installPrismJava();
installPrismPython();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
