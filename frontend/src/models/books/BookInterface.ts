import type { UserInterfaceMinimalDisplay } from "@models/users/dto/UserInterfaceMinimalDisplay.dto";
export interface BookInterface {
    _id : string;
    name : string;
    serialId :string;
    author : {name : string};
    readers : UserInterfaceMinimalDisplay[];
}