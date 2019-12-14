import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../../../..', 'env', '.env') });

import { getSignedUrl } from '../signed-url-generator';

describe('S3 url signing', () => {
  test('문자열로 id를 전달한 경우 그 값을 포함하는 url을 반환한다', async () => {
    const id = 'ABCD';
    const createdUrl = await getSignedUrl(id, 'travel-room/cover/origin');
    expect(createdUrl.includes(id)).toBeTruthy();
  });

  test('문자의 배열로 id를 전달한 경우, id 값들을 대쉬(-)로 이어붙인 값을 포함하는 url을 반환한다', async () => {
    const id = ['ABCD', 'efg', 'HIjK'];
    const expected = 'ABCD-efg-HIjK';
    const createdUrl = await getSignedUrl(id, 'travel-room/cover/origin');
    expect(createdUrl.includes(expected)).toBeTruthy();
  });

  test('숫자로 id를 전달한 경우 그 값을 포함하는 url을 반환한다', async () => {
    const id = 2147;
    const expected = '' + id;
    const createdUrl = await getSignedUrl(id, 'travel-room/cover/origin');
    expect(createdUrl.includes(expected)).toBeTruthy();
  });

  test('숫자의 배열로 id를 전달한 경우, id 값들을 대쉬(-)로 이어붙인 값을 포함하는 url을 반환한다', async () => {
    const id = [1234, 5678, 90];
    const expected = '1234-5678-90';
    const createdUrl = await getSignedUrl(id, 'travel-room/cover/origin');
    expect(createdUrl.includes(expected)).toBeTruthy();
  });
});
