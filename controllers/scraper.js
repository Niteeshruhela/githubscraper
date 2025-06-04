import puppeteer from 'puppeteer';
import { User } from '../models/userschema.js';

export async function scrapeGitHubUsers(keyword, pages = 2) {
  const users = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let p = 1; p <= pages; p++) {
    const url = `https://github.com/search?q=${encodeURIComponent(keyword)}&type=users&p=${p}`;
    console.log(`🔍 Scrape: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    try {
      await page.waitForSelector('[data-testid="results-list"]', { timeout: 15000 });

      const pageUsers = await page.evaluate(() => {
        const result = [];
        const container = document.querySelector('[data-testid="results-list"]');
        const cards = container?.children || [];

        for (let el of cards) {
          const anchor = el.querySelector('a[href^="/"]');
          const Githubname = anchor?.textContent.trim();
          const profileUrl = anchor ? `https://github.com${anchor.getAttribute('href')}` : '';
          const bio = el.querySelector('p')?.innerText.trim() || '';
          const location = el.querySelector('li')?.innerText.trim() || '';
          const avatar = el.querySelector('img')?.src || '';

          if (Githubname && profileUrl) {
            result.push({ Githubname, displayName: Githubname, profileUrl, bio, location, avatar });
          }
        }
        return result;
      });

      for (const user of pageUsers) {
        const exists = await User.findOne({ Githubname: user.Githubname });
        if (!exists) {
          const userDoc = new User(user);
          await userDoc.save();
          users.push(userDoc);
        }
      }

    } catch (err) {
      console.warn(`Error on page ${p}:`, err.message);
    }
  }

  await browser.close();
  return users;
}
