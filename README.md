# URL Shortner Apis
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Challenges](#challenges)
* [Future Improvement](#future-improvement)
* [Setup](#setup)

## General info
This project contains api for generating short url with authentication
	
## Technologies
Project is created with:
* Node: 18.13.0
* NPM: 8.19.3
* Mongoose: 5.13.16
* Swagger: 4.6.2
* Jest: 29.5.0

## Challenges
I want to create this project with Type Script. I have completed the project but When I was trying to write the test cases fro that I was not able to call db queries through test cases. So I have drop the this idea and recreate this project through express. But I will focus this thing in my spare time.

## Future Improvement
* Typescript: Typescript will improve the performance and make it OOPs based. I will use interfaces for custom types given to our variables
* Webpack: Webpack will make it easy for deployment
* GraphQl: Use of graphQl will improve the proformance and give the functionality for reduce our code. 
GraphQL allows making multiple resources request in a single query call, which saves a lot of time and bandwidth by reducing the number of network round trips to the server. It also helps to save waterfall network requests, where you need to resolve dependent resources on previous requests.

## Setup
Create .env file and add following variable in it:

```
PORT=<PORT>
MONGOSERVER=<MONGOSERVER IP>
DATABASE=<my_database>
```

To run this project, install it locally using npm:

```
$ cd /url_shortner/apis
$ npm install
$ npm run build
$ npm start
$ npm run test

```

Find Documentation on 
``` 
<URl>/api-docs
```