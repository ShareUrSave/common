import { User as BaseUser } from '@prisma/client';

type User = Omit<BaseUser, 'password'>;

export type { BaseUser, User };
