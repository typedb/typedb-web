import React from "react";

export interface TelecommunicationsIconProps {
    color: string;
}

export const TelecommunicationsIcon: React.FC<TelecommunicationsIconProps> = ({color}) => {
    return (
        <svg width={33} height={42} xmlns="http://www.w3.org/2000/svg">
            <g fill={color} strokeWidth={0.5} fillRule="evenodd">
                <g transform="translate(7 6)">
                    <path d="M9.5 0A9.5 9.5 0 0119 9.5a9.501 9.501 0 01-5.496 8.617c-.27-.394-.406-.699-.407-.915a8.5 8.5 0 10-7.124.034 5.948 5.948 0 00-.396.862.827.827 0 01-.02.046A9.5 9.5 0 019.5 0z" />
                    <circle cx={5.781} cy={17.7} r={1} />
                    <circle cx={13.28} cy={17.669} r={1} />
                </g>
                <path d="M16.5 12a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 1a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                <path d="M16.5 0C25.613 0 33 7.387 33 16.5c0 5.606-2.796 10.56-7.07 13.541a11.502 11.502 0 01-.644-.639.267.267 0 00.025-.148C29.352 26.457 32 21.788 32 16.5 32 7.94 25.06 1 16.5 1 7.94 1 1 7.94 1 16.5c0 5.324 2.685 10.022 6.774 12.812-.159.177-.393.42-.702.73C2.797 27.062 0 22.108 0 16.5 0 7.387 7.387 0 16.5 0z" />
                <circle cx={7.424} cy={29.684} r={1} />
                <circle cx={25.589} cy={29.675} r={1} />
                <path d="M15.998 18.057h1v16h-1z" />
                <path d="M21 34a1 1 0 011 1v6a1 1 0 01-1 1h-9a1 1 0 01-1-1v-6a1 1 0 011-1h9zm0 1h-9v6h9v-6z" />
            </g>
        </svg>
    );
}
