#reactlist

## Synopsis

Implementing <a href="https://nomadlist.com/" target="_blank">Nomadlist’s</a> multi-filtering feature using Facebook's React front-end framework.

## Motivation

The motivation for this project is to learn a new library in a short time-span. This was during a 3-day personal hackathon.

I enjoyed the visual experience of searching through Nomadlist however found the responsiveness to be very slow. I wanted to implement the search and multi-filter features on the website using React to observe gains in responsiveness using a virtual DOM (react). All filters (+50) were not implemented, only a subset.

## Sample Demo
Click to view side-by-side comparison of the completed demo and original website. Use case is searching for 'Varna'.

<a href="https://vimeo.com/128074445" target="_blank"><img src="https://github.com/RichardBansal/reactlist/blob/development/public/images/video_screen_shot.png?raw=true"></img></a>

## Code Structure

The repository is split into two folders: 

####_public_
This is where the website exists after compiling activities. Browserify was used to bundle all dependencies into a single app.js

####_js-build_
Post-compiled JSX (now JS).

####_js-src_
Pre-compiled JSX.

## External Libraries and Technologies Used

We have used many open source technologies for completion of this project as follows:
* Frontend Application
  * Facebook's React
  * JQuery
  * Browserify
  * Material CSS
* Backend Server (To serve up the data, a local host backend server was created)
  * Node
  * Express
* Other
  * Cheerio (to get initial data set)
