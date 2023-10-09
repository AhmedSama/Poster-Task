const express = require('express');
const app = express();
const path = require('path')
const { chromium } = require('playwright');
const sharp = require('sharp');

const cors = require('cors')
const fs = require('fs')

const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.static('public'));

// create 'poster' folder if not exist
const postersDirName = "posters"
const postersDir = path.join(__dirname,"public",postersDirName)
if(!fs.existsSync(postersDir)){
    fs.mkdirSync(postersDir)
}

app.get('/generate-poster', async (req, res) => {
  try {
    const scale = parseFloat(req.query.scale) || 1;
    const filePath =path.join(__dirname,'public',postersDirName,scale+"x.png")
    // return the image if it is already saved
    if(fs.existsSync(filePath)){
      const f = fs.readFileSync(filePath)
      res.setHeader('Content-Type', 'image/png')
      return res.send(f)
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 650 ,
        height: 510 ,
    });

    const html = fs.readFileSync('./poster/poster.html', 'utf8');
    const css = fs.readFileSync('./poster/poster.css', 'utf8');

    await page.setContent(html);
    await page.addStyleTag({ content: css });

    const screenshot = await page.screenshot();
    await browser.close();
    const newWidth = Math.round(650 * scale);
    const newHeight = Math.round(510 * scale);
    // using sharp to resize the image
    sharp(screenshot)
    .resize(newWidth, newHeight)
    .toBuffer()
    .then((outputBuffer) => {
      fs.writeFileSync( filePath, outputBuffer);
      res.setHeader('Content-Type', 'image/png');
      res.send(outputBuffer);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Image resizing failed' });
    });
  } catch (error) {
    console.error('Error generating poster:', error);
    res.status(500).send('Error generating poster');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

