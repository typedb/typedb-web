import React from 'react';
import ReactDOM from 'react-dom';
import "../common/assets/css/prism.scss";
import "../common/assets/css/reset.css";
import "../common/assets/css/base.scss";
import { installPrismTypeQL } from "../common/typeql/prism-typeql";
import { VaticleWebApp } from "./app";

installPrismTypeQL();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
