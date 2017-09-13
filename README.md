# Intro to AJAX: Project - Moving companion web app.

This project is based on Udacity's Introduction to AJAX project. The objective
of this project is learning the key concepts around implementing asynchronous requests, especially using AJAX.

* *Asynchronous* vs *synchronous* requests.
* *Internal vs public APIs*, and public APIs usage (e.g. Google Maps, New York Times, and wikimedia).
* JQuery's *ajax()* and *getJSON()* method calls.
* *Same-origin security policy* and ways to make it more permisive (e.g. *JSONP* and *cross-origin resource sharing* (CORS)). 

In order to learn these concepts, the project implements a moving companion app. This app asks the user for an address and retrieves
relevant data from Google Maps, the New York Times and wikipedia.

There is two important files:

* *index.html:* Defines the template where the data is going to be displayed.
* *js/script.js:* Loads asynchonously the data from the different services.

## Displaying the app in your browser

1. Create a New York Time API KEY, and add it in the js/script.js file.
2. Open the index.html file in your browser (e.g. file://your-local-path/index.html).
