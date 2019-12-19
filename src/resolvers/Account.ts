import { objectType, queryType } from 'nexus';
import { Context } from '../context';

export const Account = queryType({
  definition(t) {
    t.string('ping', {
      description: '테스트용 쿼리',
      resolve: async (root, args, context: Context): Promise<string> => {
        const result = await context.prisma.createAccount({ name: 'Sample' });
        return result.name;
      },
    });
  },
});
