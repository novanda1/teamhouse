import { JwtGuard } from './jwt-guard.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuard()).toBeDefined();
  });
});
