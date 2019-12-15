import path from 'path';
import { Targets } from './signed-url-generator';

export type Id = string | string[] | number | number[];

export enum FileFormats {
  JPEG = 'jpeg',
  JPG = 'jpg',
  WEBP = 'webp',
  PNG = 'png',
  GIF = 'gif',
  TIFF = 'tiff',
}

export function getObjectKey(id: Id, target: Targets, fileFormat: FileFormats) {
  if (typeof id === 'number') {
    id = '' + id;
  } else if (Array.isArray(id)) {
    id = id.join('-');
  }

  id += `.${fileFormat}`;

  return path.join(target, id);
}
