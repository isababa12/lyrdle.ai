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
