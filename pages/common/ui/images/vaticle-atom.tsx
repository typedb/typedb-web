import React from 'react';

import { vaticleAtomStyles } from "./images-styles";

export const VaticleAtom: React.FC = (props) => {
    const classes = vaticleAtomStyles();

    return (
        <svg
            width={472}
            height={472}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={classes.root}
            {...props}
        >
            <defs>
                <circle id="vaticle-atom_svg__a" cx={62} cy={62} r={62} />
            </defs>
            <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                <g transform="translate(142 150)">
                    <circle fill="#2B2069" opacity={0.411} cx={95} cy={95} r={95} />
                    <g transform="translate(33 33)">
                        <mask id="vaticle-atom_svg__b" fill="#fff">
                            <use xlinkHref="#vaticle-atom_svg__a" />
                        </mask>
                        <use fill="#2B2069" xlinkHref="#vaticle-atom_svg__a" />
                        <g mask="url(#vaticle-atom_svg__b)">
                            <g transform="translate(32 25)">
                                <circle fill="#02DAC9" cx={30} cy={36.444} r={29.837} />
                                <path
                                    d="M41.636 21.982c8.077 0 14.625 6.548 14.625 14.625 0 8.07-6.543 14.613-14.614 14.613h-.01l-23.464-.018c-8.08-.006-14.638-6.535-14.68-14.615-.04-8.025 6.431-14.563 14.456-14.604h23.687zM20.732 30.47c-3.556 0-6.438 2.786-6.438 6.224 0 3.437 2.882 6.223 6.438 6.223 3.556 0 6.439-2.786 6.439-6.223 0-3.438-2.883-6.224-6.439-6.224zm19.585 0c-3.556 0-6.439 2.786-6.439 6.224 0 3.437 2.883 6.223 6.439 6.223s6.438-2.786 6.438-6.223c0-3.438-2.882-6.224-6.438-6.224z"
                                    fill="#1D1354"
                                />
                                <path
                                    d="M7.033.175a5.738 5.738 0 012.308 10.993v12.984H4.75V11.18A5.74 5.74 0 017.033.175z"
                                    fill="#02DAC9"
                                />
                            </g>
                        </g>
                    </g>
                </g>
                <circle stroke="#02DAC9" strokeWidth={0.4} cx={235} cy={235} r={234.8} className={classes.green}/>
                <path
                    d="M5.373 184.805C1.853 200.978 0 217.773 0 235c0 69.305 30 131.602 77.724 174.615M235 470c77.172 0 145.656-37.199 188.5-94.644C452.708 336.191 470 287.615 470 235m-10.804-70.644C429.206 69.088 340.172 0 235 0 166.35 0 104.575 29.437 61.61 76.377"
                    stroke="#02DAC9"
                    strokeWidth={2}
                    className={classes.green}
                />
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={235} cy={235} r={219.8}/>
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={235} cy={235} r={214.911}/>
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={235} cy={235} r={210.022}/>
                <path
                    d="M235 42.2c23.757 0 46.511 4.297 67.526 12.156a191.712 191.712 0 0119.842 8.73 192.568 192.568 0 0116.68 9.571C392.431 106.943 427.8 166.841 427.8 235c0 53.24-21.58 101.44-56.47 136.33-34.89 34.89-83.09 56.47-136.33 56.47-53.24 0-101.44-21.58-136.33-56.47C63.78 336.44 42.2 288.24 42.2 235c0-53.24 21.58-101.44 56.47-136.33C133.56 63.78 181.76 42.2 235 42.2h0z"
                    stroke="#F6C94C"
                    strokeWidth={0.4}
                    className={classes.yellow}
                />
                <path
                    d="M235 402c92.508 0 167.5-74.992 167.5-167.5"
                    stroke="#F97F51"
                    strokeWidth={0.6}
                    className={classes.red}
                />
                <path
                    d="M232 67c-58.559 0-110.12 29.96-140.19 75.389"
                    stroke="#F97F51"
                    strokeLinecap="round"
                    className={classes.red}
                />
                <path
                    d="M56.707 307.813a192.11 192.11 0 008.996 19.015m11.717 18.924a194.067 194.067 0 0051.732 50.33m203.196 5.896a193.276 193.276 0 0017.674-11.612m16.458-13.614c20.257-18.727 36.492-41.742 47.262-67.602m-69.81-233.833a192.935 192.935 0 00-18.856-11.315m-20.19-9.154C283.354 46.55 259.958 42 235.5 42"
                    stroke="#F6C94C"
                    strokeWidth={2}
                    className={classes.yellow}
                />
                <path
                    fill="#02DAC9"
                    d="M462.513 164.82l1.854 5.706-5.706 1.854-1.855-5.706z"
                    className={classes.green}
                />
                <circle stroke="#F97F51" strokeWidth={0.6} cx={243} cy={68} r={10.3} className={classes.red} />
                <circle fill="#F97F51" cx={243} cy={68} r={3} className={classes.red} />
                <path
                    d="M131.824 140.37a140.275 140.275 0 00-22.661 33.198C100.092 192.115 95 212.963 95 235m12.387 57.658a140.279 140.279 0 0028.008 40.723 140.337 140.337 0 0040.501 28.568M235 375c15.385 0 30.19-2.482 44.038-7.067M348 317.666a139.53 139.53 0 0020.68-40.95M375 235c0-14.247-2.128-27.997-6.084-40.949a139.299 139.299 0 00-14.902-32.814m-29.978-34.282a139.888 139.888 0 00-38.328-22.49C269.985 98.354 252.884 95 235 95m-39.27 5.582a139.25 139.25 0 00-33.504 14.795"
                    stroke="#F28DD7"
                    strokeWidth={2.5}
                    className={classes.pink}
                />
                <circle fill="#F28DD7" cx={338} cy={140} r={6} className={classes.pink} />
                <circle fill="#F28DD7" cx={201} cy={369} r={6} className={classes.pink} />
                <circle fill="#F28DD7" cx={97} cy={261} r={6} className={classes.pink} />
            </g>
        </svg>
    );
};
