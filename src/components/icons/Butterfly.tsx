import React from 'react';

interface ButterflyProps {
    className?: string;
    color?: string;
    size?: number;
}

const Butterfly = ({ className, color = "#C3AED6", size = 24 }: ButterflyProps) => {
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
                d="M12 18C12 18 12 14 12 12C12 10 12 6 12 6M12 12C12 12 15 8 19 8C23 8 23 12 21 15C19 18 15 17 12 12ZM12 12C12 12 9 8 5 8C1 8 1 12 3 15C5 18 9 17 12 12Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color}
                fillOpacity="0.3"
            />
        </svg>
    );
};

export default Butterfly;
