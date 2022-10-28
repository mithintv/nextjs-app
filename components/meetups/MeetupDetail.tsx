import classes from "./MeetupDetail.module.css";

import { MeetupType } from "../../models/meetup-model";

function MeetupDetail(props: MeetupType) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
