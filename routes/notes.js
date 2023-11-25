const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult, ExpressValidator } = require('express-validator');


// Route - 1 : get all notes using get "/api/auth/getUser" login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error occured')
    }
})

// Route - 2 : add a note using post "/api/auth/addNote" login required
router.post('/addNote', fetchuser,
    [
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Enter a valid description").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        //   this will send error message if there is any error occurs

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag, date } = req.body;
            const notes = new Notes(
                {
                    title, description, tag, user: req.user.id, date
                }
            );
            const saveNote = await notes.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal server error occured')
        }

    })

// Route - 2 : Update an existing note "/api/auth/updateNote" login required

router.put("/updateNote/:id", fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('not allowed');
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note })
        // res.json(req.params.id)
    }
)


module.exports = router