let body = document.getElementById('body')

body.onmouseover = body.onmouseout = changeColor
body.addEventListener('click', changeIcon)
body.addEventListener('click', manageAnswer)
body.addEventListener('click', addQuestion)

let id = 1

function changeColor(event) {
    if (event.target.classList.contains('fa-circle')) {
        const answer =  event.target.closest('.answer')
        const answerText = answer.querySelector('.textarea')
        answerText.classList.toggle('hovered-textarea')
    }
}

function changeIcon(event) {
    if (event.target.classList.contains('fa-circle')) {
        const answer = event.target.closest('.answer')
        const div =  answer.querySelector('.toggle')
        const textarea =  answer.querySelector('.textarea')

        removeSelections(event)
        
        div.innerHTML = '<i class="fas fa-check-circle"></i>'
        textarea.classList.add('hovered-textarea')
    }
}

function removeSelections(event) {
    const answers =  event.target.closest('.answers')
    const btns = answers.querySelectorAll('.toggle')
    const textareas = answers.querySelectorAll('.textarea')

    btns.forEach(btn => btn.innerHTML = '<i class="far fa-circle"></i>')
    textareas.forEach(textarea => textarea.classList.remove('hovered-textarea'))
}

function manageAnswer(event) {
    if(event.target.classList.contains('add-answer')) {
        addAnswer(event)
    }
    if(event.target.classList.contains('fa-minus-circle')) {
        removeAnswer(event)
    }
}

function addAnswer(event) {

    const answers = event.target.closest('.answers')
    const answersContainer = answers.querySelector('.answers-container')

    let answer = document.createElement('div')
    answer.classList.add('answer')

    let toggle = document.createElement('div')
    toggle.classList.add('toggle')
    toggle.innerHTML = `<i class="far fa-circle"></i>`

    let textarea = document.createElement('textarea')
    textarea.classList.add('textarea', 'answer-text', 'form-control')
    textarea.style.rows = 3
    textarea.style.maxlength = 160
    textarea.style.minlength = 3
    textarea.style.placeholder = "Вариант ответа"

    let deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`

    answer.append(toggle)
    answer.append(textarea)
    answer.append(deleteBtn)

    answersContainer.append(answer)

}

function removeAnswer(event) {
    const answer = event.target.closest('.answer')
    const answersContainer = event.target.closest('.answers-container')
    answersContainer.removeChild(answer)
}

function addQuestion(event) {
    if(event.target.classList.contains('add-card')) {
        id += 1
        const container = event.target.closest('.container')
        const cards = container.querySelector('.cards')

        cards.append(createCard(id))

    }
}

function createCard(id) {
    let cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')

    let label = document.createElement('div')
    label.classList.add('label')
    label.innerHTML = `Вопрос ${id}`

    let card = document.createElement('div')
    card.classList.add('card')

    let question = document.createElement('textarea')
    question.classList.add('form-control', 'question')
    question.setAttribute('id', 'question')
    question.style.rows = 3
    question.style.maxlength = 160
    question.style.minlength = 3
    question.style.placeholder = "Введите свой вопрос"

    let small = document.createElement('div')
    small.classList.add('small')

    let length = document.createElement('div')
    length.classList.add('length')
    length.innerHTML = '44/160'

    small.append(length)

    let answers = document.createElement('div')
    answers.classList.add('answers')

    let answersContainer = document.createElement('div')
    answersContainer.classList.add('answers-container')

    let addBtn = document.createElement('div')
    addBtn.classList.add('add-button')

    let btn = document.createElement('button')
    btn.classList.add('btn', 'add-answer')
    btn.innerHTML = 'Добавить ответ'
    btn.type = 'button'

    addBtn.append(btn)

    let answer = document.createElement('div')
    answer.classList.add('answer')

    let toggle = document.createElement('div')
    toggle.classList.add('toggle')
    toggle.innerHTML = `<i class="far fa-circle"></i>`

    let textarea = document.createElement('textarea')
    textarea.classList.add('textarea', 'answer-text', 'form-control')
    textarea.style.rows = 3
    textarea.style.maxlength = 160
    textarea.style.minlength = 3
    textarea.style.placeholder = "Вариант ответа"

    let deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`

    answer.append(toggle)
    answer.append(textarea)
    answer.append(deleteBtn)

    answersContainer.append(answer)
    answersContainer.append(answer)
    answersContainer.append(answer)

    answers.append(answersContainer)
    answers.append(addBtn)

    card.append(question)
    card.append(small)
    card.append(answers)

    cardContainer.append(label)
    cardContainer.append(card)

    return cardContainer
}


const sendBtn = document.getElementById('send-button')

if(sendBtn){
    sendBtn.addEventListener('click', sendHandler)
}

function sendHandler(event) {
    event.preventDefault()

    if(checkFields()[0]) {
        let data = makeJSON()

        sendJSON(data)

    }
    else {
        console.log('Modal should open') 
        $('#modal').modal('show')
    }

}

//validation 
function checkFields() {
    let cards = Array.from(document.querySelectorAll('.card'))

    return cards.map(card => {
        question = card.querySelector('#question')
        answers = Array.from(card.querySelector('.answers-container').children)


        if(question.value) {
            
            values = answers.filter(answer => answer.value == '')

            if (values.length != 0) {
                return false
            }
            else {
                if(checkCorrects(answers)){
                    if(answers.length != 0) {
                        return true
                    }
                    else {
                        return false
                    }
                    
                }
                else {
                    return false
                }
                
            }   
        }
        else {      

            return false

        }

    })  
}

function checkCorrects(answers) {
    list = []
    answers.map(answer => {
        list.push(answer.querySelector('.textarea'))
    })

    let textareas = list.filter(element => element.classList.contains('hovered-textarea'))
    if(textareas.length != 0) {
        return true
    }
    else{
        return false
    }
}

//making JSON
function makeJSON() {
    let test = []

    let name = document.querySelector('.test-name')

        name.value == '' 
            ? test.push('Безымянный') 
            : test.push(name.value) 

    let cards = Array.from(document.querySelectorAll('.card'))

    cards.forEach(card => {
        let data = {}

        let question = card.querySelector('.question')

        let answers = Array.from(card.querySelectorAll('.answer-text'))

        data.question = question.value

        let isTrue = getTrueAnswer(answers)
        
        answers = answers.map(answer => answer.value)
        data.answers = answers

        data.isTrue = isTrue

        test.push(data)

        console.log(data)

    })
    console.log(test)

    test = Object.assign({}, test)
    console.log(test)

    return test
}

function getTrueAnswer(answers) {
    const result = answers.filter(answer => answer.classList.contains('hovered-textarea'))
    console.log(result)
    return result[0].value
}

function sendJSON(dataSend) {
    let xml = new XMLHttpRequest()
    xml.open("POST", "/send", true)

    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xml.onload = function() {
        let dataReply = JSON.parse(this.responseText)

        let testId = dataReply.test_id
        console.log(dataReply)
        createLink(testId)

    }

    xml.send(JSON.stringify(dataSend))
    console.log(JSON.stringify(dataSend))
}

function createLink(testId) {
    let url = window.location.origin
    let linkDiv = document.querySelector('.link')
    body.setAttribute('id', 'send-link')
    linkDiv.classList.remove('hidden')
    let instructions = document.querySelector('.instructions')
    instructions.classList.add('hidden')
    let form = document.querySelector('.form')
    form.classList.add('hidden')
    linkDiv.innerHTML = '<a href="'+ url + '/test/id=' + testId + '">Ссылка на твой тест!</a>'
}




