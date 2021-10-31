# Sudoku generator API
REST API to help making Sudoku puzzles
    
## Usage
### How to get a puzzle?
By a `GET` request call to `/api`

Returns a multidimensional array, where in `grid[a][b]` `a` indicates index of row, `b` indicates the index of column

```
const response = await fetch('/api').then( res => res.json() );
console.log(response);

// {"puzzle":[
//    [0,0,0,2,0,0,0,1,0],
//    [0,0,0,5,0,0,0,0,0],
//    [0,0,0,0,8,0,0,0,3],
//    [0,0,0,0,0,0,1,0,5],
//    [0,0,9,0,0,0,8,0,2],
//    [0,0,0,8,0,0,0,0,0],
//    [9,0,0,0,2,0,6,5,0],
//    [0,0,0,0,5,0,0,0,0],
//    [6,0,1,9,0,4,0,0,8]
// ]}
```

### How to get puzzle by difficulty?
By a `GET` request call to `/api?difficulty={type}`

Available types (in lowercase):
* `easy` - (36+ clues)
* `medium` - (27-36 clues)
* `hard` - (19-26 clues)
* `evil` - (16-18 clues)

```
const response = await fetch('/api?difficulty=easy').then(res => res.json());
console.log(response);
    
// {"puzzle":[
//    [0,0,0,0,0,7,1,4,0],
//    [6,3,7,0,0,2,0,0,8],
//    [1,0,0,0,0,8,0,0,0],
//    [5,0,0,8,7,3,0,0,0],
//    [8,0,0,4,0,1,0,9,6],
//    [4,0,0,0,0,0,8,0,3],
//    [3,8,9,0,6,0,2,1,0],
//    [7,6,5,2,1,0,0,0,0],
//    [2,1,4,0,8,0,0,0,0]
// ]}
```

### How to get puzzle with exact number of clues?
By a `GET` request call to `/api?clues={numberOfClues}`.
Replace `{numberOfClues}` with a number between 1 and 80 (inclusive).

```
const response = await fetch('/api?clues=36').then(res => res.json());
console.log(response);

// {"puzzle":[
//    [6,5,7,1,0,2,0,9,3],
//    [0,0,2,0,0,0,6,5,7],
//    [4,0,0,0,0,0,0,0,2],
//    [5,6,0,7,2,0,9,3,0],
//    [0,2,0,9,3,4,5,0,0],
//    [9,0,4,0,6,0,0,0,8],
//    [8,7,0,2,0,0,3,0,0],
//    [0,0,0,3,4,0,0,0,0],
//    [0,0,0,8,0,0,2,0,0]
// ]}
```

## Starting a project
After pulling the repository, run `npm install` to install the dependencies.

Create `.env` file in root directory from `.env.sample` file and fill variables.
* `PORT` variable defines the server port. If not specified, server will run on port 3000.

Start the server
* Start the node server with `npm run start`
* Start the dev server with `npm run dev`

Server will be running on `http://localhost:{PORT}`