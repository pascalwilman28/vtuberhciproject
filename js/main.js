// video-slider
const videos = [
    "./assets/videos/video-slider1.mp4",
    "./assets/videos/video-slider2.mp4",
    "./assets/videos/video-slider3.mp4"
];
const thumbnails = [
    "./assets/img/video_thumbnail/thumbnail_1.jpg",
    "./assets/img/video_thumbnail/thumbnail_2.jpg",
    "./assets/img/video_thumbnail/thumbnail_3.jpg",
];

let video_container = "";
videos.forEach((value, index) => {
    video_container += `<li class="video" id="content${index}"><video width="80%" controls="controls" poster="${thumbnails[index]}" onended="next()"><source src="${value}" type="video/mp4"></video></li>`;
});

const video_slider = $(".videos");
video_slider.html(video_container);

//display video pertama
document.querySelector(".video").style.display = "block";

// setting semua video by default jadi 0.2 volumenya
$("video").prop("volume", 0.3);


let currentVideo = 0;

function stopVideo() {
    $("#content" + currentVideo)
        .fadeOut(1000)
        .css("display", "none");
    $("#content" + currentVideo + " video").get(0).pause();
    $("#content" + currentVideo + " video").get(0).currentTime = 0;
}

function playVideo() {
    $("#content" + currentVideo)
        .fadeIn(1000)
        .css("display", "block");
    $("#content" + currentVideo + " video").get(0).play();
}

//tunggu animasi transisi video selesai, baru bisa pindah video lagi
function waitVideoLoading() {
    $(".slider-container button").prop("disabled", true);
    setTimeout(function() {
       $(".slider-container button").prop("disabled", false);
    }, 1000);
}

$(".slider-container button").on("click", waitVideoLoading);

function next() {
    stopVideo();
    currentVideo = (currentVideo + 1) % videos.length;
    playVideo();
    moveSliderDot();
}

function prev() {
    stopVideo();
    currentVideo = (videos.length + currentVideo - 1) % videos.length;  //ditambah karna kalo minus gabisa
    playVideo();
    moveSliderDot();
}

let sliderDots = $(".slider-dot button");
function moveSliderDot() {
    // console.log($(".slider-dot button"));
    sliderDots.each(function(x) {
        $(this).css("background", "transparent");
        // $(".slider-dot button:nth-child(" + (num + 1) + ")").css("background", "transparent");
    });
    // $(".slider-dot button:nth-child(" + (currentVideo + 1) + ")").css("background", "transparent");
    $(".slider-dot button:nth-child(" + (currentVideo + 1) + ")").css("background", "#f67381");
}

function dot(num) {
    stopVideo();
    currentVideo = num;
    playVideo();
    moveSliderDot();
}