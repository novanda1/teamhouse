import { PubSub as poop, PubSubEngine } from 'apollo-server-express';
import {
  Arg,
  Field,
  ID,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Root,
  Subscription,
} from 'type-graphql';
// import { ChatTeam } from '../schema/chatTeamSchema';
// import { ChatTeamService } from '../services/chat/chatTeamService';

export const pubsub = new poop();

@ObjectType()
export class Notification {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;
}

export interface NotificationPayload {
  id?: number;
  message?: string;
}

export class SubscriptionResolver {
  //   constructor(private readonly chaTeamService = new ChatTeamService()) {}
  private autoIncrement = 0;

  @Subscription(() => String, {
    topics: 'CHAT_TEAM_UPDATED',
  })
  chatTeam(
    //     @Arg('teamId') teamId: string,
    @Arg('message') message: string,
    @PubSub() pubSub: PubSubEngine,
  ) {
    pubSub.publish('CHAT_TEAM_UPDATED', message);
    return 'halo';
  }

  @Mutation(() => Boolean)
  async pubSubMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg('message', { nullable: true }) message?: string,
  ): Promise<boolean> {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message };
    await pubSub.publish('NOTIFICATIONS', payload);
    return true;
  }

  @Mutation(() => Boolean)
  async publisherMutation(
    @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>,
    @Arg('message', { nullable: true }) message?: string,
  ): Promise<boolean> {
    await publish({ id: ++this.autoIncrement, message });
    return true;
  }

  @Subscription({ topics: 'NOTIFICATIONS' })
  normalSubscription(@Root() payload: NotificationPayload): Notification {
    return { ...payload, date: new Date() };
  }
}
