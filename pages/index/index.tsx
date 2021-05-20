import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/prism.scss";
import '../styles/reset.css';
import '../styles/base.scss';
import { installPrismTypeQL } from "../common/typeql/prism-typeql";
import { VaticleWebApp } from "./app";

installPrismTypeQL();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
