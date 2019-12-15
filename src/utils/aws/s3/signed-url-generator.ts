import path from 'path';
import { s3, bucketName } from './connect';
import { getObjectKey, Id, FileFormats } from './object-key';

export enum Targets {
  TRAVEL_ROOM_COVER_ORIGIN = 'travel-room/cover/origin',
}

export interface SignedUrlData {
  bucketName: string;
  key: string;
  expires?: number;
  contentType: string;
  signedUrl: string;
}

export async function getSignedUrl(id: Id, target: Targets, fileFormat: FileFormats): Promise<SignedUrlData> {
  const key = getObjectKey(id, target, fileFormat);
  const expires = 5 * 60; // 5분
  const contentType = 'image/jpeg';

  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: bucketName,
    Key: key,
    Expires: expires,
    ContentType: contentType,
  });

  return {
    bucketName,
    key,
    expires,
    contentType,
    signedUrl,
  };
}
