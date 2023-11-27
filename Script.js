let Edulinks = document.querySelectorAll(".Edu-links")
let EduContent = document.querySelectorAll(".Edu-content")
let SMPbtn = document.querySelector(".btn");
let workTab = document.querySelectorAll(".work");
let menubtn = document.querySelector(".fa-bars");
let cancelbtn = document.querySelector(".fa-xmark");
let submitbtn = document.getElementById("submit");
Edulinks[0].addEventListener("click", function () {
    Edulinks[1].classList.remove("active-now")
    Edulinks[0].classList.add("active-now")
    EduContent[1].classList.remove("active-tab")
    EduContent[0].classList.add("active-tab")
})
Edulinks[1].addEventListener("click", function () {
    Edulinks[0].classList.remove("active-now")
    Edulinks[1].classList.add("active-now")
    EduContent[0].classList.remove("active-tab")
    EduContent[1].classList.add("active-tab")
})
SMPbtn.addEventListener("click", function () {
    setTimeout(() => {
        workTab.forEach(function (element, index) {
            workTab[index].classList.add("active-work")
        });
        SMPbtn.style.display = "none"

    }, 200);

})
menubtn.addEventListener('click', function () {
    document.getElementById("menuTab").style.right = "0px"
    document.getElementById("menuTab").style.transition = "1s"
    document.getElementById("cancel").style.display = "block"
    document.getElementById("menuTab").classList.add("show")
    menubtn.style.display = "none"
    cancelbtn.style.display = "block"
});
cancelbtn.addEventListener('click', function () {
    menubtn.style.display = "block"
    cancelbtn.style.display = "none"
    document.getElementById("menuTab").classList.remove("show")
    document.getElementById("menuTab").style.right = "-300px"
    document.getElementById("menubtn").style.display = "block"
});
document.querySelector(".doMail").addEventListener("click", () => {
    var email = "1mehtogautam@gmail.com";
    location.href = "mailto:" + email;
})

const scriptURL = 'https://script.google.com/macros/s/AKfycby7VovtedCAzrUTKhUrmsCMlhPjbWTgP9WYnjO8_xe3NmJ2_W-jFO2niUL80RvO9IJb/exec'
const form = document.forms['submit-to-google-sheet']
let sentMessage = document.getElementById("sentMessage");
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log(`Success! ${response}`)
            sentMessage.innerText = "Message Sent Successfully"
            setTimeout(() => {
                sentMessage.innerText = ""
            }, 5000);
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})