import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ID } from 'type-graphql';
import { User, GetUserArgs } from './type';
import { Account } from './models/user';
import { Context } from '../../context';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(returns => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    return ctx.userId ? await Account.findOne(ctx.userId) : undefined;
  }

  @Query(returns => User, { nullable: true, name: 'user' })
  async getUser(@Arg('input') input: GetUserArgs): Promise<User | undefined> {
    const account = await Account.findOne(input.id);
    console.log(account);
    return account;
  }
}
