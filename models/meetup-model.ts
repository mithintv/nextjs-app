export type MeetupType = {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
};

export type MeetupTypeList = {
  meetups: MeetupType[];
};
