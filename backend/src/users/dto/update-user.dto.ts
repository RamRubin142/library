import { User } from '../../schemas/user.schema';
export type UpdateUserDto = Omit<User, '_id'>;

