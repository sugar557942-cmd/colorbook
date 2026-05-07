import React from 'react';

interface CloudProps {
    className?: string;
    color?: string;
    opacity?: number;
    width?: number | string;
    height?: number | string;
}

const Cloud = ({ className, color = "currentColor", opacity = 1, width, height }: CloudProps) => {
    return (
        <svg
            viewBox="0 0 120 70"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ opacity }}
            width={width}
            height={height}
        >
            <path d="M100 40c0-11-9-20-20-20-2 0-3 0-5 1-4-8-13-13-22-13-13 0-24 9-27 21-1 0-2 0-3 0-11 0-20 9-20 20s9 20 20 20h57c11 0 20-9 20-20z" />
        </svg>
    );
};

export default Cloud;
