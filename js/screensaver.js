//load gambar logo
logo = new Image();
logo.src = './assets/logo/Virtual Talent Agency.png';

let interval = null;
let mouseTime = null;
const video = document.getElementsByTagName("video");   //get semua video di
let isVideoPlaying = new Array(false, false, false, false); //buat tandain tiap video lagi play atau engga
let allVideoIsPaused = true;    //awalnya semua video gaada yang play

//simpan value kalau video play atau engga ke isVideoPlaying
Array.from(video).forEach((v, idx) => {
    v.addEventListener("playing", function() {
        isVideoPlaying[idx] = true;
        allVideoIsPaused = false;
    });
    v.addEventListener("pause", function() {
        isVideoPlaying[idx] = false;
    })
})

//untuk cek ada video yang play atau semuanya ga play
function checkAllVideo() {
    var count = 0;
    isVideoPlaying.forEach((i) => {
        if (i == true) allVideoIsPaused = false;
        else count++;
    })
    if (count == video.length) allVideoIsPaused = true;
}

//untuk update time tiap ada pergerakan
function calculateTime() {
    mouseTime = performance.now();
}

//hitung waktu mouse/touch/keyboard
window.onload = function() {
    interval = setInterval(screensaver, 300);
    window.addEventListener('mousemove', calculateTime);
    window.addEventListener('mouseclick', calculateTime);
    window.addEventListener('mousedown', calculateTime);
    window.addEventListener('touchmove', calculateTime);
    window.addEventListener('keydown', calculateTime);
    window.addEventListener('keypress', calculateTime);
    window.addEventListener('keyup', calculateTime);
    calculateTime();
}

//untuk munculin screensaver
function screensaver() {
    checkAllVideo();

    if (mouseTime == null) return;
    
    //kalau diam > 10 detik dan ga lagi nonton video, munculin screensaver
    if (allVideoIsPaused && (performance.now() - mouseTime > 10000)) {
        let currTime = mouseTime;
        clearInterval(interval);

        //hide semua elemen biar canvasnya keliatan
        let header = document.getElementsByTagName("header")[0];
        let content = document.getElementById("content");
        let footer = document.getElementsByTagName("footer")[0];
        header.style.display = "none";
        content.style.display = "none";
        footer.style.display = "none";

        //display canvasnya
        let canvas = document.getElementById("canvas");
        canvas.removeAttribute("hidden");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let ctx = canvas.getContext('2d');

        let x = 100;
        let y = 100;

        let dx = 2;
        let dy = 2;
        
        let logoWidth;
        let logoHeight;

        let maxWidth = canvas.width;
        let maxHeight = canvas.height;
        
        //setting ukuran logo
        if (maxWidth < maxHeight) {
            logoWidth = Math.floor(0.3 * maxWidth);
            logoHeight = Math.floor(0.75 * logoWidth);
        } else {
            logoHeight = Math.floor(0.35 * maxHeight);
            logoWidth = Math.floor(1.33 * logoHeight);
        }

        requestAnimationFrame(display);
        
        function display() {
            ctx.clearRect(0, 0, maxWidth, maxHeight);
            ctx.fillStyle = "#03ced2";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(logo, x, y, logoWidth, logoHeight);

            x += dx;
            y += dy;

            if (x + logoWidth >= maxWidth || x <= 0) {
                dx *= -1;
            }
            
            if (y + logoHeight >= maxHeight || y <= 0) {
                dy *= -1;
            }

            //kalau mouseTime berubah berarti ada pergerakan, stop screensaver
            if (currTime != mouseTime) {
                //hide canvasnya
                interval = setInterval(screensaver, 500);
                canvas.setAttribute("hidden", true);

                //munculin lagi apa yang sebelumnya di-hide
                let header = document.getElementsByTagName("header")[0];
                let content = document.getElementById("content");
                let footer = document.getElementsByTagName("footer")[0];
                header.style.display = "block";
                content.style.display = "block";
                footer.style.display = "flex";  

                return;
            }
            
            requestAnimationFrame(display);
        }
    }
}