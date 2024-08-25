const express = require("express");
const fs = require("fs");
const users = require("../restAPI/MOCK_DATA.json");
const app = express();
PORT = 8000;

//since express does not know the type of data it is recieving, so if we dont use the middleware, the body in the post request will return undefined, so it is necessary to use a middleware
//when any form data will come the urlencoded will put that form data in the body






app.use(express.urlencoded({ extended: false }));

//creating my own middleware

app.use((req, res, next) => {
  fs.appendFile(
    "data.txt",
    `${Date.now()}: ${req.method} : ${req.path}`,
    (error, data) => {
      next();
    }
  );
  //   console.log("Hello from the middleware 1");
  //   req.myName = "Naimish Dwivedi";
  // return res.json({msg:"Hellow from the middleware1"})
  //   next();
});
app.use((req, res, next) => {
  //   console.log("Hello from the middleware 2", req.myName);
  next();
  return res.json({ msg: "Hellow from the middleware2" });

  // next();
});

// here we will define our routes
app.get("/api/users", (req, res) => {
  console.log(req.headers);

  // res.setHeader("myname", "naimish");
  // console.log(req.headers);

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
//when any form data will come the urlencoded will put that form data in the body
app.post("/api/users", (req, res) => {
  //creating a new user
  const body = req.body;
  // if(!body || !body.full_name || !body.email ){
  if (body.email === "") {
    return res.status(400).json({ msg: "All fields are required" });
  }
  users.push({ ...body, id: users.length });
  fs.writeFile(
    "../restAPI/MOCK_DATA.json",
    JSON.stringify(users),
    (error, data) => {
      return res.json({
        status: "Successfully added the user",
        id: users.length,
      });
    }
  );
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

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
