const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let amigos = [
  {
    id: 1,
    name: "Monica",
    age: 30,
    email: "monica@gmail.com"
  },
  {
    id: 2,
    name: "Phoebe",
    age: 32,
    email: "phoebe@yahoo.com"
  },
  {
    id: 3,
    name: "Joey",
    age: 35,
    email: "joey@live.com"
  },
  {
    id: 4,
    name: "Jimmy",
    age: 35,
    email: "jimmy@hotmail.com"
  },
  {
    id: 5,
    name: "Chandler",
    age: 31,
    email: "chandler@gmail.com"
  },
  {
    id: 6,
    name: "Ross",
    age: 34,
    email: "manu@gmail.com"
  },
  {
    id: 7,
    name: "Rachel",
    age: 33,
    email: "rachel@gmail.com"
  }
];

app.use(cors());
app.use(bodyParser.json());

app.get("/amigos", (req, res) => {
  res.status(200).json(amigos);
});

app.get("/amigos/:id", function(req, res)  {
  const {id} = req.params;
  let friendIndex = amigos.findIndex(friend => friend.id == id);
  var friend = amigos[friendIndex]
  console.log(res.status)
  res.status(200).json(friend);
});

app.post("/amigos", (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  amigos = [...amigos, friend];
  res.status(201).json(amigos);
});

app.put("/amigos/:id", (req, res) => {
  const { id } = req.params;
  let friendIndex = amigos.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    amigos[friendIndex] = { ...amigos[friendIndex], ...req.body };
    res.status(200).json(amigos);
  } else {
    res
      .status(404)
      .json({ message: `Este ${id} no existe.` });
  }
});

app.delete("/amigos/:id", (req, res) => {
  amigos = amigos.filter(friend => friend.id != req.params.id);
  res.status(200).json(amigos);
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
