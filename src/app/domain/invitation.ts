import { Meeting } from "app/domain/meeting";
import { User } from "app/domain/user";

export class Invitation{
    meeting?:Meeting;
    to?:User;
    status?:string='NOT_SENT';
}