filter("all");  //by default semuanya ditampilkan

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const options = document.querySelectorAll(".gen-option");

//untuk open and close options-container setelah klik 
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

//untuk close options-container kalau klik yang lain
window.onclick = function(event) {
    if (optionsContainer.classList.contains("active") &&
        !event.target.matches(".selected")) {
            optionsContainer.classList.remove("active");
    }
}

//untuk replace text di selected dan close options-container
options.forEach(i => {
    i.addEventListener("click", () => {
        selected.innerHTML = i.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    })
});

//function untuk setelah memilih kategori di select-box
function filter(category) {
    var talent;
    talent = document.getElementsByClassName("talent-profile");
    Array.from(talent).forEach(t => {
        t.classList.remove("show");
        if (category == "all" || t.classList.contains(category)) {
            t.classList.add("show");
        }
    });
}