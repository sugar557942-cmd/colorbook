import React from 'react';

interface HeartProps {
    className?: string;
    color?: string;
    size?: number;
}

const Heart = ({ className, color = "#FF8B8B", size = 24 }: HeartProps) => {
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
                d="M12 21L10.5 19.5C5.4 14.9 2 11.8 2 8C2 4.9 4.4 2.5 7.5 2.5C9.3 2.5 11 3.3 12 4.6C13 3.3 14.7 2.5 16.5 2.5C19.6 2.5 22 4.9 22 8C22 11.8 18.6 14.9 13.5 19.5L12 21Z"
                fill={color}
            />
        </svg>
    );
};

export default Heart;
