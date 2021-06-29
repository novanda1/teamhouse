import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { JWT } from '../middleware/jwt';

@Resolver()
export class HelloResolver {
  @UseMiddleware(JWT)
  @Query(() => String)
  hello() {
    return 'bye';
  }
}
