const express = require('express');
const app = express();
const path = require('path')
const { chromium } = require('playwright');

const cors = require('cors')
const fs = require('fs')
app.use(cors())
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

// create 'poster' folder if not exist
const postersDirName = "posters2"
const postersDir = path.join(__dirname,"public",postersDirName)
if(!fs.existsSync(postersDir)){
    fs.mkdirSync(postersDir)
}

app.get('/generate-poster', async (req, res) => {
  try {
    // return the image if it is already saved
    const scale = parseFloat(req.query.scale) || 1;
    const filePath =path.join(__dirname,'public',postersDirName,scale+"x.png")
    if(fs.existsSync(filePath)){
      const f = fs.readFileSync(filePath)
      res.setHeader('Content-Type', 'image/png')
      return res.send(f)
    }
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 650 *scale,
        height: 510 *scale,
    });

    const html = fs.readFileSync('./poster/poster.html', 'utf8');
    const css = fs.readFileSync('./poster/poster.css', 'utf8');


    await page.setContent(html);
    await page.addStyleTag({ content: css });

    // save the screenshot
    const screenshot = await page.screenshot();
    fs.writeFileSync(filePath,screenshot)
    await browser.close();

    res.setHeader('Content-Type', 'image/png')
    return res.send(screenshot)
  } catch (error) {
    console.error('Error generating poster:', error);
    res.status(500).send('Error generating poster');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
