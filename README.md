# figlefy

API for getting ascii art strings

## Running the project

To run the project install all dependencies using npm:
```bash
npm i
```
Then you can run the project via node:
```bash
node app.js
```
Thats it. For development I use [Nodemon](https://github.com/remy/nodemon) which I can recommend for projects like this.

### API Overview

The API works very simple. The request url should be build of like this: `http://figlefy.com/figlefy/{URI encoded string}/{font}`

The `{font}` is optional. If you de not specify any font you will get the default font. A small example using `fetch`:

```javascript
const figlefyAPI = 'http://figlefy.com/figlefy/';
let myString = 'Hello figlefy';

fetch(figlefyAPI + encodeURIComponent(myString))
    .then( res => res.text())
    .then(figlefied => {
        console.log(figlefied);
    });
```

This will return a `String` which looks like this when presented in a monospace font:

```
 _   _      _ _          __ _       _       __
| | | | ___| | | ___    / _(_) __ _| | ___ / _|_   _
| |_| |/ _ \ | |/ _ \  | |_| |/ _` | |/ _ \ |_| | | |
|  _  |  __/ | | (_) | |  _| | (_| | |  __/  _| |_| |
|_| |_|\___|_|_|\___/  |_| |_|\__, |_|\___|_|  \__, |
                               |___/            |___/
```
### Fonts

If you want to get an overview of all the posible fonts make a request to `/fonts`:

```javascript
const fontListURL = 'http://figlefy.com/fonts/';

fetch(fontListURL)
    .then( res => res.json())
    .then(fonts => {
        console.log(fonts);
    });
```

Which would present you with a list like this:

```javascript
[
    "3-d",
    "3x5",
    "5lineoblique",
    "acrobatic",
    // ....
]
```
