# README #

Everytime I need to spawn a new NodeJS restful API it's a pain just to get down into the dirty and basics of it.
I'm not an evangelist, but I do take a good care of my implementations by reading all that's been around and try to apply what's best into my projects, and leaving what does not suit me.

In this NodeJS API 'bootstrap' I chose composition over inheritance. This choice was just a matter of trying to come out with a way that I could easily combine my routes in many different forms, without paying the price of inheriting what was not necessary. 

Here's a good reason why I chose it: [https://www.youtube.com/watch?v=wfMtDGfHWpA](https://www.youtube.com/watch?v=wfMtDGfHWpA)

I've been applying that concept in my personal projects and I think it finally became the way of putting together a bunch of different routes into one single element without having to go through the hassle of creating too many layers of abstraction.

After all, the whole idea of this project is to provide a simple way, and not complicate things.

The folder distribution I chose was inspired in the RoR's way of working with controllers and models. Being a model named as singular noum, and a controller a plural noum version of its counterpart model.

Then, on top of the controllers, I've added one aggregating 'class'. They are my way of 'connecting' as many controllers as I'd like in as many ways I might need. 

Some might hate it, some might love it.

If you find any value in contributing to this repo, be my guest.


Here's what I've implemented (of features) so far:


##Using Socket##
I've created a minimalist project in AngularJS just to show how to get connected with the socket layer of this implementation. 


Here's the how to:[https://github.com/cfernandomaciel/nodejs-minimum-rest/blob/master/socket-client-example.tar.gz](https://github.com/cfernandomaciel/nodejs-minimum-rest/blob/master/socket-client-example.tar.gz)

##Using Basic Auth##
I've (so far) implemented basic authentication as a means of authenticating into the rest api


First you need to send at the body of your request both an email and a password hash:


IN AJAX:

```
#!javascript

var data = new FormData();
data.append("email", "your-email@domain.com");
data.append("password", "password-hash-you-have-typed");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://rest-api-ip:4000/api/v1/authenticate");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);
```



IN CURL:

```
#!bash

curl -X POST -H "Content-Type: multipart/form-data;" -F "email=your-email@domain.com" -F "password=password-hash-you-have-typed" "http://rest-ip-ip:4000/api/v1/authenticate"
```


If everything went accordingly, you will receive something like so:


```
#!json

{
  "success": true,
  "message": "Enjoy your token!",
  "token": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28"
  
}
```


Then at your client app, you will store that token, for that's what you are going to use henceforth.
So you can access the rest api like so:


AJAX:

```
#!javascript

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://rest-api-ip:4000/api/v1/users"); //accessing the users route for instance
xhr.setRequestHeader("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);
```




IN CURL:

```
#!curl

curl -X GET -H "x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28" "http://10.0.3.34:4000/api/v1/users"
```
