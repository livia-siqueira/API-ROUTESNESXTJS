import { buildFeedBack, extractFeedBack } from "./feedback";

function handler(req, res) {
  const id = req.query.id;
  const pathFile = buildFeedBack();
  const data = extractFeedBack(pathFile);
  const feedBack = data.find((feed) => {
    return feed.id === id;
  });

  res.status(200).json({
    feedBack: feedBack,
  });
}

export default handler;

//...id, funciona tanto para um valor, quanto para mais de um.
