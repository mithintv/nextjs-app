// our-domain.com/:meetupId
import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

import { GetStaticProps, GetStaticPaths } from "next";
import { MeetupType } from "../../models/meetup-model";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props: { meetupData: MeetupType }) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData.id.toString()}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  // describe all the dynamic site pages that need to be pre-generated

  const client = await MongoClient.connect(
    `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.80el5kh.mongodb.net/nextjs?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, {}).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId.toString();
  console.log(meetupId);

  const client = await MongoClient.connect(
    `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.80el5kh.mongodb.net/nextjs?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
