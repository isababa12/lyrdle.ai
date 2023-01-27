# Journal Entries - Stephanie Hestilow

# Jan 26, 2021
Today, I worked on:
* Worked with the team to fix a few bugs we noticed on our deployed frontend app
* Added two new endpoints to our lyrics api backend to delete all lyrics / likes for a user when they decided to delete their account
* Fixed unit test and updated requirements.txt to pass pipeline
* Tested, re-tested, and re-re-tested our deployed app (it's working!!!!) - now just need to get it to look nice :)  Jerry has been laboring away all week on refactoring and styling so excited to see what he comes up with
* Assuming this next merge goes through and unit test pipeline passes, will probably try to make one more unit test for practice


# Jan 25, 2021
Today, I worked on:
* Yet more homepage frontend work. Finalized the "Profile" page which shows a user's own lyrics, as well as functionality to "share to homepage" or "make private" - which updates the lyrics "posted" status on the backend.  All functionality working.
* Did final group "merge" and began testing our deployed frontend - made notes of a few bugs that we'll be tackling tomorrow


# Jan 24, 2021
Today, I worked on:
* Continued plugging away on Home / Profile pages on the frontend. Modified the LyricsOut base model so that is returns the posted_at value, which we'll use to arrange the Lyrics featured on the homepage
* Got 'like' functionality to work (!!!!) on homepage so users can click a button to "like / unlike", which connects to our backend to create / delete likes accordingly.  That took forever!!!! Yay!


# Jan 23, 2021
Today, I worked on:
* More homepage frontend work.  Created functions to get total likes for each lyrics post, and map usernames to lyrics. Still need to implement "like" functionality, which will need the user's token
* Helped Isaiah debug settings and create lyrics form
* Updated ports for our microservices in Caprover - appears to be working!
* Need to do more work on frontend deployment - likely once all frontend pages are fully functional


# Jan 22, 2021
Today, I worked on:
* Tried playing around with Caprover and the Postgres DB configs // trying to mirror how it's set up in our docker-compose yaml file, but still no luck - will need to look into this more on Monday
* Worked on users backend and fixed some bugs / errors happening with "Get Info" and "Update User".  I modified the "update user" function to recognize empty strings, so if someone leaves those blank, they will remain the same values in the database.


# Jan 20, 2021
Today, I worked on:
* Focused the entire day on getting project deployed on Caprover
* Was able to successfully deploy both users / lyrics backend services, and connect each to a deployed postgres database
* However -- for some reason the "lyrics" service is not recognizing the token info when logging in on the "users" service...tested / re-tested on Docker to confirm it was working locally, so will need to look into this further on Monday to figure out how to make sure auth is functional on Caprover


# Jan 19, 2021
Today, I worked on:
* Complete backend revamp - debugged some issues in the queries files, finished working on likes endpoints, created all comments endpoints
* Tested / retested all backend endpoints including auth integration
* Updated migrations files to add "on delete cascade" to references
* Started frontend homepage - passing the baton to Jerry to finish up


# Jan 18, 2021
Today, I worked on:
* More backend work - finalized integration of our OpenAI api which will generate lyrics using a user input, Artist and Song.  Played around with the temperature and hardcoded prompt a bit until the output was close to what we wanted.
* Implemented auth into lyrics service and protected almost all endpoints except "get all lyrics" - otherwise users will have to be logged in


# Jan 17, 2021
Today, I worked on:
* Continued working Lyrics microservice backend endpoints
* Looked into OpenAI api documentation to learn about their GPT-3 models which can understand and generate natural language.  Selected the text-davinci-003 model and played around with it in a test project to understand how it works


# Jan 16, 2021
MLK Day


# Jan 15, 2021
Today, I worked on:
* Debugging users authentication backend - was able to get login / logout, get token, get all users, get user by username / id endpoints working in docs....no errors currently
* Errors resolved today: fastapi versions incompatible with jwtdown version so updated those in requirements, some issues with UsersOut models so fixed those
* Added hashed_password prop to users table in migrations file, deprecated / recreated volumes and re-registered databases in pg-admin
* Not sure what "session getter" and "fastapi_token" parameters are showing up in "logout" endpoint...would like to investigate that further tomorrow / Tuesday when back in class


# Jan 12, 2021
Sick day


# Jan 11, 2021
Today, I worked on:
* Creating GET endpoints for our lyrics serivce (get all, get one by id)
* Was able to see return data in docs for both endpoints after creating a test lyrics entry in pgAdmin
* Fixed typo with pool import statement
* Discussed frontend with team, aligned on giving Redux a try once we get to that point
* Reviewed jwtdown authentication in anticipation of implementation


# Jan 10, 2021
Today, I worked on:
* Creating our migrations files for users and lyrics services
* Troubleshooting Docker with the team, helping to get everyone set up on their separate machines
* Created first test branch and merged to main --> had a bit of a hiccup with pipelines but was able to resolve after validating account
* Began working on queries for lyrics service, created pool.py as well as in / out BaseModel classes for lyrics, likes and comments


# Jan 9, 2021
Today, I worked on:
* Creating our database schema and mapping table details out in drawSQL (led by me)
* Setting up the rest of our project, configuring Docker files (led by Jerry), getting our project up and running in Docker. We had a minor setback in our ability to connect to the remote repository, but were able to resolve with the help of Matt!
* Reviewing and aligning on our latest updated wireframes (led by Isaiah)
