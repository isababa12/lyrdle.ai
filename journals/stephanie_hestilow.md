# Journal Entries - Stephanie Hestilow



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
