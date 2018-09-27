const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// GET collection of posts route
app.get('/posts', (req, res) => {
    const posts = require("./storage/posts.json");
    res.json(posts);
});

// GET entity of post route
app.get('/posts/:id', (req, res) => {
    const posts = require("./storage/posts.json");
    const id = req.params.id;

    const post = posts.filter((post) => post.id == id)[0];
    if (post) {
        res.json(post)
    } else {
        res.send(`No post found.`)
    }

});

// POST create new entity of post route
app.post('/posts', (req, res) => {
    const id = req.params.id;
    const posts = require("./storage/posts.json");

    fs.readFile('./storage/posts.json', 'utf-8', function callback(err, data) {
        if (err){
            res.send(error.message);
        } else {
        obj = JSON.parse(data);
        obj.push(newPost);
        json = JSON.stringify(obj);
        fs.writeFile('./storage/posts.json', json, 'utf8', callback);
        res.send(`SUCCESS`);
    }});
    
});

// PUT update the entity of post route
app.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Post ${id} has been updated`);
});

// DELETE delete the entity of post route
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Post ${id} has been deleted!`);
});

app.delete('/posts/:id/comments/:commentId', (req, res) => {
    const posts = require("./storage/posts.json");
    const deletionId = req.params.commentId;
    let postdeletionId = req.params.id;
    let commentIdToDelete = posts[postdeletionId].comments[deletionId].id;
    //select the object's id that matches the deletion id
    let postUpdate = posts.find(post => postdeletionId === post.id);
    //loop through the selected object's comments
    for (var i = 0; i < postUpdate.comments.length; i++) {
        if (postUpdate.comments[i].id === commentIdToDelete) {
            postUpdate.comments.splice(postUpdate.comments[i], 1);
        }
    }
    res.send(posts);
})


// port listener
const currentPort = () => {
    console.log(`We are live on ${port}`);
  };
app.listen(port, currentPort);
