import { Router } from 'express';
const router = Router()
// import * as  musicStatusModel from "../models/featured.music.Modal.js";
import Music from "../models/Music.js"


// Update music release
router.put('/:id', async (req, res) => {
    try {
        const updatedMusic = await Music.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedMusic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Route to mark a song as featured
router.put('/:id/featured', async (req, res) => {
    try {
        const music = await Music.findByIdAndUpdate(
            req.params.id,
            { featured: req.body.featured },
            { new: true }
        );
        res.json(music);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update music' });
    }
});



// Route to mark a song as latest
router.put('/:id/latest', async (req, res) => {
    try {
        const music = await Music.findByIdAndUpdate(req.params.id, { latest: true });
        res.json(music);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Failed to update music' });
    }
});
// Route to mark a song as latest-false
router.put('/:id/latestf', async (req, res) => {
    try {
        const music = await Music.findByIdAndUpdate(req.params.id, { latest: false });
        res.json(music);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Failed to update music' });
    }
});






// Route to get latest music
router.get('/latest', async (req, res) => {
    try {
        const latestMusic = await Music.find({ latest: true });
        res.json(latestMusic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest music' });
    }
});

// Route to get latest music
router.get('/featured', async (req, res) => {
    try {
        const featuredMusic = await Music.find({ featured: true });
        res.json(featuredMusic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest music' });
    }
});

export default router;