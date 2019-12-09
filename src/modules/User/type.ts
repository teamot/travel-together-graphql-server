import { ObjectType, Field, ID, registerEnumType, InputType } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  profileImageUrl?: string;

  @Field({ nullable: true })
  thumbnailImageUrl?: string;

  @Field()
  createdDate: Date;
}

@InputType()
export class GetUserArgs {
  @IsUUID('4')
  @Field(type => ID)
  id: string;
}
