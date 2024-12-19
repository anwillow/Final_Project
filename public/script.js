let autoUpdateInterval;
let manualUpdateTimeout;
let manualTime = null;

// Функция для автоматического обновления времени
function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    if (!timeDisplay) return; // Если элемента нет, выходим из функции

    if (manualTime) {
        manualTime.setSeconds(manualTime.getSeconds() + 1);
    }

    const now = manualTime || new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Функция для включения автоматического обновления времени
function startAutoUpdateTime() {
    stopAutoUpdateTime(); // Убедимся, что предыдущий интервал остановлен
    autoUpdateInterval = setInterval(updateTime, 1000); // Запуск обновления
    updateTime(); // Первичное обновление времени
}

// Функция для остановки автоматического обновления времени
function stopAutoUpdateTime() {
    clearInterval(autoUpdateInterval); // Останавливаем интервал
}

// Запуск автоматического обновления времени при загрузке страницы
startAutoUpdateTime();

// Переключение между Dark Mode и Normal Mode
const darkModeBtn = document.getElementById('darkModeBtn');
const crazyMenuBtn = document.getElementById('crazyMenuBtn');
let isCrazyMenuActive = false;

// Список фонов для светлого режима
const backgrounds = [
    { time: 0, image: 'url("/images/night.jpg")' },
    { time: 6, image: 'url("/images/morning.jpg")' },
    { time: 10, image: 'url("/images/mid-morning.jpg")' },
    { time: 12, image: 'url("/images/mid-day.jpg")' },
    { time: 18, image: 'url("/images/evening.jpg")' },
    { time: 20, image: 'url("/images/mid-evening.jpg")' },
];


// Функция для обновления фона в зависимости от времени суток
function updateBackground() {
    const now = manualTime || new Date(); // Используем manualTime, если оно установлено
    const hour = now.getHours();
    let background = backgrounds[0].image; // Ночной фон по умолчанию

    for (let i = 0; i < backgrounds.length; i++) {
        if (hour >= backgrounds[i].time) {
            background = backgrounds[i].image;
        }
    }

    if (document.body.classList.contains('dark-mode')) {
        // Темный режим: черный фон
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#121212';
    } else {
        // Светлый режим: фон по времени
        document.body.style.backgroundImage = background;
        document.body.style.backgroundColor = ''; // Убираем черный фон
    }
}



// Вызываем функцию при загрузке страницы
updateBackground();

// Обновляем фон каждые 30 минут
setInterval(updateBackground, 1000); 

// Переключение режима Dark Mode
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateBackground(); // Обновляем фон при переключении
});

// Создаем кнопку остановки видео
const stopButton = document.createElement('button');
stopButton.textContent = 'Stop Video';
stopButton.style.position = 'absolute';
stopButton.style.top = '100px';
stopButton.style.left = '50%';
stopButton.style.transform = 'translateX(-50%)';
stopButton.style.padding = '10px 20px';
stopButton.style.background = '#e91e63';
stopButton.style.color = 'white';
stopButton.style.border = 'none';
stopButton.style.borderRadius = '5px';
stopButton.style.cursor = 'pointer';
stopButton.style.display = 'none'; // Изначально скрыта
document.body.appendChild(stopButton);

// Линия громкости
const volumeLine = document.createElement('div');
volumeLine.style.position = 'relative';
volumeLine.style.width = '100px';
volumeLine.style.height = '4px';
volumeLine.style.backgroundColor = '#e91e63';
volumeLine.style.margin = '35px auto'; // Центрируем под видео
volumeLine.style.transformOrigin = 'center';
volumeLine.style.cursor = 'pointer';
volumeLine.style.display = 'none'; // Изначально скрыта
document.body.appendChild(volumeLine);

