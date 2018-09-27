const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //the * allows anyone to connect to this API
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Pass to next layer of middleware
    next();
});

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

const newData = {
        "title":"Slack Comes To Galvanize",
        "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis, ante vel consectetur maximus, mi erat efficitur augue, id aliquet ipsum magna sed orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sollicitudin dapibus nibh, in blandit risus luctus ac. Integer sollicitudin, est vitae imperdiet dignissim, libero neque porta diam, quis hendrerit augue metus in purus. Donec euismod felis ac efficitur finibus. Proin gravida elementum nisl sit amet sollicitudin. Proin ac quam imperdiet, egestas dolor in, faucibus justo. Curabitur pellentesque enim nisl, id ultrices est sagittis eget. Sed tempus blandit maximus. Maecenas eu tincidunt nunc. Nulla et congue erat, ut tincidunt lectus. Maecenas placerat placerat eros at dignissim.",
        "createdAt":"09-26-2018",
        "user":"AJ",
        "tag":"speaker",
        "comments": [
            {
                "id":"0",
                "comment":"This is cool",
                "user":"Sein"
            },
            {
                "id":"1",
                "comment":"OMG Slack is coming",
                "user":"Mansoor"
            },
            {
                "id":"2",
                "comment":"You're cool",
                "user":"Masha"
            }
        ]
    }

// POST create new entity of post route
app.post('/posts', (req, res) => {
    // const posts = require("./storage/posts.json");
    // const newId = posts[posts.length - 1].id + 1;
    // const newPost = req.body;

    fs.readFile('./storage/posts.json', 'utf-8', function callback(err, data) {
        const posts = require("./storage/posts.json");
        const newId = posts[posts.length - 1].id + 1;
        const newPost = req.body;
        
        if (err){
            res.send(error.message);
        } else {
            obj = JSON.parse(data);
            obj['id'] = newId;
            obj.push(newPost);
            json = JSON.stringify(obj);
            fs.writeFile('./storage/posts.json', json, 'utf8', callback);
            res.send(`Successfully completed a post.`);
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

// port listener
const currentPort = () => {
    console.log(`We are live on ${port}`);
  };
app.listen(port, currentPort);
