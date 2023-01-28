# LYRDLE AI
### Project Documentation

## Goodnight World (Group 11)
* Harry Zeng
* Isaiah Lin
* Jerry Joiner
* Stephanie Hestilow

## Intended Market
We are targeting all people who like music and like to have fun. 

## Application Design
Lyrdle.AI is a full-stack web application that brings a user's personal stories to life through the power of AI and music.  After signing-up for a Lyrdle.AI account, users can simply type in a short story, along with an artist and song to serve as inspiration, Lyrdle.AI transforms that story into a full set of lyrics in the style of that song.  These lyrics are saved to a user's personal profile, and can optionally be shared to the public on the public homepage - where other signed-in users can engage with shared lyrics through likes and comments.
* [API design](docs/api-design.md)
* [Data Model](docs/data-model.md)
* [Wireframes](docs/Lyrdle.Ai Final Draft 012623 WireFrame.png)

## Functionality
* All users should be able to see all the publicly-shared lyrics in the homepage
* All users should be able to sign up for an account to have access to the full suite of features
* Logged-in users should be able to having a token / hashed password to keep their data safe
* Logged-in users should be able to generate new lyrics by inputting a prompt, artist and song into the Lyrdle AI create form
* Logged-in users should be able to view their profile to view their collection of lyrics
* Logged-in users should have the option to share their lyrics publicly to the homepage
* Logged-in users should be able to like / unlike lyrics posted on the homepage
* Logged-in users should be able to access their account settings to change their account information after they login
* All users should be able to navigate to pages that are accessible to them

## Getting Started
* Fork repository
* Clone the repository to your local machine
* cd into the new project directory

Create volumes:
* Run docker volume create pg-admin
* Run docker volume create postgres-data

Build images:
* M1 Mac Users, run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
* Other users, run docker-compose build

Run Containers:
* Run docker-compose up

## Deployed Application
https://lyrdle-ai.gitlab.io/module3-project-gamma 
