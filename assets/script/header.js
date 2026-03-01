fetch('./assets/header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header1').innerHTML = data;
});