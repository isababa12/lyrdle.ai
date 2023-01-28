# Jerry Joiner Journal

## January 12th, 2023

Today, I worked on:

- Authentication, merging files in Git and making the `create_user` API endpoints

Went through and debugged code from the group regarding our `create_user` function. It turns out we were trying to input the values for `created_at` and our modified columns when those didn't exist yet. So we commented out that code and the endpoints worked.

As well I handled merge conflicts for the group when pushing to main. We're getting a better sense of how the merging works within VSCode are pretty comfortable with it.

## January 17th, 2023

Today, I worked on:

- The API endpoints for Likes

I created all of the endpoints for likes today, which included getting a list of all likes, an individual one, editing a like, deleting one, and creating one. As well, I created the routers so that we can use FastAPI's debugging tools and so they'd be routed appropriately.

## January 18th, 2023

Today I worked on:

- Creating endpoints for the comments (stretch goal)
- Debugging prior API changes

We're starting to finish up our endpoints and I continued to ensure that my prior made endpoints were working as intended. As well, I started to come up with the endpoints for comments which follows a similar structure but has a few differences on the database side.

## January 19th, 2023

Today I worked on:

- Git merges / errors with the team
- Handling errors and code as a group

Today we had a few errors with Git, usually revolving around fast-forwarding and detached git heads. We found a workaround by creating a new branch and pushing from there. Not super clear on why that happens but at lwast we have a workaround. We also coded a bit more for our users end / authentication.

## January 20th, 2023

Today I worked on:

- Troubleshooting authentication with the group
- Getting ready to help deploy the project
- Git troubleshooting

Today we had our hands full with trying to get everyone's changes applied to the main branch and pulling them down to make new branches. After we sorted that out, we continued work on tokens and authentication, troubleshooting issues of backend invalid tokens. Over the weekend we plan to get together to give deployment with Caprover a go.

## January 23

Today I worked on:

- Caprover deployment, pipeline tests and git
- Early unit test work

We managed to get our app on Caprover and it worked, though we turned certain pipelines off in Gitlab because the errors mostly had to do with conventions that we didn't want to constantly bother with until our near final deploy. After that, I started work on unit tests for the lyrics / lyrics_likes API.

## January 24

Today I worked on:

- Finished unit tests
- Final git merges before frontend applications
- Rework of UX flow

Today I finished my unit tests checking our lyrics / lyrics_likes API, which proved kind of frustrating at first. During that time I was also helping with git merges and planning out how to scope our final git merges before dealing with all new frontend changes. Included in this was reworking a bit of our UX to better suit the app and make things simpler.

## January 25th

Today I worked on:

- Frontend styling
- Continued Git support
- Debugging auth code

More issues came up regarding auth so we had to tackle those and deploy first thing. During that I was helping with git and making sure merges went accordingly (occasionally fixing some major merge conflicts). After that I got started on making the final push towards our aesthetic identity with style changes and clean up.

## January 26th

Today I worked on:

- Styling the frontend
- Deployment bugs

Went really hard on the aesthetic, as well as finding and fixing bugs in our code. We also started to clean up the code so that the linter wouldn't yell at us and the frontend pipeline would go through without a hitch.

## January 27th

Today I worked on:

- The final project deploy

After some troubleshooting, we got our app in Caprover and fully functional without errors. James came by and vetted our project, which went off without a hitch. We did it : ).
