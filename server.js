const express = require('express');
const app = express();
const port = 3000;


// GET collection of notes route
app.get('/notes', (req, res) => {
    res.send(`A list of notes has been retrieved!`);
});

// GET entity of note route
app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Note ${id} has been retrieved!`);
});

// POST create new entity of post route
app.post('/notes', (req, res) => {
    const id = req.params.id;
    res.send(`Note ${id} has been created!`);
});

// PUT update the entity of post route
app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Note ${id} has been updated`);
});

// DELETE delete the entity of post route
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Note ${id} has been deleted!`);
});

// port listener
const currentPort = () => {
    console.log(`We are live on ${port}`);
  };
app.listen(port, currentPort);
