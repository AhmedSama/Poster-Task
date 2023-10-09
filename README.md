
# Poster generator




## Installation

Clone the project using git

```bash
  git clone https://github.com/AhmedSama/Poster-Task.git
```
cd to Poster-Task and run npm install to install all the dependencies
```bash
  cd Poster-Task
  npm install
```

to run the first server 
```bash
  npm run start
```

to run the second server 
```bash
  npm run start2
```
## API Reference


```bash
 /generate-poster
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `scale` | `string` | The scale of the image |

#### Example


```bash
http://localhost:3000/generate-poster?scale=2x
```


### to use it in frontend you can add the img tag with the source
```html
<img src="http://localhost:3000/generate-poster?scale=1"
 alt="Your image description"/>
```


