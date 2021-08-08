const util = require("util");

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Phone = require("./models/phone");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("body", (req, res) => util.inspect(req.body.person));
app.use(morgan(":body"));

app.get("/api/persons", (req, res) => {
  Phone.find({}).then((phones) => {
    res.json(phones);
  });
});

app.get("/api/info", (req, res) => {
  const date = Date();
  let info = `Phonebook has info  for ${persons.length} people`;
  info += `\n\n${date.toString()}`;
  return res.end(info);
});

app.get("/api/persons/:id", (req, res, next) => {
  return Phone.findById(req.params.id)
    .then((phone) => {
      res.json(phone);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phone.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPhone) => res.json(updatedPhone))
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const newPerson = req.body;

  const newPhone = new Phone({
    name: newPerson.name,
    number: newPerson.number,
  });

  newPhone
    .save()
    .then((savedPhone) => {
      res.status(201).json(savedPhone);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