// Отображение уровня громкости
const volumeDisplay = document.createElement('span');
volumeDisplay.style.position = 'relative';
volumeDisplay.style.display = 'block';
volumeDisplay.style.textAlign = 'center';
volumeDisplay.style.color = '#e91e63';
volumeDisplay.style.marginTop = '25px';
volumeDisplay.style.fontSize = '14px';
volumeDisplay.style.fontWeight = 'bold';
volumeDisplay.textContent = 'Volume: 50%'; // Начальный уровень громкости
volumeDisplay.style.display = 'none'; // Изначально скрыта
document.body.appendChild(volumeDisplay);

// Создаем кнопку изменения времени
const changeTimeButton = document.createElement('button');
changeTimeButton.textContent = 'Change Time';
changeTimeButton.style.position = 'absolute';
changeTimeButton.style.top = '9px';
changeTimeButton.style.left = '115px';
changeTimeButton.style.transform = 'none';
changeTimeButton.style.padding = '10px 20px';
changeTimeButton.style.background = '#4caf50';
changeTimeButton.style.color = 'white';
changeTimeButton.style.border = 'none';
changeTimeButton.style.borderRadius = '5px';
changeTimeButton.style.cursor = 'pointer';
changeTimeButton.style.display = 'none'; // Изначально скрыта
document.body.appendChild(changeTimeButton);

// Получаем элементы модальных окон и кнопок
const contactModal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const closeContactModal = document.getElementById('closeContactModal');

// Открытие модального окна для контактов
contactBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
});


// Закрытие модального окна для контактов
closeContactModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
});


// Закрытие модальных окон при клике вне содержимого
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
});

changeTimeButton.addEventListener('click', () => {
    const fakeHour = Math.floor(Math.random() * 24); // Случайный час (0-23)
    const fakeMinute = Math.floor(Math.random() * 60); // Случайная минута (0-59)
    const fakeSecond = Math.floor(Math.random() * 60); // Случайная секунда (0-59)

    manualTime = new Date(); // Устанавливаем ручное время
    manualTime.setHours(fakeHour, fakeMinute, fakeSecond);

    // Запускаем обновление времени
    startAutoUpdateTime(); 

    updateBackground(); // Обновляем фон вручную

    // Возврат к автоматическому времени через 30 секунд
    clearTimeout(manualUpdateTimeout); // Сбрасываем предыдущий таймер (если есть)
    manualUpdateTimeout = setTimeout(() => {
        manualTime = null; // Сбрасываем ручное время для использования системного времени
        startAutoUpdateTime(); // Возвращаем автоматическое обновление времени
    }, 30000);
});


// Обновление отображения кнопки в crazy menu
crazyMenuBtn.addEventListener('click', () => {
    if (isCrazyMenuActive) {
        changeTimeButton.style.display = 'block'; // Показываем кнопку
    } else {
        changeTimeButton.style.display = 'none'; // Скрываем кнопку
    }
});

// IDs видео
const normalVideoId = "KLuTLF3x9sA"; // Нормальное видео
const crazyVideoId = "dQw4w9WgXcQ"; // Rick Roll видео

// YouTube плеер
let player;

// Логика вращения линии громкости
let isDragging = false;
let currentAngle = 0;
const maxAngle = 90; // Ограничение вращения до ±90°

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            onReady: onPlayerReady,
        },
    });
}

// Когда плеер готов
function onPlayerReady(event) {
    player.loadVideoById(normalVideoId); // Загружаем нормальное видео

    // Crazy Menu функциональность
    // Crazy Menu функциональность
crazyMenuBtn.addEventListener('click', () => {
    isCrazyMenuActive = !isCrazyMenuActive;

    if (isCrazyMenuActive) {
        alert('Crazy Menu Activated!');
        volumeLine.style.display = 'block';
        volumeDisplay.style.display = 'block';
        stopButton.style.display = 'block';
        contactBtn.style.display = 'none';
        changeTimeButton.style.display = 'block';
        disableVideoInteractions();
        player.loadVideoById(crazyVideoId); // Загружаем Rick Roll
        player.playVideo();

        // Добавляем убегание кнопки
        stopButton.addEventListener('mousemove', moveStopButton);
    } else {
        alert('Crazy Menu Deactivated!');
        volumeLine.style.display = 'none';
        volumeDisplay.style.display = 'none';
        stopButton.style.display = 'none';
        contactBtn.style.display = 'block';
        changeTimeButton.style.display = 'none';
        enableVideoInteractions();
        player.loadVideoById(normalVideoId); // Возвращаем нормальное видео
        player.playVideo();

        // Убираем убегание кнопки
        stopButton.removeEventListener('mousemove', moveStopButton);
    }
});


    // Обработчик клика по кнопке Stop Video
    stopButton.addEventListener('click', () => {
        if (player) {
            player.pauseVideo(); // Ставим видео на паузу
        }
    });
}

