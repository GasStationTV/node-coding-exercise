# Notes
Both sides of the application start with `npm start`. There are basic tests with `npm test`, but mockgoose was being fickle with the data store, so you may need to run them twice.

I did additional validation manually w/[postman](https://www.getpostman.com/). 

## API

The API is setup at localhost:8000/api and corresponding informatio is stored in /server area. This utilizes express and mongoose. Model validations are all performed with mongoose utilizing moment.

## Front End

The front end is an incomplete react application located at localhost:8000. It has the ability to create sites, but I ran out of time regarding the front end scheduling creations. 

# Effort

I was able to spend approximately 10-12 hours on this. A good portion of that time was unfortunately spent on two areas:

1. learning the ins and outs of mongoose and their validators. I was eventually able to get the hang of it, however it did eat into valuable time.
2. Performing front end setup, modeling, etc. It would have been much easier to focus on the backend if there was a working front end skeleton to utilize. 

I'm not sure this is a good reflection of my develop skills, but I hope it provides some insight into what you're looking to see. 
