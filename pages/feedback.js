import { useState } from "react";
import { extractFeedBack, buildFeedBack } from "./api/feedback";

const ListFeedBack = ({ feedbacks }) => {
  const [feedBack, setFeedBack] = useState();

  const handlerShowDetails = (id) => {
    fetch(`/api/${id}`)
      .then((resp) => resp.json())
      .then((data) => setFeedBack(data.feedBack));
  };
  return (
    <>
    {feedBack && <p>{feedBack.email}</p>}
      <ul>
        {feedbacks.map((item) => {
          return (
            <li key={item.id}>
              {item.feedback}
              <button onClick={handlerShowDetails.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const pathFile = buildFeedBack();
  const data = extractFeedBack(pathFile);

  return {
    props: {
      feedbacks: data,
    },
  };
}

export default ListFeedBack;
