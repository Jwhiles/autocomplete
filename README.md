# backend-badgers-autocomplete

## How to check out our project

- Clone this repo
- Go into the directory and run ```nodemon src/server.js```
- Navigate to http://localhost:8000/ in your browser
- Our app can also be viewed online on Heroku [here](https://damp-reef-40042.herokuapp.com/)

## Objectives

- Build an autocomplete test program.
- Explore Node tools for deploying a server.
- Explore Front and Back-end testing (via Tape and QUnit).
- Use a code coverage tool.
- Use of modules.

## The Client/Server workload problem...

![Illustration](public/images/client-server.png)

## Logic

### 1. When the user types a letter in search field...
- A request is made to the server, to retrieve an array of results based on that letter/word chunk.
- Server scans a txt file, and responds with a JSON file containing up to 50 matches (and total number of results).
- Client stores results in a local variable.
- Client displays top 5 words in a list.
- Ghost text appears in input field with top result.

### 2. After server response, when user types another letter:
- First, local results are checked for matches. If they are, the displayed list is updated.
- If there are no results, repeat steps 1 for server request.

### 3. On typing enter (or selecting word from list) when results are present:
- List is cleared, input field updates with top/selected word, and user can begin typing their new word. Step 1 repeats.
- Note: if selected word is at start of sentence, the word appears in sentence-case.
- Note: if user has caps lock enabled, their list will be capitalised, and the word will autocomplete in uppercase.

### 4. On hitting the space bar:
- The resulted list is cleared, and a space is simply made. Step 1 repeats.

### 5. On typing enter when no results are present:
- Entire search field clears.

## Dictionary source
All dictionary files are from [tiltoBouzout](https://github.com/titoBouzout/Dictionaries).



## Stretch goals

- Heroku
- Multiple Language support (multiple text files)
- Use module.exports and require
- Testing endpoints
- Use of Travis
