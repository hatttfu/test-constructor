body.onclick = changeColorAnswer

let cards = document.querySelector('.cards')
let name = document.getElementById('name')
let checkBtn = document.getElementById("check-button")

getData()


function getData() {

    if (document.querySelector('.data-container').dataset.data) {
        let data = document.querySelector('.data-container').dataset.data

        data = JSON.parse(data)
        console.log(data)

        makeCards(data)

        checkBtn.onclick = function(event) {
            event.preventDefault()

            let d = checkTest()[0]

            console.log(d)
            
            if(d){
                countPoints(data)
                
            }
            else {
                console.log('Modal should open') 
                $('#modal').modal('show')
            }
        }
    }

}

function changeColorAnswer(event) {
    if (event.target.classList.contains('answer-click')) {
        let answersContainer = event.target.closest('.answers-container')

        let answers = Array.from(answersContainer.children)
        
        answers.forEach(answer => {

                let div = answer.querySelector('.answer-click')
                div.classList.remove('hovered-textarea')
            
        })

        event.target.classList.add('hovered-textarea')
    }
}

function makeCards(data) {
    
    name.innerHTML = data[0]
    let html = ``
    for (let key in data) {
        if (key > 0) {
            console.log(data[key])
            html += toHTML(data[key], key)
        }
    }

    cards.innerHTML = html

}

function toHTML(element, number) {
    let question = element.question

    let answers = element.answers

    return `
        <div class="card-container">
            <div class="label">Вопрос ${number}</div>
            <div class="card">
                <div class="question-container mb-2">
                    ${question}
                </div>

                <div class="answers">
                    <div class="answers-container">
                        ${makeAnswers(answers)}
                    </div>


                </div>
            </div>
        </div>
    `
}

function makeAnswers(answers) {
    return answers.map(element => 
        `<div class="answer">
            <div class="answer-click form-control mt-2">${element}</div>
        </div>`
    ).join('')
}

function countPoints(data) {
    let friendName = document.querySelector('.name-friend').value


    let allAnswers = Array.from(document.querySelectorAll('.answers-container'))

    let total = (Array.from(document.querySelectorAll('.card'))).length

    let points = 0

    let id = 1

    allAnswers.forEach(answers => {
        let list = Array.from(answers.children)

        list = list.map(answer => answer.querySelector('.answer-click'))

        list = list.filter(element => element.classList.contains('hovered-textarea'))

        list = list.map(element => element.innerHTML)

        if(data[id].isTrue == list[0]) {
            points++
        }

        id++

    })


    console.log(points + '/' + total) 
    let results = {}

    const str = new URL(window.location.href)

    const path = str.pathname.split('')

    path.forEach(element => {
        if (element == "=") {
            let testId = getTestId(path.indexOf(element))
            console.log(testId)
            results.testId = testId

        }
    })

    function getTestId(index) {
        return (path.filter(element => path.indexOf(element) > index)).join('')
    }

    results.points = points
    results.total = total
    results.name = friendName
    results.title = name.innerHTML

    sendData(results)

    showResults(results)

    showCorrectAnswers(data)

}


//send points and name to flask

function sendData(data) {
    let xml = new XMLHttpRequest()
    xml.open("POST", "/results", true)

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xml.onload = function() {
        let dataReply = JSON.parse(this.responseText)
        сonsole.log(dataReply)
    }

    xml.send(JSON.stringify(data))
    console.log(JSON.stringify(data))
}

function showResults(results) {
    let picture = document.querySelector('.rotating-container')
    picture.classList.remove('hidden')
    document.querySelector('.name').classList.add('hidden')
    let gif = picture.querySelector('#reaction')
    gif.src = `../static/img/${getFolder(results)}/${randomGif()}.gif`    
    checkBtn.classList.add('hidden')
    let resultsBlock = document.querySelector('.results')
    resultsBlock.innerHTML = `<h3>Твой результат: <bold>${results.points}/${results.total}</bold></h3>`

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function randomGif() {
    return Math.ceil(Math.random() * 6)
}

function getFolder(results) {
    if((results.points)/(results.total) > 0.8) {
        return 'good'
    }
    else if((results.points)/(results.total) < 0.5) {
        return 'bad'
    }
    else {
        return 'notbad'
    }

}

function checkTest() {
    let name = document.querySelector('.name-friend')

    let cards = Array.from(document.querySelectorAll('.card'))


    
    if(name.value.length > 0) {
        console.log(name.value.length)
        console.log(cards)
        return cards.map(card => {
            // console.log(card)
            answers = Array.from(card.querySelector('.answers-container').children)
    
            list = []
            answers.map(answer => {
                list.push(answer.querySelector('.answer-click'))
            })

            // console.log(list)
    
            let textareas = list.filter(element => element.classList.contains('hovered-textarea'))
            console.log(textareas)

            if(textareas.length != 0) {
                console.log(textareas)
                return true
            }
            else{
                console.log('dkjnjk')
                return false
            }
        })
    }
    else {
        console.log(name.value.length)
        return false
    }
    
}


function showCorrectAnswers(data) {
    let cards = Array.from(document.querySelectorAll('.card'))

    let id = 1

    cards.map(card => {
        answers = Array.from(card.querySelector('.answers-container').children)

        answers = answers.map(answer => answer.querySelector('.answer-click'))

        answers.forEach(answer => {
            if(answer.innerHTML == data[id]['isTrue']){
                answer.classList.add('hovered-textarea')
            }
            if (answer.classList.contains('hovered-textarea')) {
                
                let selected = answer
                if(selected.innerHTML != data[id]['isTrue']){
                    answer.classList.remove('hovered-textarea')
                    answer.classList.add('wrong-selected')
                }
            }
        })
        
        id++

    })
}

