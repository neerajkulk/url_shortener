# URL Shortener 

This is a simple url shortener written in ```node.js```. Type in any url and it returns a shortened version. To run it:

- ```npm install```
- ```npm start```
- go to ```http://localhost:3000/```

The code works by randomly creating a 5 digit string, that maps to the original URL. These mappings are stored in ```urlDB.json```. When the shortened URL is typed in the browser, we find the corresponding long url and redirect you there.

The random ID's are created in ```createUniqueID()``` of ```index.js``` which returns a randomly generated string that's not currently in ```urlDB.json```. 

If too many URL's get shortened, there are fewer and fewer available unique ID's. Note that just for a 5 letter string, there are already around a billion possible unique strings. 

To take this a step further, we should be using an indexed database so that adding new URL's is much faster. We could also implement an 'expiry date' on the shortened URL which frees up space by deleting old URL's in the database. 
