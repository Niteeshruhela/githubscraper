# 🧠 GitHub Developer Scraper with AI Insights

This backend service scrapes GitHub user profiles from GitHub Search based on a keyword and stores raw profile information in MongoDB. It includes optional integration with OpenAI GPT-3.5 to summarize user data, including skills, tech stack, and contributions.

> ⚠️ **Note**: OpenAI summarization requires a **paid API key**. Scraping works independently, and summarization can be enabled once a valid key is provided.

---

## 🚀 Tech Stack

- **Node.js** + **Express** – RESTful API
- **MongoDB** + **Mongoose** – NoSQL data storage
- **Puppeteer** – GitHub profile scraping
- **OpenAI GPT-3.5 Turbo** – Profile summarization (optional)
- **dotenv** – Environment configuration

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Niteeshruhela/githubscraper.git
cd github-ai-scraper

```
## 2. Install dependencies
```
npm install

```
## 3. Configure environment variable

PORT=3000
MONGO_URI=mongodb://localhost:27017/github_scraper
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## 4. Start the application

npm run dev

## 5. Assumption made 

GitHub user search results contain enough public data for scraping (username, bio, location).
Summarization is an optional, background process.
MongoDB is available locally (localhost:27017) unless reconfigured.
Only users without summaries will be processed during summarization.

## 6. API endpoints
**1. Scrape github users**

GET /api/v1/scrape?q=javascript+developer
Example:
POSTMAN GET REQUEST
http://localhost:3000/api/v1/scrape?q=javascript+developer

**2. Summarize Users via OpenAI**

GET /api/v1/scrape/summarize
Example:
POSTMAN GET REQUEST
http://localhost:3000/api/v1/scrape/summarize

**3. Get All Users**
Fetch all user records (raw + summarized) from MongoDB
GET /api/v1/scrape/all
Example:
POSTMAN GET REQUEST
http://localhost:3000/api/v1/scrape/all

## 7. Project structure
<pre><code>
├── app.js
├── server.js
├── package.json
├── config/
│   └── config.env
├── database/
│   └── dbconnection.js
├── models/
│   └── userschema.js
├── routes/
│   └── scraperroute.js
├── controllers/
│   ├── scraper.js
│   └── summarize.js
</code>
</pre>

## 8. Example workflow
Run MongoDB locally.

Start the Node.js server:
npm run dev

Scrape users:
http://localhost:3000/api/v1/scrape?q=nodejs+developer


Summarize users (optional):
http://localhost:3000/api/v1/scrape/summarize


View all data:
http://localhost:3000/api/v1/scrape/all


{
  "username": "JavascriptMick",
  "location": "Sydney, Australia",
  "profileUrl": "https://github.com/JavascriptMick",
  "skills": ["JavaScript", "React", "Node.js", "Express"],
  "techStack": ["JavaScript", "HTML", "CSS", "React", "Node.js"],
  "notableContributions": [
    {
      "react-portfolio",
      "https://github.com/JavascriptMick/react-portfolio",
      "A personal portfolio website built using React and Tailwind CSS"
    },
    {
      "node-api-starter",
      "https://github.com/JavascriptMick/node-api-starter",
      "Starter boilerplate for building RESTful APIs with Node.js and Express"
    }
  ]
}

{
  "username": "Developer",
  "location": "Now in GitHub!",
  "profileUrl": "https://github.com/jcarlosj",
  "skills": ["JavaScript", "Vue.js", "Firebase"],
  "techStack": ["JavaScript", "Vue.js", "HTML", "CSS", "Firebase"],
  "notableContributions": [
    {
      "vue-firebase-auth",
      "https://github.com/jcarlosj/vue-firebase-auth",
      "Authentication with Vue and Firebase"
    }
  ]
}

{
  "username": "Javascript Developer",
  "location": "LA",
  "profileUrl": "https://github.com/kofiohemeng",
  "skills": ["JavaScript", "MongoDB", "Node.js", "React"],
  "techStack": ["JavaScript", "Node.js", "MongoDB", "React", "Express"],
  "notableContributions": [
    {
      "mern-ecommerce",
      "https://github.com/kofiohemeng/mern-ecommerce",
      "Full-stack eCommerce app using MERN stack"
    }
  ]
}







