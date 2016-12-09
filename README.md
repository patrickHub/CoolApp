Angular2 CoolApp
==========================

> An Angular 2 interactive poll app using [Angular 2](https://angular.io/), [Node](https://nodejs.org/), [socket.io](http://socket.io/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Chai.js](http://chaijs.com/), [Passport.js](http://passportjs.org/), [Json Web token](https://jwt.io/), [TypeScript](http://www.typescriptlang.org/), [D3]( https://d3js.org/), Services, Injectables, Forms, Routing & Navigation [by Patrick Deslé Djomo](https://github.com/patrickHub).

This repos shows an interactive poll application using Socket.io, Node, Mongo, D3, and Angular 2. The goal is to implement a REST API with express and mongoose, and also an angular 2 application that will use socket.io to interact in real time with the REST API server.
It also contains features:

* Secure-REST-API-with-Automate-tests using JWT, Chai.js and Passport.js
* Use of injectables, forms, routing & navigation services in Angular 2 
* Use D3 angular 2 app to manipulate documents based on data
* And much more


### Prerequisites

First of all you need to [download and install](https://docs.docker.com/engine/installation/) Docker machine or Docker toolbox in order to run the data base on your operating system.


## Quick start

```bash
# clone the repo
git clone git@github.com:patrickHub/CoolApp.git 

# change into the db directory
cd CoolApp/bd

run mongo database
docker-compose up --build

# change into the repo directory
cd ../server
# install preriquisites for server
npm install

#run server
grunt

# change into the angular app directory
cd ../admin

# install preriquisites for angular2 app
npm install

# run the admin angular 2 app
npm start

# change into the angular app directory
cd ../student

# install preriquisites for angular2 app
npm install

# run the student angular 2 app
npm start
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser. 

## Architecture

There are 6 components in angular app:

* [`Register`](admin/app/register/register.component.ts) - for register page that allow teachers to register them selves
<p align="center">
  <img src="/public/img/register.page.PNG" alt="Angular 2 D3 Node Express Socket.io Chai.js JWT Passport " width="600" height="360"/>
</p>

* [`Login`](admin/app/login/login.component.ts) - for the login page that allow registers teachers to get a json web token to be  
  authenticate
  <p align="center">
  <img src="/public/img/login.page.PNG" alt="Angular 2 D3 Node Express Socket.io Chai.js JWT Passport " width="600" height="360"/>
</p>

* [`auth and pool`](admin/app/auth/auth.component.ts) - for the authenticate page that allow authicates teachers to get into the admin interface, to add and list the availables polls
<p align="center">
  <img src="/public/img/auth.page.PNG" alt="Angular 2 D3 Node Express Socket.io Chai.js JWT Passport " width="600" height="360"/>
</p>

* [`question`](admin/app/question/question.component.ts) - for the question page that allow authenticate teachers select a poll , add new question with its differents choices and publish to students
<p align="center">
  <img src="/public/img/question.page.PNG" alt="Angular 2 D3 Node Express Socket.io Chai.js JWT Passport " width="600" height="360"/>
</p>

* [`result`](admin/app/publish-question/publish-question.component.ts) - for the result page that allow authenticate teachers to see the the answers from students and to see the graph that shows the results statistics
<p align="center">
  <img src="/public/img/result.page.PNG" alt="Angular 2 D3 Node Express Socket.io Chai.js JWT Passport " width="600" height="360"/>
</p>


## Langing page

You can visit the project [langing page](https://patrickhub.github.io/CoolApp/) for more details.

