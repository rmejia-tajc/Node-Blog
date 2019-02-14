// import the express package
const express = require('express');

const Users = require('./userDb.js');

const router = express.Router(); // notice the Uppercase "R" in Router


// custom middleware
const nameCheckAndToUpper = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Please provide a name for the user." });
      } else {
        req.body.name = req.body.name.toUpperCase();
        next();
      }
};


// GET
router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The users information could not be retrieved." });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    try {

        const user = await Users.getById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The user information could not be retrieved." });
    } 
});

// GET user posts by id
router.get('/:id/posts', async (req, res) => {
    try {

        const user = await Users.getUserPosts(req.params.id);

        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The user information could not be retrieved." });
    } 
});

// POST
router.post('/', nameCheckAndToUpper, async (req, res) => {
    
    try {
        const user = await Users.insert(req.body);
        res.status(201).json(user);
    } catch (error) {
        //log error to database
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    }    

});

// PUT
router.put('/:id', nameCheckAndToUpper, async (req, res) => {
     
    try {
        const user = await Users.update(req.params.id, req.body);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The user information could not be modified." });
    }
    
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);

        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The user could not be removed. Please check that the user's post(s) have been removed first." });
    }
});




module.exports = router; //notice the "s" in exports