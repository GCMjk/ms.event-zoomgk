import { IGuest } from "./guest.interface";
import { IUser } from "./user.interface";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description: string;
    date: Date;
    user: IUser;
    guests: IGuest[];
    key: string;
}