// Управление громкостью через вращение линии
volumeLine.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = volumeLine.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Ограничиваем угол вращения
    currentAngle = Math.max(-maxAngle, Math.min(maxAngle, angle));

    volumeLine.style.transform = `rotate(${currentAngle}deg)`;
    const volume = Math.round((currentAngle + maxAngle) / (2 * maxAngle) * 100); // Преобразуем в громкость 0-100%
    volumeDisplay.textContent = `Volume: ${volume}%`; // Обновляем отображение громкости
    if (player && player.setVolume) {
        player.setVolume(volume); // Устанавливаем громкость
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    }
});

// Предотвращаем паузу при нажатии пробела
function preventSpacePause(event) {
    if (event.code === 'Space') {
        event.preventDefault();
    }
}

let targetX = 0;
let targetY = 0;
let isAnimating = false;

// Функция для обновления позиции кнопки
function updateButtonPosition() {
    const buttonRect = stopButton.getBoundingClientRect();
    const currentX = parseFloat(stopButton.style.left) || buttonRect.left;
    const currentY = parseFloat(stopButton.style.top) || buttonRect.top;

    // Проверка на границы экрана
    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;

    if (currentX < 0 || currentX > maxX || currentY < 0 || currentY > maxY) {
        // Телепортируем кнопку в случайное место
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        stopButton.style.left = `${randomX}px`;
        stopButton.style.top = `${randomY}px`;

        // Сбрасываем цель для движения
        targetX = randomX;
        targetY = randomY;
        isAnimating = false; // Сбрасываем флаг анимации
        return;
    }

    // Вычисляем разницу между текущими и целевыми координатами
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    // Если кнопка почти достигла цели, останавливаем анимацию
    if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
        stopButton.style.left = `${targetX}px`;
        stopButton.style.top = `${targetY}px`;
        isAnimating = false;
        return;
    }

    // Рассчитываем новые координаты для плавного движения
    const moveX = currentX + deltaX * 0.5; // 0.1 - скорость
    const moveY = currentY + deltaY * 0.5;

    stopButton.style.left = `${moveX}px`;
    stopButton.style.top = `${moveY}px`;

    // Продолжаем анимацию
    requestAnimationFrame(updateButtonPosition);
}

// Функция для обработки движения кнопки
function moveStopButton(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const buttonRect = stopButton.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    const deltaX = buttonX - mouseX;
    const deltaY = buttonY - mouseY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2) || 1;

    // Целевые координаты для кнопки
    targetX = buttonRect.left + (deltaX / distance) * 150;
    targetY = buttonRect.top + (deltaY / distance) * 150;

    // Ограничиваем координаты в пределах окна
    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;

    if (targetX < 0) targetX = 0;
    if (targetX > maxX) targetX = maxX;
    if (targetY < 0) targetY = 0;
    if (targetY > maxY) targetY = maxY;

    // Запускаем анимацию, если она ещё не идёт
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateButtonPosition);
    }
}


// Отключение взаимодействия с плеером
function disableVideoInteractions() {
    document.getElementById('player').style.pointerEvents = 'none';
    window.addEventListener('keydown', preventSpacePause);
}

// Включение взаимодействия с плеером
function enableVideoInteractions() {
    document.getElementById('player').style.pointerEvents = 'auto';
    window.removeEventListener('keydown', preventSpacePause);
}

// Загрузка YouTube API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
