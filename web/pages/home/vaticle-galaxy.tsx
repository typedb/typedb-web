import React from 'react';

import {vaticleGalaxyStyles} from "./home-styles";

export const VaticleGalaxy: React.FC = (props) => {
    const classes = vaticleGalaxyStyles();

    return (
        <svg width={480} height={480} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             className={classes.root} {...props}>
            <defs>
                <circle id="hero-image_svg__a" cx={95} cy={95} r={62} />
            </defs>
            <g fill="none" fillRule="evenodd">
                <rect width={480} height={480} rx={240} />
                <g transform="translate(145 145)">
                    <circle fill="#2B2069" opacity={0.411} cx={95} cy={95} r={95} />
                    <mask id="hero-image_svg__b" fill="#fff">
                        <use xlinkHref="#hero-image_svg__a" />
                    </mask>
                    <use fill="#2B2069" xlinkHref="#hero-image_svg__a" />
                    <g mask="url(#hero-image_svg__b)" fill="#02DAC9">
                        <g transform="translate(65 58)">
                            <path d="M30.246 6.56c16.685 0 30.21 13.526 30.21 30.21 0 16.685-13.525 30.21-30.21 30.21-16.684 0-30.21-13.525-30.21-30.21 0-16.684 13.526-30.21 30.21-30.21zM42.028 22.13H18.044C9.92 22.17 3.367 28.79 3.41 36.916c.042 8.18 6.682 14.791 14.863 14.798l23.756.018h.011c8.172 0 14.796-6.625 14.796-14.796 0-8.178-6.63-14.807-14.807-14.807z" />
                            <ellipse cx={20.863} cy={37.023} rx={6.519} ry={6.301} />
                            <ellipse cx={40.692} cy={37.023} rx={6.519} ry={6.301} />
                            <path d="M6.992.048a5.81 5.81 0 012.337 11.13v13.147H4.68V11.19A5.811 5.811 0 016.992.048z" />
                        </g>
                    </g>
                </g>
                <circle stroke="#02DAC9" strokeWidth={0.4} cx={240} cy={240} r={235} />
                <path
                    d="M461.964 162.624C429.976 70.851 342.678 5 240 5 164.48 5 97.28 40.624 54.287 95.983M8.803 197.666A236.375 236.375 0 005 240c0 93.368 54.451 174.019 133.33 211.929M240 475c1.747 0 3.49-.02 5.228-.057 114.725-2.504 209.19-87.224 226.819-197.584"
                    stroke="#02DAC9" strokeWidth={2} className={classes.green}/>
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={240} cy={240} r={220} />
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={240} cy={240} r={215} />
                <circle stroke="#1C4A97" strokeWidth={0.4} cx={240} cy={240} r={210} />
                <path
                    d="M240 433c106.591 0 193-86.409 193-193 0-68.23-35.405-128.19-88.845-162.511a192.768 192.768 0 00-16.696-9.581 191.912 191.912 0 00-19.862-8.74C286.559 51.302 263.782 47 240 47 133.409 47 47 133.409 47 240s86.409 193 193 193z"
                    stroke="#F6C94C" strokeWidth={0.4}/>
                <path
                    d="M348.233 80.181a193.299 193.299 0 00-20.774-12.273m-18.24-8.124c-.539-.207-1.08-.412-1.622-.615C286.559 51.3 263.782 47 240 47M323.76 413.926a192.677 192.677 0 0020.455-11.454m16.898-12.195a193.941 193.941 0 0046.136-53.896M47.56 225.19a195.704 195.704 0 00-.345 23.995m1.99 20.082a191.72 191.72 0 0023.527 67.08"
                    stroke="#F6C94C" strokeWidth={2} className={classes.yellow}/>
                <path
                    d="M240 408c92.784 0 168-75.216 168-168M237.495 72.018c-58.864.86-110.397 31.995-139.725 78.528"
                    stroke="#F66B65" className={classes.red}/>
                <path
                    fill="#02DAC9"
                    d="M466.513 166.82l1.854 5.706-5.706 1.854-1.855-5.706z" className={classes.green}/>
                <circle stroke="#F66B65" strokeWidth={0.6} cx={248} cy={73} r={10.3} className={classes.red} />
                <circle fill="#F66B65" cx={248} cy={73} r={3} className={classes.red} />
                <circle fill="#F28DD7" cx={100.5} cy={253.5} r={3.5} className={classes.pink} />
                <circle fill="#F28DD7" cx={253.5} cy={379.5} r={3.5} className={classes.pink} />
                <circle fill="#F28DD7" cx={379.5} cy={227.5} r={3.5} className={classes.pink} />
                <circle fill="#F28DD7" cx={228.5} cy={101.5} r={3.5} className={classes.pink} />
                <path
                    d="M196.113 105.54a140.604 140.604 0 00-34.356 16.693m-27.695 24.207c-18.093 20.52-30.321 46.336-34.062 74.827m5.899 62.951a140.718 140.718 0 0016.616 34.02m24.318 27.757c20.694 18.188 46.75 30.417 75.488 34.005m61.822-5.95a140.606 140.606 0 0033.958-16.521m28.22-24.75c17.909-20.49 29.996-46.203 33.679-74.556m-5.547-61.6a140.663 140.663 0 00-16.06-33.762m-24.012-28.07C314.058 116.504 288.4 104.033 260.024 100"
                    stroke="#F28DD7" strokeWidth={2} className={classes.pink}/>
            </g>
        </svg>
    );
};
