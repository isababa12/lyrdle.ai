# Journal Entries - Stephanie Hestilow

## Jan 22, 2021
Today, I worked on:
* Tried playing around with Caprover and the Postgres DB configs // trying to mirror how it's set up in our docker-compose yaml file, but still no luck - will need to look into this more on Monday
* Worked on users backend and fixed some bugs / errors happening with "Get Info" and "Update User".  I modified the "update user" function to recognize empty strings, so if someone leaves those blank, they will remain the same values in the database.
* Updated API design documentation and integrated into docs folder


## Jan 20, 2021
Today, I worked on:
* Focused the entire day on getting project deployed on Caprover
* Was able to successfully deploy both users / lyrics backend services, and connect each to a deployed postgres database
* However -- for some reason the "lyrics" service is not recognizing the token info when logging in on the "users" service...tested / re-tested on Docker to confirm it was working locally, so will need to look into this further on Monday to figure out how to make sure auth is functional on Caprover
* Started working on readme docs


## Jan 19, 2021
Today, I worked on:
* Complete backend revamp - debugged some issues in the queries files, finished working on likes endpoints, created all comments endpoints (stretch goal)
* Tested / retested all backend endpoints including auth integration
* Updated migrations files to add "on delete cascade" to references
* Started frontend homepage - passing the baton to Jerry to finish up


## Jan 18, 2021
Today, I worked on:
* Update Lyrics "create" endpoint and successfully integetrated OpenAI api (text-davinci-003 model) by inserting the user inputs (story, artist name, song name) into a prompt message. The response is generated using the OpenAI Completion.create() function - this gives an output of our lyrics as a string, which is then passed into our repository create method along with the rest of the inputs.
* Currently the output string includes the line breaks as '\n' --- will need to figure out how to get this to print formatted correctly on the frontend


## Jan 17, 2021
Today, I worked on:
* Integrated auth into lyrics backend so we're able to use the current logged-in user's token to protect views / get user id data as needed --> tested on FastAPI docs
* Helped Isaiah out with update / delete lyrics endpoints


## Jan 16, 2021
MLK Day


## Jan 15, 2021
Today, I worked on:
* Debugging users authentication backend - was able to get login / logout, get token, get all users, get user by username / id endpoints working in docs....no errors currently
* Errors resolved today: fastapi versions incompatible with jwtdown version so updated those in requirements, some issues with UsersOut models so fixed those
* Added hashed_password prop to users table in migrations file, deprecated / recreated volumes and re-registered databases in pg-admin
* Not sure what "session getter" and "fastapi_token" parameters are showing up in "logout" endpoint...would like to investigate that further tomorrow / Tuesday when back in class


## Jan 12, 2021
Sick day


## Jan 11, 2021
Today, I worked on:
* Creating GET endpoints for our lyrics serivce (get all, get one by id)
* Was able to see return data in docs for both endpoints after creating a test lyrics entry in pgAdmin
* Fixed typo with pool import statement
* Discussed frontend with team, aligned on giving Redux a try once we get to that point
* Reviewed jwtdown authentication in anticipation of implementation


## Jan 10, 2021
Today, I worked on:
* Creating our migrations files for users and lyrics services
* Troubleshooting Docker with the team, helping to get everyone set up on their separate machines
* Created first test branch and merged to main --> had a bit of a hiccup with pipelines but was able to resolve after validating account
* Began working on queries for lyrics service, created pool.py as well as in / out BaseModel classes for lyrics, likes and comments


## Jan 9, 2021
Today, I worked on:
* Creating our database schema and mapping table details out in drawSQL (led by me)
* Setting up the rest of our project, configuring Docker files (led by Jerry), getting our project up and running in Docker. We had a minor setback in our ability to connect to the remote repository, but were able to resolve with the help of Matt!
* Reviewing and aligning on our latest updated wireframes (led by Isaiah)
