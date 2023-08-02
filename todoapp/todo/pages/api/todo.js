import fs from 'fs';
import path from "path";

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'Todo.json');
  }

  export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
  }


export function handler(req,res){
    if(req.method==="POST"){
        let reqdata=JSON.parse(req.body)
        const Tododata={
            id:new Date().toISOString(),
            todo:reqdata.todo,
            
        };
        //store that in a database or in a file............
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(Tododata);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Success!', todo: Tododata });
    }else{
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({ feedback: data });
    }
}

