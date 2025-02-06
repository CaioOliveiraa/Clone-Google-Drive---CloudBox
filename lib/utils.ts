import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) => {
    return JSON.parse(JSON.stringify(value));
}


export const getFileType = (fileName: string) => {

    const extension = fileName.split('.').pop();
    let type = '';
    
    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
            type = 'image';
            break;
        case 'mp4':
        case 'mkv':
        case 'webm':
            type = 'video';
            break;
        case 'mp3':
        case 'wav':
        case 'ogg':
            type = 'audio';
            break;
        case 'pdf':
        case 'doc':
        case 'docx':
            type = 'document';
            break;
        default:
            type = 'unknown';
            break;
    }


    return { type, extension };
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileIcon = (
  extension: string | undefined,
  type: File | string,
) => {
  switch (extension) {
    
    case 'pdf':
      return '/assets/icons/file-pdf.svg';
    case 'doc':
      return '/assets/icons/file-doc.svg';
    case 'docx':
      return '/assets/icons/file-docx.svg';
    case 'csv':
      return '/assets/icons/file-csv.svg';
    case 'txt':
      return '/assets/icons/file-txt.svg';
    case 'xls':
    case 'xlsx':
      return '/assets/icons/file-document.svg';
    
    case 'svg':
      return '/assets/icons/file-image.svg';
    
    case 'mkv':
    case 'mov':
    case 'avi':
    case 'wmv':
    case 'mp4':
    case 'flv':
    case 'webm':
    case 'm4v':
    case '3gp':
      return '/assets/icons/file-video.svg';

    case 'mp3':
    case 'mpeg':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'wma':
    case 'm4a':
    case 'aiff':
    case 'alac':
      return '/assets/icons/file-audio.svg';

    default:
      switch (type) {
        case 'image':
          return '/assets/icons/file-image.svg';
        case 'document':
          return '/assets/icons/file-document.svg';
        case 'video':
          return '/assets/icons/file-video.svg';
        case 'audio':
          return '/assets/icons/file-audio.svg';
        default:
          return '/assets/icons/file-other.svg';
      }
  }
};