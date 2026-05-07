import React from 'react';

interface LeafProps {
    className?: string;
    color?: string;
    size?: number;
}

const Leaf = ({ className, color = "#8BC48A", size = 24 }: LeafProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M2 22C2 22 10 22 16 16C22 10 22 2 22 2C22 2 14 2 8 8C2 14 2 22 2 22Z"
                fill={color}
            />
            <path
                d="M2 22L12 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Leaf;
