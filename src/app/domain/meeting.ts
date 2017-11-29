import { Article } from "app/domain/article";

export class Meeting{
    location?:string;
    invitationTemplate?:Article;
    date?:Date;
}