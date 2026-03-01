fetch('./assets/footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer1').innerHTML = data;
});