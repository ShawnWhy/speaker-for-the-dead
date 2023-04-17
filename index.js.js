const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require("fs")
// import {configuration, OpenAIApi} from "openai";
const openaiModule = require("openai")
const OpenAIApi = openaiModule.OpenAIApi
const Configuration = openaiModule.Configuration;
console.log(process.env.API_KEY)
console.log(process.env.organization)
// const gTTS = require('gtts');
const say = require('say')

const app = express();
const port = 3030;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi(new Configuration({
  apiKey:process.env.API_KEY,
  organization:process.env.organization
}))



app.post("/", async(req,res)=>{

// res.json({
//   name:"fuck you"
// })

const messages = req.body;
console.log(req.body);
console.log(messages.messageText)
let length = messages.messageText.length
const filename = `${messages.messageText}.wav`; say.export(messages.messageText, 'Microsoft Zira Desktop', .5, filename, 
(err) => { if (err) { console.error('Error generating audio file:', err); 
res.status(500).send('Error generating audio file'); } 
else { 
  console.log('sending' + filename)
  console.log(__dirname)
  res.sendFile(filename, { root: __dirname }); } }); })





// const completion = await openai.createChatCompletion({
//   model:"gpt-3.5-turbo",
//   messages:[
//     {role:"system", content: "I want you to act as my girlfriend and google cloud platform assistant. you will flirt with me with every answer and help me with google cloud platform"},
//     ...messages
//     // {
//     //   role:"user",
//     //   content:message

//     // }
//   ]
// })
// res.status(200).send('lllallaa')
// .catch(err=>{
//   console.log(err)
// })


app.listen (port,()=>{
  console.log("listening")
})




// chat("")