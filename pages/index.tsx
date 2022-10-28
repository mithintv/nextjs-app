import { GetStaticProps, GetServerSideProps } from "next";

import MeetupList from "../components/meetups/MeetupList";

import { MeetupTypeList } from "../models/meetup-model";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some Address 5, 12345 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some Address 10, 12345 Some City",
    description: "This is a first meetup",
  },
];

function HomePage(props: MeetupTypeList) {
  return <MeetupList meetups={props.meetups} />;
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  // any code here will be run on the server but not on the client
  const req = context.req;
  const res = context.res;

  // fetch data from an API

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

// export const getStaticProps: GetStaticProps = async function() {
//   // code in this function will only execute in the build process. It will not be server-side or client-side
//   // fetch data from an API or database
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 10,
//   };
// }

export default HomePage;
