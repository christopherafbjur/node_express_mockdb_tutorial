const express = require("express");
const MESSAGES = require("./messagesTable");
const app = express();
const port = 3000;

app.use(express.json());

//CREATE
app.post("/", function (req, res) {
  const message = { id: MESSAGES.length + 1, text: req.body.text };
  MESSAGES.push(message);
  res.status(200).send(message);
});

//READ
app.get("/", function (req, res) {
  res.status(200).send(MESSAGES);
});

app.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const found = MESSAGES.filter((message) => message.id === id);

  if (found.length > 0) {
    res.status(200).send(found);
  } else {
    res.status(404).send({ msg: `No message with id ${id} found!` });
  }
});

//UPDATE
app.put("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const found = MESSAGES.find((message) => message.id === id);
  const updated = [];

  if (found) {
    MESSAGES.forEach((message) => {
      if (message.id === found.id) {
        message.text = req.body.text || message.text;
        updated.push(message);
      }
    });
    res.status(200).send(updated);
  } else {
    res.status(404).send({ msg: `No message with id ${id} found!` });
  }
});

//DELETE
app.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const found = MESSAGES.find((message) => message.id === id);
  const deleted = [];
  let removeIndex = null;

  if (found) {
    removeIndex = MESSAGES.indexOf(found);
    MESSAGES.splice(removeIndex, 1);
    deleted.push({ id: found.id });
    res.status(200).send(deleted);
  } else {
    res.status(404).send({ msg: `No message with id ${id} found!` });
  }
});

app.listen(port, () => console.log(`Running server on port ${port}`));
