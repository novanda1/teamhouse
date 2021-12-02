import { Test, TestingModule } from '@nestjs/testing';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

describe('TeamResolver', () => {
  let resolver: TeamResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamResolver, TeamService],
    }).compile();

    resolver = module.get<TeamResolver>(TeamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
