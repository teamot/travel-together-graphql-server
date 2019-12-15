import AWS from 'aws-sdk';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.log(`환경변수 AWS_ACCESS_KEY_ID 또는 AWS_SECRET_ACCESS_KEY가 정의되어있지 않습니다.`);
  process.exit(-1);
}

export const signatureVersion = 'v4';
export const region = 'us-east-1';
export const bucketName = 'travel-together2';
export const s3 = new AWS.S3({
  signatureVersion,
  region,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
