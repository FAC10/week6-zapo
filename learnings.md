# Learnings

## Setting up a database

(taken from [Morning Challenge](https://github.com/shiryz/db-morning-challenge)):
- In your browser, go to ElephantSQL
- Log into ElephantSQL via GitHub
- Click on 'Create new instance' to create a new database
- Give your database a name, choose the 'Tiny Turtly' free plan, and select any data center from the list
- Click on the name of your new new database to see details; you'll need the URL. Copy this to your clipboard!
- Back in your command line, create a config.env file with the url of your new database. You can do that like this  `$ echo "export DB_URL = {YOUR_COPIED_URL}" >> "config.env"`
- Build your database by running: `$ node database/db_build.js`
- It is now on elephant!

## Setting up server

[We followed Dan's guide](https://github.com/sofer/sssk/blob/master/router.js)
