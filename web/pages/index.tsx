import React from 'react';
import ReactDOM from 'react-dom';
import "vaticle-web-components/dist/assets/css/prism.scss";
import "vaticle-web-components/dist/assets/css/reset.css";
import "vaticle-web-components/dist/assets/css/base.scss";
import { installPrismTypeQL } from "vaticle-web-components/dist/typeql/prism-typeql";
import { VaticleWebApp } from "./app";

installPrismTypeQL();

ReactDOM.render(<VaticleWebApp/>, document.getElementById('root'));
