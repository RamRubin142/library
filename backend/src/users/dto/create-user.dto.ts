import { User } from '../../schemas/user.schema';
export type CreateUserDto = Omit<User, '_id'>;
