import { AuthChecker } from 'type-graphql';
import { Context } from '../../context';

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  if (context.userId) {
    return true;
  }

  return false;
};
