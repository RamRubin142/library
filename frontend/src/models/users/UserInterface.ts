import type { BookInterfaceForMinimalDisplay } from "../books/dto/BookInterfaceMinimalDisplay.dto";

export interface UserInterface {
    _id : string;
    name : string;
    serialId : string;
    favorite : string;
    books : BookInterfaceForMinimalDisplay[]
}