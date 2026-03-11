import { Author } from '../schemas/author.schema';
export type UpdateAuthorDto = Omit<Author, '_id'>;
