import express from 'express';
import { scrapeGitHubUsers } from '../controllers/scraper.js';
import { summarizeUser } from '../controllers/summarize.js';
import {User} from '../models/userschema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const keyword = req.query.q || 'javascript developer';
    const users = await scrapeGitHubUsers(keyword, 2);
    res.status(200).json({
        message: "Data scrapped successfully",
        users
    });
  } catch (err) {
    res.status(500).json({message: "Not able to scrape data"});
  }
});

router.get('/summarize', async (req, res) => {
  try {
    const unsummarizedUsers = await User.find({ summary: { $exists: false } });

    for (const user of unsummarizedUsers) {
      try {
        const summary = await summarizeUser(user);
        user.summary = summary.summary;
        user.skills = summary.skills;
        user.techStack = summary.techStack;
        user.notableContributions = summary.notableContributions;
        await user.save();
      } catch (err) {
        console.error('⚠️ Failed to summarize:', user.Githubname, err.message);
      }
    }

    res.status(200).json({ message: 'Summarization complete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
