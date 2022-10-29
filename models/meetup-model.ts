export type MeetupSubmissionType = {
  title: string;
  image: string;
  address: string;
  description: string;
};

export type MeetupType = MeetupSubmissionType & {
  id: string;
};

export type MeetupTypeList = {
  meetups: MeetupType[];
};
