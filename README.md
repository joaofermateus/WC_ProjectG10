Web Computation Group 10 Project
Albertina Soares N.01, David Sousa N08, João Mateus N20
==========================

[![](https://img.shields.io/badge/TÉCNICO-LISBOA-blue.svg?style=flat-square)](http://tecnico.ulisboa.pt/)

Requirements:
Additional Modules (other than project_template modules)
MongoDB; https://www.npmjs.com/package/mongodb

## Initialization Procedure:

### Initialize RESTful API:
  - Open the 'api' directory in the terminal and type 'npm start' to initialize the web server, the server will be initialized in http://localhost:9000/.
    - Note: Running the server will create a MongoDB database called projectG10 inputing all the project data from JSON files. e.g. patients, acts, etc.
### Initialize Client Side Application:
  - Open the 'app' directory in the terminal and type 'npm start' to initialize the web App, the app will be initialized in http://localhost:9090/.

## Project assignment

##Client Side Application directory

```
app/src
.
├── css
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   ├── jumbotron-narrow.css
│   └── main.css
├── fonts
│   ├── glyphicons-halflings-regular.eot
│   ├── glyphicons-halflings-regular.svg
│   ├── glyphicons-halflings-regular.ttf
│   ├── glyphicons-halflings-regular.woff
│   └── glyphicons-halflings-regular.woff2
├── img
│   └── favicon.ico
├── index.html
└── js
    ├── app.js
    └── bl.js

```
##RESTful API

```
api/src
.
├── data
│   ├── acts.json
│   ├── acts-rmb.json
│   ├── acts-rmb-verbose.json
│   ├── data-gen.js
│   ├── doctors.json
│   ├── LICENSE
│   ├── mediators.json
│   ├── patients.json
│   ├── README.md
│   ├── reports.json
│   ├── requests.json
│   └── requests-verbose.json
├── data.zip
├── index.js
├── resources
│   ├── hello.js
│   ├── index.js
│   ├── LICENSE
│   └── README.md
└── routes
    └── hello.js

```
## Business logic

```
bl/src
.
├── index.js
├── LICENSE
├── README.md

```
