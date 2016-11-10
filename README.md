# backend-badgers-autocomplete

## Objectives 

An autocomplete program made to learn about node. 
- frontend and backend testing (Tape, QUnit)
- follow the modular approach

## Model

### On start: When user types letter in search field;
- Makes a request to server, to retrieve array of words starting with that letter
- Server responds with JSON file, containing results with up to 50 matches, and number of results
- Client stores results in variable which holds array, and number of server matches in array
- Client displays top 10 words (in random order) (and server matches)
- User can click word in list or press enter...

### On next letter type:
- On new query, check our results in matches are present, if they are, filter the list...
- If no results, send new request for new JSON list.
- If results from server, follow the same steps in step 1.
- If no results, user simply carries on typing letters.

### On typing enter (or selecting word) when results are present:
- If they have caps lock on (will add top result to search field in CAPS, and add space)
- Else if word is at start of sentence (will add top result to search in sentence-case, and add space)
- Else will add top result to search field, and add space.

### On space
- Simply create space, clear all results and local array. 

### On new word
- Same steps as previously, but checking on latest word chunk only.



## Stretch goals

- Heroku
- multiple languages (multiple text files)
- module.exports and require
- Testing endpoints

### Wednesday
- initial research
