import { ObjectId } from "mongodb";

export type MeetupSubmissionType = {
  title: string;
  image: string;
  address: string;
  description: string;
};

export type MeetupType = MeetupSubmissionType & {
  id: string;
  _id?: ObjectId;
};

export type MeetupTypeList = {
  meetups: MeetupType[];
};
