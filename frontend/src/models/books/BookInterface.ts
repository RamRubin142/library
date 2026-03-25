import type { UserInterfaceMinimalDisplay } from "../users/dto/UserInterfaceMinimalDisplay.dto";
export interface BookInterface {
    _id : string;
    name : string;
    serialId :string;
    author : {name : string};
    readers : UserInterfaceMinimalDisplay[];
}