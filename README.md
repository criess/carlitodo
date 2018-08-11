# CarlITodo

Very simple todo app that isn't capable of much right now

## Install

clone from github

following tech-stack needs to be in place:
* node (>= 8)
* ruby (>= 2.4)
* bundler and npm

frontend and backend needed to be setup sequentially before run:

* `npm i && npm run build:dev`
* `bundle install`
* `bundle exec rake db:create db:migrate # for db setup`
* `bundle exec rails s Puma`

http://localhost:3000 has then the application running.

## Working Tree Layout

App has on the backend exactly:

* 4 controllers
  * user creation/updating
  * session login/logout
  * project management
  * todo management
* 3 models
  * User
  * Project
  * Todo
All of these elements have been generated through rails generators

On the frontend there is:
* webpack for bundle creation
* reactjs for all DOM related manipulations and backend communication
* MUICSS brings some prestyled elements in CSS
* moment for date/time handling

* all react components are stored under `app/assets/javascripts/screens/`

## Demo

A working demo is as showcase available under: 

* http://rieup.org:3444/

## Issues

* inline code docs are non-existant
* logout and user profile editing
* tests (!!!) rspec is in placed but not used for now
* nice UI
* chat/comments on todos
* better browsing and listing/filtering

## Author / License

written by Christop Rieß <c.riess.dev@googlemail.com>

released under MIT License (see LICENSE file for details)
