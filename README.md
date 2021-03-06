<h1 align="center">ExpressJS - #backend-Blanja RESTfull API</h1>

Blanja is a e-commerce site connecting seller and customer. As a seller, you can sell any item that you want to sell, and as a customer you can buy anything you want!

<p align="center">
  </p>
  <p align="center">
    <a href="https://blanja-rico.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/MochamadRicoPratamaPutra/Backend-Blanja/issues">Report Bug</a>
    ·
    <a href="https://github.com/MochamadRicoPratamaPutra/Backend-Blanja/pulls">Request Feature</a>
  </p>

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

    DB_HOST
    DB_USER
    DB_NAME
    DB_PASS
    DB_PORT
    BASE_URL
    PORT
    TARGET_URL = ('your frontend url')
    SECRET_KEY = ('secret key for JWT')
    EMAIL_HOST = ('smtp google')
    EMAIL_PORT
    EMAIL_SECURE = TRUE
    EMAIL_MAILER
    EMAIL_PASSWORD
    CLOUD_NAME = ('your cloudinary cloud name')
    CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET

## Contact

My Email : mricopratamaputra@gmail.com

Project Related:
- [Frontend](https://github.com/MochamadRicoPratamaPutra/Blanja-FrontEnd)
- [Backend](https://github.com/MochamadRicoPratamaPutra/Backend-Blanja)
