var images = new Array("資料/po1.png","資料/po2.png","資料/po3.png","資料/po4.png","資料/po5.png","資料/po6.png","資料/po7.png","資料/po8.png","資料/po9.png","資料/po11.png","資料/po12.png");
var currentImageIndex = 0;
var headerElement = document.getElementById("top");
var prevBotton = document.getElementById("sc-to-left");
var nextBotton = document.getElementById("sc-to-right");

function showImage(){
    document.getElementById("pic").src = images[currentImageIndex];
}

function prevImage(){
    currentImageIndex--;
    if(currentImageIndex < 0){
        currentImageIndex = images.length -1;
    }
    showImage();
}

function nextImage(){
    currentImageIndex++;
    if(currentImageIndex >= images.length){
        currentImageIndex = 0;
    }
    showImage();
}

function autoNextImage(){
    nextImage();
}

setInterval(autoNextImage,5000);
showImage();