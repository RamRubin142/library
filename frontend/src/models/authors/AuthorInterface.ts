import { type BookInterfaceForMinimalDisplay } from "@models/books/dto/BookInterfaceMinimalDisplay.dto";
export interface AuthorInterface {
  _id: string;
  name: string;
  serialId : string;
  books : BookInterfaceForMinimalDisplay[];
}
