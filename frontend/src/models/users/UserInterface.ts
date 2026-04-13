import type { BookInterfaceForMinimalDisplay } from "@models/books/dto/BookInterfaceMinimalDisplay.dto";

export interface UserInterface {
    _id : string;
    name : string;
    serialId : string;
    favorite : string;
    books : BookInterfaceForMinimalDisplay[]
}