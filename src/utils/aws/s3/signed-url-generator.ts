import { s3, bucketName } from './connect';
import path from 'path';

export type Prefix = 'travel-room/cover/origin';

type Id = string | string[] | number | number[];

export function getSignedUrl(id: Id, prefix: Prefix): Promise<string> {
  if (typeof id === 'number') {
    id = '' + id;
  } else if (Array.isArray(id)) {
    id = id.join('-');
  }

  const params = {
    Bucket: bucketName,
    Key: path.join(prefix, id),
    Expires: 10 * 60, // 30 minutes
    ContentType: 'image/jpeg',
  };

  return s3.getSignedUrlPromise('putObject', params);
}