import React from 'react';
import ReactDOM from 'react-dom';
import "../common/assets/css/prism.scss";
import "../common/assets/css/reset.css";
import "../common/assets/css/base.scss";
import { installPrismTypeQL } from "../common/typeql/prism-typeql";
import { VaticleWebApp } from "./app";
import smoothscroll from "smoothscroll-polyfill";
import "smoothscroll-anchor-polyfill";
import scrollSnapPolyfill from "css-scroll-snap-polyfill";

smoothscroll.polyfill(); // Prerequisite for css-scroll-snap-polyfill
scrollSnapPolyfill(); // window.scrollTo({behavior: 'smooth'}) in Safari

installPrismTypeQL();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
