const express = require('express');
let users = [ 
    {
        id: "0", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
    {
        id: "1", // hint: use the shortid npm package to generate it
        name: "Pete James", // String, required
        bio: "PT11",  // String, required
    }
    ]

const server = express();

server.listen(4000, () => {
    console.log('listening on port 4000....')
});

//if don't add path, applies to all paths
server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world!');
});

//R
//errorMessage: "The users information could not be retrieved."
server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json( { users } );
    } else {
        res
        .status(500)
        .json({success:false, message: 'The users information could not be retrieved.'})
    }

});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const item = users.find(user => user.id == id);

    if (item) {
        res.status(200).json(item);
    } else {
        res
        .status(404)
        .json({success:false, message: 'The user with the specified ID does not exist.'})
    }
    
})

// C
//if missing name or bio, 400 { errorMessage: "Please provide name and bio for the user." }.
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('userInfo', userInfo);

    if (userInfo.name && userInfo.bio) {
        users.push(userInfo);
        res.status(201).json({ success:true, users })

    } else {
        res
        .status(404)
        .json({success:false, message: 'Please provide name and bio for the user.'})
    }

});


// D
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = users.find(user => user.id === id);
    if (deleted) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(deleted);
    } else {
        res
            .status(404)
            .json({success:false, message: 'user id not found'})
    }
});

//U

server.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    const found = users.find(user => user.id === id);
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res
            .status(404)
            .json({success:false, message: 'user id not found'})
    }
});





