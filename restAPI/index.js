const express = require("express");
const fs = require('fs')
const users = require("./MOCK_DATA.json");
const app = express();
PORT = 8000;
// here we will define our routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/users", (req, res) => {
  const html = `<ul> ${users
    .map((user) => `<li>${user.first_name}</li>`)
    .join("")}
  </ul>`;
  res.send(html);
});

//setting the dynamic routes
app.get("/api/users/:id", (req, res) => {
  //id is a variable
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
//since express does not know the type of data it is recieving, so if we dont use the middleware, the body in the post request will return undefined, so it is necessary to use a middleware
app.use(express.urlencoded({ extended: false }));
//when any form data will come the urlencoded will put that form data in the body
app.post("/api/users", (req, res) => {
  //creating a new user
  const body = req.body;
  users.push({...body,id:users.length})
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
    return res.json({ status: "Successfully added the user", id:users.length }); 
  })
//   console.log(body);
//   return res.json({ status: "Pending" });
});
app.patch("/api/users:id", (req, res) => {
  //updating  user with the given id
  return res.json({ status: "Pending" });
});
app.delete("/api/users:id", (req, res) => {
  //deleting  user with the provided id
  return res.json({ status: "Pending" });
});

//as we are seeing that we are repeating the same route , so we can  group these routes

// app
//   .route("/api/users/:id")
//   .get((res, req) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   .post((res, req) => {
//     //creating a new user
//     return res.json({ status: "Pending" });
//   })
//   .patch((res, req) => {
//     //updating  user with the given id
//     return res.json({ status: "Pending" });
//   })
//   .delete((res, req) => {
//     //deleting  user with the provided id
//     return res.json({ status: "Pending" });
//   });

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
