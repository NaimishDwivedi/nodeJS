const http = require("http");
//after installing the express js framework we dont need fs and url, they are internally managed by the express
// const fs = require("fs");
// const url = require("url");
const express = require('express');


const app = express();

// console.log(app);

app.get('/',(req,res)=>{
    return res.send("Hello from the home page");
})
app.get('/about',(req,res)=>{
    return res.send("Hello from the about page. The user is " + req.query.name + "and age is "+ req.query.age);
})

app.listen(5000, ()=> console.log("Server started")
)


// const myServer = http.createServer(app);


// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.url} New Request Recieved \n`;
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);

//   fs.appendFile("log.txt", log, (err, data) => {
//     // switch(req.url){
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("Home Page");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end("This is about page "+ username);
//         break;
//       case "/search":
//         const search = myServer.query.search_query;
//         res.end(`Here your results for, ${search}`);
//         break;
//       default:
//         res.end("404 error not found");
//     }
//   });
// });

// myServer.listen(8000, () => console.log("Server Started"));
