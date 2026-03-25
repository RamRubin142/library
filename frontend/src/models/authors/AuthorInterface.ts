import { type BookInterfaceForMinimalDisplay } from "../books/dto/BookInterfaceMinimalDisplay.dto";
export interface AuthorInterface {
  _id: string;
  name: string;
  serialId : string;
  books : BookInterfaceForMinimalDisplay[];
}
