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


# Application Design
Lyrdle.AI is a full-stack web application that brings a user's personal stories to life through the power of AI and music.  After signing-up for a Lyrdle.AI account, users can simply type in a short story, along with an artist and song to serve as inspiration, Lyrdle.AI transforms that story into a full set of lyrics in the style of that song.  These lyrics are saved to a user's personal profile, and can optionally be shared to the public on the public homepage - where other signed-in users can engage with shared lyrics through likes and comments.
* [API design](docs/api-design.md)
* [Data Model](docs/data-model.md)
* [Wireframes](docs/wireframes.md)


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
