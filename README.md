Angular2 CoolApp
==========================

> An Angular 2 interactive poll app using [Angular 2](https://angular.io/), [Node](https://nodejs.org/), [socket.io](http://socket.io/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [TypeScript](http://www.typescriptlang.org/), [D3]( https://d3js.org/), Services, Injectables, Forms, Routing & Navigation [by Patrick Deslé Djomo](https://github.com/patrickHub).

This repos shows an interactive poll application using Socket.io, Node, Mongo, D3, and Angular 2. The goal is to implement a REST API with express and mongoose, and also an angular 2 application that will use socket.io to interact in real time with the REST API server.
It also contains features:

* Secure-REST-API-with-Automate-tests using JWT and Chai.js
* Use of injectables, forms, routing & navigation services in Angular 2 
* Use D3 an angular 2 app to manipulate documents based on data
* And much more



## Quick start

```bash
# clone the repo
git clone git@github.com:patrickHub/CoolApp.git 

# change into the db directory
cd CoolApp/bd

run mongo database
docker-compose up --build

# change into the repo directory
cd ..
# install preriquisites for server
npm install

#run server
grunt

# change into the angular app directory
cd admin

# install preriquisites for angular2 app
npm install

# run the angular 2 app
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


## File Structure

Here's an overview of how the files are laid out in this project:

```
angular2-node-socket-io-chat-app/
|
├── client/                         	* Where our Angular2 client code is stored
│   ├── chat-component/               * All of our chat-component files are here
│   │   ├── chat.component.ts       	* Chat Component
│   │   ├── chat.component.html     	* chat Component HTML
│   │   ├── chat.module.ts      		* chat module 
│   │   ├── chat.route.ts      		* chat component routes
│   │   └── index.ts       		    * index file for chat Component
|   |   
│   ├── nickName-component/           * All of our TypeScript is here
|   |	|
│   │   ├── nickName.component.ts 	* nickName Component
│   │   ├── nickName.component.html   * nickName Component HTML
│   │   ├── nickName.module.ts 		* nickName module
│   │   ├── nickName.route.ts 	    * nickName component routes
│   │   └── index.ts 					* index file for nickName Component
|   |   
│   ├── service/ 		      	      * service for all components
|   |	|
│   │   └── global.ts 		        * file with global attributes
|   |  
│   ├── app.component.html 			  * Home component HTML   
│   ├── app.component.ts 			  * Home component 
│   ├── app.module.ts                 * Aap Module  
│   ├── app.routing.ts                * App images  
│   └── main.ts            			  * Angular 2 Entry point  
|    
├── public/							* Stores app images and gif
|	|
│   ├── Chat-Page.png       		  * chat page image
│   ├── chat-app.gif       		      * chat app gif
│   ├── ChatPage-Description.png      * chat page description image
│   ├── Sequence-Diagram.png      	  * app sequence diagram image
│   └── Welcome-page.png			  * welcome page image
|   
├── server/             		        * Server side code (socket.io,express,node)
│   └── index.js       			      * Aap entry point
|
├── typings/                          * tsd managed typings
├── index.html                  	    * HTML entry point 
├── styles.css                   		* Contains app CSS
├── package.json                    	* Our javascript dependencies
├── README.md                       	* This file
├── systemjs.config.js                * syatemJS configuration file
├── tsconfig.js                 	    * Some hacks to get TypeScript tests
├── tslint.json                       * Configures our TypeScript linter
└── typings.json                      * Configures our TypeScript linter 
```

## Known Issues

There is a issue with Windows systems. The directory path doesn't gets resolved correctly thereby creates compile issues with typecsript files. The app works fine on **MAC** and **Linux** systems. This issue will be resolved in coming weeks. Also If anyone finds a fix for the same, do send a pull request.



# CoolApp

# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

