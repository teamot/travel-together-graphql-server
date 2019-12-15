import path from 'path';
import { Targets } from './signed-url-generator';

export type Id = string | string[] | number | number[];

export function getObjectKey(id: Id, target: Targets) {
  if (typeof id === 'number') {
    id = '' + id;
  } else if (Array.isArray(id)) {
    id = id.join('-');
  }

  return path.join(target, id);
}
