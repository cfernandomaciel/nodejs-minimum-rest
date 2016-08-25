# README #

##Utilização do Socket##
Criei um projetinho minimalista em AngularJS para mostrar na pratica como despachar mensagens via socket e como receber mensagens via socket:

Baixar tutorial aqui:[https://bitbucket.org/cfernandomaciel/restful-meanbiz/downloads/socket-client-example.tar.gz](https://bitbucket.org/cfernandomaciel/restful-meanbiz/downloads/socket-client-example.tar.gz)

##Utilização do Basic Auth##
Segue um tutorial de como utilizar o x-auth-token que eu implementei la no rest:


Voce envia no body do request um campo de email e um de password:
Sempre lembrando que o teu client deverá ter uma rotina pra guardar no banco de dados o hash e nao o password da parada, blz?
Então, quando for fazer o login, ele tbm dispara o hash do que for digitado no campo senha. ok?

EM AJAX:

```
#!javascript

var data = new FormData();
data.append("email", "claudio.fernando@gmail.com");
data.append("password", "hash-do-que-vc-digitou-como-password");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://teu-ip-do-teu-rest:4000/api/v1/authenticate");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);
```



EM CURL:

```
#!bash

curl -X POST -H "Content-Type: multipart/form-data;" -F "email=claudio.fernando@gmail.com" -F "password=hash-do-que-vc-digitou-como-password" "http://ip-do-teu-rest:4000/api/v1/authenticate"
```


Você deverá receber um response assim:


```
#!json

{
  "success": true,
  "message": "Enjoy your token!",
  "token": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28"
  
}
```




Você deverá guardar o token no teu client system para utilizar ele sempre à partir dali.
Então, você poderá acessar isso assim:

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

xhr.open("GET", "http://teu-ip-do-teu-rest:4000/api/v1/users");
xhr.setRequestHeader("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);
```




EM CURL:

```
#!curl

curl -X GET -H "x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xhdWRpby5mZXJuYW5kb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InNwaXR6MDEiLCJpYXQiOjE0NzIwODUxODcsImV4cCI6MTQ3MjA4NTI3M30.oZ5CQb5ZW-BherYWHk7BqhC1yh6tAszks0TFZ0abi28" "http://10.0.3.34:4000/api/v1/users"
```