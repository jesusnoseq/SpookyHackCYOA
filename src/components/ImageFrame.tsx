import React from 'react';

interface ImageFrameProps {
    src: string;
    alt?: string;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ src, alt }) => {
    return (
        <div className="items-start justify-center">
            <div className="border-4 border-red-950 shadow-[0_0_50px_rgba(255,0,0,0.3)] rounded-lg overflow-hidden mb-80">
                <img
                    src={src}
                    alt={alt}
                    className="object-scale-down"
                    style={{ height: 600 }}
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-700"></div> */}
            </div>
        </div>
    );
};


export default ImageFrame;