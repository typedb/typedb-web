import React from "react";

export interface RoboticsIconProps {
    color: string;
}

export const RoboticsIcon: React.FC<RoboticsIconProps> = ({color}) => {
    return (
        <svg width={42} height={42} xmlns="http://www.w3.org/2000/svg" className="robotics">
            <g transform="translate(6 .6)" fill="none" fillRule="evenodd">
                <ellipse stroke={color} cx={16.97} cy={24.242} rx={12.444} ry={5.091} />
                <circle stroke={color} cx={10.747} cy={24.242} r={1} />
                <circle stroke={color} cx={23.192} cy={24.242} r={1} />
                <circle stroke={color} cx={16.97} cy={24.162} r={15.838} />
                <path stroke={color} strokeLinecap="square" d="M10.854 3.981l-.107 4.908"/>
                <circle fill={color} cx={11.085} cy={2.5} r={2.5} />
                <path stroke={color} strokeLinecap="square" d="M33.374 21.333v5.657M.566 21.333v5.657"/>
            </g>
        </svg>
    );
}
