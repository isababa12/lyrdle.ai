## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

## Git Workflow

CREATING FEATURE / TASK BRANCHES
  git remote update
  git checkout main
  git pull
  git checkout -b task1
  git branch
  (make sure you're on your branch)

MERGE MAIN INTO TASK
git checkout main
git pull
git checkout task1
git branch
(make sure you're on your task branch)
git merge main
(copies updates from main into task1)
