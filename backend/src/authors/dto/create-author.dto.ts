import { Author } from '../../schemas/author.schema';
export type CreateAuthorDto = Omit<Author, '_id'>;
