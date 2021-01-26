a = document.querySelector("#main")
answer = []
counter = 0
bonReponse = 0
TotalReponses = 0
paragraphCounter = 0
const mainFunction = (nb_questions) => {
    a.innerHTML = ""
    fetch(`https://opentdb.com/api.php?amount=${nb_questions}`)
        .then((response) => response.json())
        .then((data) => {
            obj = data
            for (let i in obj.results) {
                answer = []
                answer.push(obj.results[i].correct_answer, obj.results[i].incorrect_answers)
                answer = answer.flat()
                randomTab(answer)
                a.innerHTML += `
                    <div class="card mb-3 container" data-aos="fade-up-right">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted col-6">${obj.results[i].category}</h3>
                            <h5 class="card-title">${obj.results[i].question}</h5>
                            <p class="correct-answer"></p>
                            <div class ="question row d-flex justify-content-around w-85" id= ${counter}></div>
                        </div>
                    </div>`
                for (let j = 0; j < answer.length; j++) {
                    document.querySelectorAll(".question")[i].innerHTML += `
                            <div class="col-5 mt-2 card mb-2 d-flex quizQuestion" onclick="reponse(${paragraphCounter},${i},${nb_questions})">
                                <p class ="card-text  align-self-start" id='quizQuestion${counter}'>${parseInt(j)+1}) ${answer[j]}</p>
                            </div>
                        `
                    paragraphCounter++
                }
                counter++
            }
            for (let n = 0; n < document.querySelectorAll(".quizQuestion").length; n++) {
                document.querySelectorAll(".quizQuestion")[n].id = `i${n}`
                document.querySelectorAll(".quizQuestion")[n].addEventListener("mouseover", () => { mousenter(`#i${n}`) })
                document.querySelectorAll(".quizQuestion")[n].addEventListener("mouseout", () => { mouseLeave(`#i${n}`) })
                document.querySelectorAll(".quizQuestion")[n].addEventListener("click", () => { document.querySelectorAll(".quizQuestion")[n] = "" })
            }
        })
}
const randomTab = (arr) => {
    var rand, str
    for (let i in arr) {
        rand = Math.floor(Math.random() * (arr.length))
        str = arr[i]
        arr[i] = arr[rand]
        arr[rand] = str
    }
    return arr
}

const reponse = (index, obj_index, nb_question) => {

    if (document.querySelectorAll(".quizQuestion")[index].children[0].textContent.slice(3) == obj.results[obj_index].correct_answer) {
        console.log(true)
        bonReponse++
        document.querySelectorAll(".quizQuestion")[index].classList.remove("card")
        document.querySelectorAll(".quizQuestion")[index].classList.add("right-answer")
        document.querySelectorAll(".quizQuestion")[index].classList.add("right-answer")

        document.querySelectorAll(".correct-answer")[obj_index].textContent = `Well done, good answer !`
        document.querySelectorAll(".correct-answer")[obj_index].style = "font-weight:bold; color:green;"

        anime({
            targets: '.correct-answer',
            translateX: 30,
            direction: 'alternate',
            loop: false,
            delay: function(el, i, l) {
                return i * 100;
            },
            endDelay: function(el, i, l) {
                return (l - i) * 100;
            }
        });
    } else {
        console.log(false)
        document.querySelectorAll(".quizQuestion")[index].classList.remove("card")
        document.querySelectorAll(".quizQuestion")[index].classList.add("false-answer")
        document.querySelectorAll(".correct-answer")[obj_index].textContent = `The right answer : ${obj.results[obj_index].correct_answer}`
        document.querySelectorAll(".correct-answer")[obj_index].style = "font-weight:bold; color:red"

    }
    quizReponseCollection = document.querySelectorAll(".quizQuestion")[index].parentElement.children
    for (let j = 0; j < quizReponseCollection.length; j++) {
        quizReponseCollection[j].removeAttribute("onclick")
        quizReponseCollection[j].classList.add("champClicked")
    }

    TotalReponses++
    if (TotalReponses == nb_question) {
        modal.style.display = "block"
        document.querySelector("#result").textContent = `Your score is ${bonReponse}/${nb_question}`
        document.querySelector("#replay").innerHTML = '<button class ="btn btn-secondery"onclick="reload()">Replay</button>'
        document.querySelector(".modal-content").setAttribute("data-aos", "flip-down")
        document.querySelector(".modal-content").setAttribute("data-aos-easing", "ease-out-cubic")
        document.querySelector(".modal-content").setAttribute("data-aos-duration", "1000")
        AOS.init()
    }

}

document.querySelector("#btn-submit").addEventListener("click", () => {
    mainFunction(document.querySelector('.form-control').value);
    anime({
        targets: '#main',
        translateX: -30,
        delay: anime.stagger(100, { from: 'center' })
    });

})
document.querySelector("#btn-submit").addEventListener("mouseover", () => { mousenter("#btn-submit") })
document.querySelector("#btn-submit").addEventListener("mouseout", () => { mouseLeave("#btn-submit") })


// Animation
const mousenter = (target) => {
    anime({
        targets: [this, target],
        whidth: '100%',
        scale: {
            delay: 200,
            value: 1.1
        },
        duration: 1500,
    });
}
const mouseLeave = (target) => {
    anime({
        targets: target,
        whidth: '100%',
        scale: {
            delay: 200,
            value: 1
        },
        duration: 1500,
    });
}

const reload = () => {
    document.location.reload()
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let animation = anime({
    targets: '.letter',
    opacity: 1,
    translateX: 50,
    rotate: {
        value: 360,
        duration: 2000,
        easing: 'easeInExpo'
    },
    delay: anime.stagger(100, { start: 1000 }),
    translateX: [-10, 30]
});











//document.querySelector("#main").addEventListener("scroll", AOS.init())

/*
const form_animation = () => {
    if (l_animation.began == false) {
        l_animation.play()
    }
    l_animation.finished.then(() => {
        document.querySelector("#btn-submit").addEventListener("click", () => { l_animation.reset() })
    })
}
*/


/*
let cta_button_show = anime({
    targets: ['#btn-submit'],
    translateY: ['-15', '0'],
    opacity: ['0', '1'],
    easing: 'easeInOutSine',
    delay: anime.stagger(200),
    autoplay: false,
    // loop: false
    duration: 500,
    complete: function() {}
});

let cta_button_hide = anime({
    targets: ['#btn-submit'],
    translateY: ['0', '-15'],
    opacity: ['1', '0'],
    easing: 'easeInOutSine',
    delay: anime.stagger(200),
    autoplay: false,
    // loop: false
    duration: 500,
    complete: function() {
        slideup.play();
        drawer_open = true;
    }
});

function show_hideCTA(param) {
    document.querySelector(".cta-button").style.display = param;
    document.querySelector(".cta-text")
}

*/