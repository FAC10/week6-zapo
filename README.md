[![codecov](https://codecov.io/gh/pbywater/week6-zapo/branch/master/graph/badge.svg)](https://codecov.io/gh/pbywater/week6-zapo)
[![Build Status](https://travis-ci.org/pbywater/week6-zapo.svg?branch=master)](https://travis-ci.org/pbywater/week6-zapo)

# ZAPO Recipes

## Overview

We are building a simple recipe web application that allows users to input recipes into our database. This list of recipes can then be viewed and filtered in the DOM. As a stretch goal, users will be able to rate these recipes.

## Installation instructions
- Clone this repository
- Run ```npm install```
- Create a ```config.env``` filter
- Add ```export DB_URL =``` plus the DB_URL (available in our gitter channel)
- run ```npm run start:dev``` to run the project
- run ```npm test``` to run tests

## User Stories

As a user who is interested in finding new recipes:
- [ ] I want to see a list of recipes I can pick from
- [ ] I'd like to see instructions, the ingredients and the cuisine of the recipe
- [ ] I'd like to be able to search by cuisine
- [ ] **Stretch Goal** I'd like to be able to search by ingredients
- [ ] **Stretch Goal** I'd like to be able to see recipe ratings and rate them myself

As a user who likes to share my recipes:
- [ ] I'd like to be able to input my favourite recipes into a database so others can try them
- [ ] I'd like to specify instructions, the ingredients and the cuisine of the recipe
- [ ] **Stretch Goal** I'd like to be able to get feedback on my recipes

## Architecture

![schema and architecture](https://cloud.githubusercontent.com/assets/20152018/24463909/15572904-14a0-11e7-81c0-11c86f1b68cd.jpg)

## Dependencies

- Tape
- Shot
- tap-spec
- istanbul
- codecov
- nodemon
- es-lint
- env2

## [Learnings](./learnings.md)
