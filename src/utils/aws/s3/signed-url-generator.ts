import path from 'path';
import { s3, bucketName } from './connect';
import { getObjectKey, Id } from './object-key';

export enum Targets {
  TRAVEL_ROOM_COVER_ORIGIN = 'travel-room/cover/origin',
}

export function getSignedUrl(id: Id, target: Targets): Promise<string> {
  const params = {
    Bucket: bucketName,
    Key: getObjectKey(id, target),
    Expires: 5 * 60, // 5분
    ContentType: 'image/jpeg',
  };

  return s3.getSignedUrlPromise('putObject', params);
}
