import React from 'react';
import ReactDOM from 'react-dom';
import "../components/styles/prism.scss";
import '../components/styles/reset.css';
import '../components/styles/base.scss';
import { installPrismTypeQL } from "../components/typeql/prism-typeql";
import { VaticleWebApp } from "./app";

installPrismTypeQL();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
