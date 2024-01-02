// 3 hw 
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone_input');
    const phoneButton = document.getElementById('phone_button');
    const phoneResult = document.getElementById('phone_result');

    phoneButton.addEventListener('click', function () {
        const phoneNumber = phoneInput.value.trim();
        if (isValidPhoneNumber(phoneNumber)) {
            phoneResult.textContent = 'Valid phone number';
            phoneResult.style.color = 'green';
        } else {
            phoneResult.textContent = 'Invalid phone number';
            phoneResult.style.color = 'red';
        }
    });

    function isValidPhoneNumber(phone) {
        const phonePattern = /^\+996\d{9}$/;
        return phonePattern.test(phone);
    }
});
// 3 

const tabContBlock = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentIndex = 0;

const hideTabContent = () => {
    tabContBlock.forEach(tabCard => {
        tabCard.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex = 0) => {
    tabContBlock[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
    currentIndex = tabIndex;
}

const changeSlide = () => {
    currentIndex = (currentIndex + 1) % tabs.length;
    hideTabContent();
    showTabContent(currentIndex);
}

const slideInt = setInterval(changeSlide, 3000);
hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                clearInterval(slideInt);
                hideTabContent();
                showTabContent(tabIndex);
                slideInt.setInterval(changeSlide, 3000); 
            }
        })
    }
}

// 5 hw 

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Не удалось получить данные:', error);
        return null;
    }
};

const convertCurrency = async (element, targetElement, current, data) => {
    try {
        if (!data) {
            throw new Error('Данные для конвертации недоступны');
        }

        switch (current) {
            case 'som':
                usd.value = (element.value / data.usd).toFixed(2);
                eur.value = (element.value / data.eur).toFixed(2);
                break;
            case 'usd':
                som.value = (element.value * data.usd).toFixed(2);
                eur.value = (element.value / data.eur).toFixed(2);
                break;
            case 'eur':
                if (targetElement === som) {
                    som.value = (element.value * data.eur).toFixed(2);
                    usd.value = (element.value * data.eur / data.usd).toFixed(2);
                } else if (targetElement === usd) {
                    usd.value = (element.value / data.eur).toFixed(2);
                    som.value = (element.value * data.eur / data.usd).toFixed(2);
                }
                break;
            default:
                break;
        }
        if (element.value === '') {
            som.value = '';
            usd.value = '';
            eur.value = '';
        }
    } catch (error) {
        console.error('Ошибка конвертации:', error);
    }
};

const handleInputChange = async (element, targetElement, current) => {
    const data = await fetchData();
    if (data) {
        convertCurrency(element, targetElement, current, data);
    }
};

som.addEventListener('input', () => {
    handleInputChange(som, usd, 'som');
});

usd.addEventListener('input', () => {
    handleInputChange(usd, som, 'usd');
});

eur.addEventListener('input', () => {
    handleInputChange(eur, som, 'eur');
    handleInputChange(eur, usd, 'eur');
});


// 6 hw

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let countCard = 1;

const fetchCardData = (cardNumber) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
        .then(response => response.json())
        .then((data)=>{
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
            console.log(data);
        });
};

const handleNextClick = () => {
    countCard = (countCard % 200) + 1;
    fetchCardData(countCard);
};

const handlePrevClick = () => {
    countCard = (countCard === 1) ? 200 : countCard - 1;
    fetchCardData(countCard);
};

fetchCardData(countCard);

btnNext.addEventListener('click', handleNextClick);
btnPrev.addEventListener('click', handlePrevClick);


const fetchAndDisplayPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
        });
};

fetchAndDisplayPosts();

//

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Замените на свой API ключ от OpenWeatherMap
    const searchBtn = document.querySelector('.searchBtn');
    const cityNameInput = document.querySelector('.cityName');
    const citySpan = document.querySelector('.city');
    const tempSpan = document.querySelector('.temp');

    searchBtn.addEventListener('click', async function() {
        const cityName = cityNameInput.value.trim();
        if (cityName !== '') {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('Город не найден');
                }
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Ошибка:', error);
                citySpan.textContent = 'Город не найден';
                tempSpan.textContent = '';
            }
        }
    });

    function displayWeather(data) {
        citySpan.textContent = data.name;
        tempSpan.textContent = `Температура: ${data.main.temp}°C`;
    }
});

//

