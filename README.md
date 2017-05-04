# Seedalpha coding challenge

[![ci](https://travis-ci.org/ycmjason/seedalpha-coding-challenge.svg?branch=master)](https://travis-ci.org/ycmjason/seedalpha-coding-challenge)

------
## Abstract
This is an app which performs sentiment analysis on incoming emails and show the hourly summary for the analysis. 

## Components
This app is composed by three parts: 
1. server 
	- serves the hourly summary website
	- expose api endpoints
		- POST /api/email
			- add job `sentiment-analysis` to queue
			- record email to database
		- GET /api/analysis?date=[date]
			- serves hourly analysis from database of the date
			- [24 records would be returned if analysis exists](24-hours)
	- add job `aggregate-analysis` to queue every [24 hours](#24-hours)
2. worker 
	- listen to `sentiment-analysis` jobs from the queue
		- perform sentiment analysis
	- listen to `aggregate-analysis` jobs from the queue
		- [aggregate result from the start of yesterday to the start of today](#24-hours)
3. queue
	- adapter for [Kue](https://github.com/Automattic/kue)
	- expose limited functionality of Kue

## Live server
Production: https://seedalpha-coding-challenge.herokuapp.com
With dummy data: https://seedalpha-coding-challenge-dum.herokuapp.com

(note: it might take some time to [wake the dyno](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping).)

Both servers will receive a trigger whenever an email is sent to the following email address:
`rec@sandbox90aebee7c4ba45199596f50dde418d19.mailgun.org` 

The mailgun webhook could be verified by checking out the Email collection of mongodb. (accessible from [heroku dashboard](https://dashboard.heroku.com/apps/seedalpha-coding-challenge))

## Build

Make sure:
- you are at project root
- `npm install` is done in development mode

```
#install dependencies of both backend and frontend
> npm install       

// then, transpile and bundle the scripts
> npm run build:frontend  
```

## Build dummy data into mongoDB
The following script would create 3000 emails dating from 2017-4-20 to 2017-5-3. Each email would contains 350 charaters randomly extracted from the [brown corpus](http://www.sls.hawaii.edu/bley-vroman/brown.txt).

Make sure:
- The application is built as described above.

```
> dummy=true node createFakeData.js
```
Please note that `dummy=true` is important so that we could easily configure heroku to create fake data or not based on this variable.

## Run the server

Make sure:
- you are at project root
- Mongodb can be found at: `mongodb://127.0.0.1:27017/`
- Redis can be found at: `redis://localhost:6379/`

```
> npm start

[WARN] No ENV file found
12:50:27 worker.1   |  Connected to MongoDB
12:50:27 web.1      |  server started, listening to 5000...
12:50:27 web.1      |  Connected to MongoDB
```

Optionally, you could pass a mongodb/redis URL to the application.

```
> MONGODB_URL=mongodb://someurl:27017 REDIS_URL=redis://someotherurl:6379 npm start

[WARN] No ENV file found
12:50:27 worker.1   |  Connected to MongoDB
12:50:27 web.1      |  server started, listening to 5000...
12:50:27 web.1      |  Connected to MongoDB
```
Once the server is up, go to the browser `http://localhost:5000`

## Tests for backend
```
> npm test
...
  sentiment analysis worker controller
sentiment analysis job arrived
    ✓ # make sure the score is returned to done()
sentiment analysis job arrived
    ✓ # positive sentence should have positive score
sentiment analysis job arrived
    ✓ # negative sentence should have negatieve score


  20 passing (300ms)
```

## Tests for frontend
[There isn't any test available on frontend.](#tests-for-frontend-regret) 

## Backend dependencies
### Production
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [express.js](http://expressjs.com/)
- [mongoose](http://mongoosejs.com/)
- [Kue](https://github.com/Automattic/kue)
- [sentiment](https://github.com/thisandagain/sentiment)

### Dev
- [faker.js](https://github.com/marak/Faker.js/)
	- Fake.js is used to generate dummy data for the dummy server.
	- Used in `./createFakeData.js`
- [foreman](https://github.com/strongloop/node-foreman) - manager for Procfile-based applications
- Tests
	- [Mocha](https://mochajs.org/) -  testing framework
	- [Sinon](http://sinonjs.org/) - spies, stubs, mocks... 
	- [supertest](https://github.com/visionmedia/supertest) - express route tests

## Frontend dependencies
- [vue](https://vuejs.org/)
- [lodash](https://lodash.com/)
- [skeleton-css](http://getskeleton.com/)
- [whatwg-fetch](https://github.com/github/fetch) - polyfilling
- [es6-promise](https://github.com/stefanpenner/es6-promise) - polyfilling

### Building tools
- [webpack](https://webpack.github.io/)
- [babel](https://babeljs.io/) - transpile es6 to es5

## Heroku dependencies
- [Heroku Redis](https://devcenter.heroku.com/articles/heroku-redis)
	- provide redis
	- the url is provided at `process.env.REDIS_URL`
- [mLab MongoDB](https://devcenter.heroku.com/articles/mongolab)
	- provide mongodb storage
	- url provided at `process.env.MONGODB_URL`

The environment variables could be found on heroku: 
> setting -> config variables -> reveal config vars

## File structure

### At `.`
```
.  -- project root
├── lib/ ---------------- [SEE BELOW: #At `./lib/`]
├── test/  ---------------- [SEE BELOW: #At `./test/`]
├── Procfile ------------ heroku/foreman configuration
├── createFakeData.js --- a script to generate fake Email/Analysis records if `process.env.dummy` is set
├── package.json -------- npm config that holds the dependencies
└── README.md
```
### At `./lib/`
```
./lib/ ------------------------------- contains all the source
  ├── models/ ------------------------ contains all database models
  │   ├── Analysis.js ---------------- model/schema def. for Analysis
  │   ├── Email.js ------------------- model/schema def. for Email
  │   └── index.js ------------------- connect to mongodb and export Email and Analysis models
  ├── utils/ ------------------------- shared utility functions to all components
  │   ├── Wait.js -------------------- allow multiple of async operations to finish before proceeding
  │   └── pureDate.js ---------------- set the hours/minutes/seconds/milliseconds component to 0
  ├── server/ ------------------------ see "server component"
  │   ├── controllers/ --------------- contains all controller
  │   │   ├── createEmail.js --------- controller for `POST api/email`
  │   │   └── readAnalysis.js -------- controller for `GET api/analysis`
  │   ├── routers/ ------------------- manage routes
  │   │   └── api.js ----------------- export an express.Router for `api/`
  │   ├── services/
  │   │   └── aggregateAnalysis.js --- add aggregate job to the queueevery hour
  │   ├── public/  ------------------- [SEE BELOW: #At `./lib/server/public/`]
  │   ├── app.js --------------------- exports the express application (without listening)
  │   └── index.js ------------------- bootstrap the app by calling app.listen
  ├── worker/ ------------------------ see "worker comonent"
  │   ├── controllers/ --------------- the controllers for different jobs
  │   │   ├── aggregate_analysis.js -- controller for jobs with type 'aggregate-analysis'
  │   │   └── sentiment_analysis.js -- controller for jobs with type 'aentiment-analysis'
  │   └── index.js ------------------- listen to queue and call the appropriate controller depending on the type of the job
  ├── queue.js ----------------------- see "queue component"
  └── config.js ---------------------- configuration of the app, e.g. MONGODB_URL, REDIS_URL, PORT...
```
### At `./lib/server/public/`
```
./lib/server/public/
  ├── app/
  │   ├── components/
  │   │   └── analysis.component.js -- the component displaying the analysis
  │   ├── services/ ------------------ services used by components
  │   │   ├── analysis.service.js ---- provide higher-level abstraction to fetching data from api
  │   │   └── api.service.js --------- wrapping the fetch api
  │   └── utils/ --------------------- shared utility functions for all components
  │   │   ├── getQueryString.js ------ returns query string, e.g. "?date=2017-4-2", given an object, e.g. `{date: "2017-4-2"}`.
  │   │   ├── monthName.js ----------- returns monthName given integer
  │   │   ├── pureDate.js ------------ set the hours/minutes/seconds/milliseconds component to 0
  │   │   └── unwrapValue.js --------- obtain string representation
  │   └── index.js ------------------- entry point for the app
  ├── dist/
  │   └── bundle.js ------------------ compiled bundled app, generated by `npm run build`, essentially webpack
  ├── index.html --------------------- entry point of website
  ├── package.json ------------------- npm config, tracks dep for frontend. e.g. vue, Skeleton...
  └── webpack.config.js -------------- configuration for webpack
```
### At `./test/`
This is quite self explanatory. The test specifications for each component are located in the same directory as `./lib`.
```
./test/ -- tests specifications
  ├── server/
  │   ├── controllers/
  │   │   ├── createEmail.test.js
  │   │   └── readAnalysis.test.js
  │   ├── routers/
  │   │   ├── analysis.test.js
  │   │   └── email.test.js
  │   └── services/
  │       └── aggregateAnalysis.test.js
  ├── utils/
  │   └── pureDate.test.js
  └── worker/
      └── controllers/
          ├── aggregate_analysis.test.js
          └── sentiment_analysis.test.js
```


## Regrets
### 24 hours
- I should have really made the worker to aggregate the results of the current hour
- Now the analysis is done every 24 hours which is a little bit useless I guess since it is not real time.

[back to components](#Components)

### tests for frontend regret
- Since the UX/design of the frontend is not in the scope of this challenge, I became lazy writting tests for this. 

[back to test for frontend](#test-for-frontend)

## Author
Jason Yu (me@ycmjason.com)


