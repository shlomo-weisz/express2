var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/javascript");

var raw = "{id: 'NEW'; title: 'new book'}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

let res = fetch("http://localhost:3000/books", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


console.log(res);  