import Head from "next/head";

import { MongoClient } from "mongodb";

import { GetStaticProps, GetServerSideProps } from "next";

import MeetupList from "../components/meetups/MeetupList";

import { MeetupTypeList } from "../models/meetup-model";

function HomePage(props: MeetupTypeList) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async function (context) {
//   // any code here will be run on the server but not on the client
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async function () {
  // code in this function will only execute in the build process. It will not be server-side or client-side
  // fetch data from an API or database
  const client = await MongoClient.connect(
    `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.80el5kh.mongodb.net/nextjs?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
