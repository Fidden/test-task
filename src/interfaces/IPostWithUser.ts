import {IPost} from "./IPost";
import {IUser} from "./IUser";

export interface IPostWithUser extends IPost {
    user?: IUser;
}
