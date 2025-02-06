import Image from "next/image";
import React from "react";
import { getFileIcon, cn } from "@/lib/utils";

interface Props {
    type: string;
    extention: string;
    url?: string;
    imageClassName?: string;
    className?: string;
}

const Thumnail = ({ type, extention, url = '', imageClassName, className }: Props) => {
    const isImage = type === 'image' && extention !== 'svg';

    return <figure className={cn('thumbnail', className)}>
        <Image src={isImage ? url : getFileIcon(extention, type)} alt="Thumnail" width={100} height={100} className={cn('size-8 object-contain', imageClassName, isImage && "thumbnail-image")} />
    </figure>
};

export default Thumnail;