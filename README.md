# AI Grammar Corrector

An Express and EJS web app that uses Google Gemini to correct grammar, spelling, punctuation, and sentence structure while preserving the original meaning.

## Requirements

- Node.js 18 or later
- A Google Gemini API key

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create a `.env` file in the project root:

	```env
	GEMINI_API_KEY=your_gemini_api_key
	PORT=5000
	```

	Keep `.env` private. It is excluded from Git by `.gitignore`.

3. Start the server:

	```bash
	node app.js
	```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

Set `PORT` to a different value in `.env` if port 5000 is already in use.

## How It Works

Enter text on the home page and submit it for correction. The server sends the text to Gemini and displays the corrected result without adding new information or explaining the changes.

## Project Structure

```text
.
|-- app.js           # Express server and Gemini integration
|-- package.json     # Project metadata and dependencies
`-- views/
	`-- index.ejs    # Web interface
```

## License

This project is licensed under the ISC License.