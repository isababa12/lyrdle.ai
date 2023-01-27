## Project Documentation

Please put any and all documentation for your project in this folder. Other than the documents that are required at the end of week 13, feel free to organize this however your group sees fit.

----

# PROJECT READ ME DRAFT
(copy/paste the below into project directory README when finished)

----

## LYRDLE AI

# Group 11 - Team Goodnight World
* Harry Zeng
* Isaiah Lin
* Jerry Joiner
* Stephanie Hestilow

## Design
* API design
* Data Model
* GHI
* Integrations

## Intended Market
We are targeting people who are intesesting in music. user who like the lyrics can find a wide array of lyrics which share by different user from the website

# Application Design
Lyrdle.AI is a full-stack web application that brings a user's personal stories to life through the power of AI and music.  After signing-up for a Lyrdle.AI account, users can simply type in a short story, along with an artist and song to serve as inspiration, Lyrdle.AI transforms that story into a full set of lyrics in the style of that song.  These lyrics are saved to a user's personal profile, and can optionally be shared to the public on the public homepage - where other signed-in users can engage with shared lyrics through likes and comments.
* [API design](docs/api-design.md)
* [Data Model](docs/data-model.md)
* [Wireframes](docs/Lyrdle.Ai Final Draft 012623 WireFrame.png)

# Functionality
* Users should be able to sign up for an account so that they save their builds
* Users should be able to see all the shared lyrics in the homepage
* Users should be able to having a token and hash_password to keep their data safe
* Users should be able to add lyrics that they want to a update
* Users should be able to change their account username/password after they login
* Users should be able to CRUD their lyrics list
* A part that a user likes and unlike the post from the homepage
* From the lyrics page, users should be able to click a create button that they can add any lyrics that they like, and copy those for the friends
* In every pages of the top, there have a logo, users can go back to home page.
* Users should be able to publish their private builds to be public.

# Getting Started
* Fork repository

* Clone the repository to your local machine

* cd into the new project directory

* Run docker volume create pg-admin

* Run docker volume create postgres-data

To build images:
* M1 Mac Users, run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
* Other users, run docker-compose build

* Run docker-compose up
