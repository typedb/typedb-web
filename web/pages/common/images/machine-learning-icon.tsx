import React from "react";

export interface MachineLearningIconProps {
    color: string;
}

export const MachineLearningIcon: React.FC<MachineLearningIconProps> = ({color}) => {
    return (
        <svg width={42} height={38} xmlns="http://www.w3.org/2000/svg">
            <g fill={color} strokeWidth={0.5} fillRule="evenodd">
                <path d="M21 0a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM3 8a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM21 16a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM21 32a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4z" />
                <path d="M18.227 3.589l.423.906L5.96 10.41l-.422-.906zM18.227 18.411l.423-.906L5.96 11.59l-.422.906zM3 24a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM39 8a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM39 24a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4z" />
                <path d="M18.227 19.589l.423.906L5.96 26.41l-.422-.906zM18.227 34.411l.423-.906L5.96 27.59l-.422.906zM23.961 3.589l-.422.906 12.688 5.916.423-.906zM23.961 18.411l-.422-.906 12.688-5.916.423.906zM23.961 19.589l-.422.906 12.688 5.916.423-.906zM23.961 34.411l-.422-.906 12.688-5.916.423.906z" />
            </g>
        </svg>
    );
}
