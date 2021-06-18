import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class HelloResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  hello() {
    return 'bye';
  }
}
