const card = document.querySelector('.cards')

async function fetchData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Ошибка получения данных:', error)
    }
}

function createCard(title, description) {
    const card = document.createElement('div')
    card.classList.add('card')

    const cardTitle = document.createElement('h3')
    cardTitle.textContent = title

    const cardDescription = document.createElement('p')
    cardDescription.textContent = description

    card.appendChild(cardTitle)
    card.appendChild(cardDescription)

    return card
}

async function pushCard() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    const push = await fetchData(apiUrl)

    if (push) {
        push.forEach(push => {
            const newCard = createCard(push.title, push.body)
            card.appendChild(newCard)
        })
    }
}

pushCard()