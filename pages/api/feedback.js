import fs from "fs";
import path from "path";


export function buildFeedBack() {
    return  path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedBack(pathFile) {
    const fileData = fs.readFileSync(pathFile);
    const data = JSON.parse(fileData);
    return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedBack = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    //store that in databse or in a file
    const pathFile = buildFeedBack();
    const data = extractFeedBack(pathFile);
  
    data.push(newFeedBack);
    fs.writeFileSync(pathFile, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedBack });
  } else {
    const pathFile = buildFeedBack();
    const data = extractFeedBack(pathFile);
    res.status(200).json({
      feedback: data,
    });
  }
}

export default handler;
