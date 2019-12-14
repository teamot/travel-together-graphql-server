import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../../../..', 'env', '.env') });

import { s3, bucketName } from '../connect';

describe('S3 연결 확인', () => {
  test('버킷이 존재해야한다', async () => {
    const promise = s3.headBucket({ Bucket: bucketName }).promise();
    expect(promise).resolves.toBe({});
  });
});
