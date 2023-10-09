
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


```http
 /generate-poster
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `scale` | `string` | The scale of the image |

#### Example

`http://localhost:3000/generate-poster?scale=2x`




