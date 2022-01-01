const body = document.getElementById('body')

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
    const answer = `
        <div class="answer">
            <div class="toggle"><i class="far fa-circle"></i></div>
            <textarea class="textarea form-control" rows="3" maxlength="160" minlength="3" placeholder="Вариант ответа"></textarea>
            <div class="delete"><i class="fas fa-minus-circle"></i></div>
        </div>
    `
    answersContainer.innerHTML += answer
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
        cards.innerHTML += `
            <div class="label">Вопрос ${id}</div>
            <div class="card">
                <textarea class="form-control" rows="3" maxlength="160" minlength="3" placeholder="Введите свой вопрос"></textarea>
                <div class="small">
                    <div class="length">44/160</div>
                </div>

                <div class="answers">
                    <div class="answers-container">
                        <div class="answer">
                            <div class="toggle"><i class="far fa-circle"></i></div>
                            <textarea class="textarea form-control" rows="3" maxlength="160" minlength="3" placeholder="Вариант ответа"></textarea>
                            <div class="delete"><i class="fas fa-minus-circle"></i></div>
                        </div>
                        <div class="answer">
                            <div class="toggle"><i class="far fa-circle"></i></div>
                            <textarea class="textarea form-control" rows="3" maxlength="160" minlength="3" placeholder="Вариант ответа"></textarea>
                            <div class="delete"><i class="fas fa-minus-circle"></i></div>
                        </div>
                        <div class="answer">
                            <div class="toggle"><i class="far fa-circle"></i></div>
                            <textarea class="textarea form-control" rows="3" maxlength="160" minlength="3" placeholder="Вариант ответа"></textarea>
                            <div class="delete"><i class="fas fa-minus-circle"></i></div>
                        </div>
                    </div>

                    <div class="add-button">
                        <button type="button" class="btn add-answer">Добавить ответ
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}

{/* <i class="fas fa-check-circle"></i> */}