const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 3000;
const fs = require('fs');

app.use(bodyParser.json());

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


//Function to get todays date=====================================================

const getTodaysDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '-' + dd + '-' + yyyy;

    return today;
}

//================================================================================

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


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
    fs.readFile('./storage/posts.json', 'utf-8', function callback(err, data) {

        const posts = require("./storage/posts.json");
        const newId = posts[posts.length - 1].id + 1;
        const newPost = req.body;
        newPost["id"] = newId;
        newPost["createdAt"] = getTodaysDate();
        newPost["comments"] = [];
        
        if (err) {
            res.send(error.message);
        } else {
            obj = JSON.parse(data);
            obj.push(newPost);
            json = JSON.stringify(obj);
            fs.writeFile('./storage/posts.json', json, 'utf8', callback);

            res.send(`Successfully completed a post.`);
    }});
    });
});

// PUT update the entity of post route

// Put request to entity end point 
app.put('/posts/:id', (req, res) => {

    if(!req.body.id){
        return res.send(`Uh no, missing id`)
    }
    // store request id from the url params
    const id = req.params.id;
    // import json file
    const posts = require('./storage/posts.json');

    // loop through the posts of the json file
    for (let i = 0; i < posts.length; i++) {
        // if there's a matching id
        if (posts[i].id === id) {
            // replace that post from what's passed in from the put request
            posts[i] = req.body;
        }
    }

    // overwrite the file with the new content
    fs.writeFile('./storage/posts.json', JSON.stringify(posts), 'utf-8', function (err) {
        // if there's an error return error message
        if (err) {
            return res.send(`Uh oh, failed to update blog post ${id}`)
        }
        return res.send(`Successfully updated blog post ${id}`)
    });
});

// DELETE delete the entity of post route
app.delete('/posts/:id', (req, res) => {
    const posts = require("./storage/posts.json");
    const id = req.params.id;
    let remainingPosts =[];
     for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
         if (post.id !== id) {
            remainingPosts.push(post) 
        }
    }
res.send(remainingPosts)
})
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






// port listener
const currentPort = () => {
    console.log(`We are live on ${port}`);
};
app.listen(port, currentPort);


