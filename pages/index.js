import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const inputEmail = useRef();
  const inputFeedback = useRef();
  const [feedbacks, setFeedBacks] = useState([]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const enteredFeedback = inputFeedback.current.value;

    const datasAPI = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(datasAPI),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data)); //{email:, text:}
  };

  const loadFeedBack = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedBacks(data.feedback);
      });
  };

  return (
    <div className={styles.container}>
      <h1>The Home Page</h1>
      <form>
        <input type="email" ref={inputEmail} id="email" placeholder="Email" />
        <textarea
          rows={5}
          ref={inputFeedback}
          id="feedback"
          placeholder="Your FeedBack"
        />
      </form>
      <button onClick={submitFormHandler}>Send FeedBack</button>
      <hr />
      <button onClick={loadFeedBack}>Load Feedbak</button>
      <ul>
        {feedbacks.map((item) => {
          return <li>{item.feedback}</li>;
        })}
      </ul>
    </div>
  );
}
