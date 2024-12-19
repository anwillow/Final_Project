// Данные для мест
const placesData = {
    geirangerfjord: {
        images: [
            '/images/Geirangerfjord/geirangerfjord1.jpg',
            '/images/Geirangerfjord/geirangerfjord2.jpg',
            '/images/Geirangerfjord/geirangerfjord3.jpg',
        ],
        description: "Geirangerfjord is one of Norway's most visited fjords, known for its deep blue waters and stunning waterfalls.",
    },
    lofoten: {
        images: [
            '/images/Lofoten/lofoten1.jpg',
            '/images/Lofoten/lofoten2.jpg',
            '/images/Lofoten/lofoten3.jpg',
        ],
        description: "The Lofoten Islands are famous for their dramatic scenery, with towering mountains, open sea, and picturesque fishing villages.",
    },
    trolltunga: 
    {
        images: [
            '/images/Trolltunga/trolltunga1.jpg',
            '/images/Trolltunga/trolltunga2.jpg',
            '/images/Trolltunga/trolltunga3.jpg',
            '/images/Trolltunga/trolltunga4.jpg',
        ],
        description: "Trolltunga, or 'The Troll's Tongue,' is a dramatic rock formation that juts out over Lake Ringedalsvatnet, offering breathtaking views of the surrounding mountains and fjords. It is a must-visit for adventurers seeking a rewarding hike and a spectacular photo opportunity.",
    },
    preikestolen: 
    {
        images: [
            '/images/Preikestolen/preikestolen1.jpg',
            '/images/Preikestolen/preikestolen2.jpg',
            '/images/Preikestolen/preikestolen3.jpg',
            '/images/Preikestolen/preikestolen4.jpg',
        ],
        description: "Preikestolen, or 'Pulpit Rock,' is a famous cliff towering 604 meters above Lysefjord. Known for its flat top and panoramic views, it is one of Norway's most iconic hiking destinations, attracting visitors from around the globe.",
    },
    kjeragbolten: 
    {
        images: [
            '/images/Kjeragbolten/kjeragbolten1.jpg',
            '/images/Kjeragbolten/kjeragbolten2.jpg',
            '/images/Kjeragbolten/kjeragbolten3.jpg',
            '/images/Kjeragbolten/kjeragbolten4.jpg',
        ],
        description: "Kjeragbolten is a famous boulder wedged between two cliffs, suspended nearly 1,000 meters above the Lysefjord. It is a breathtaking sight and a thrilling photo spot for adventurous hikers who dare to stand on the rock.",
    },
    senja: 
    {
        images: [
            '/images/Senja/senja1.jpg',
            '/images/Senja/senja2.jpg',
            '/images/Senja/senja3.jpg',
            '/images/Senja/senja4.jpg',
        ],
        description: "Senja, often called 'Norway in Miniature,' is a stunning island known for its dramatic peaks, deep fjords, and picturesque fishing villages. It offers a perfect blend of natural beauty and traditional Norwegian charm.",
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalCloseButton = document.querySelector('.modal .close');

    if (modal) {
        modal.style.display = 'none';
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    const places = document.querySelectorAll('.place');
    if (places.length > 0) {
        places.forEach((place) => {
            place.addEventListener('click', () => {
                const placeId = place.getAttribute('data-place-id');
                showDetails(placeId);
            });
        });
    } else {
        console.warn('No places found on the page.');
    }
});

// Показать детали места
function showDetails(placeId) {
    const modal = document.getElementById('modal');
    const modalSlideshow = document.getElementById('modal-slideshow');
    const modalDescription = document.getElementById('modal-description');

    if (!placesData[placeId]) return;

    modalSlideshow.innerHTML = '';
    modalDescription.textContent = '';

    placesData[placeId].images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${placeId} Image ${index + 1}`;
        img.style.display = index === 0 ? 'block' : 'none';
        modalSlideshow.appendChild(img);
    });

    modalDescription.textContent = placesData[placeId].description;
    modal.style.display = 'flex';

    startSlideshow(modalSlideshow);
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Слайдшоу
function startSlideshow(slideshowElement) {
    const images = slideshowElement.querySelectorAll('img');
    if (images.length === 0) return;

    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    }, 3000);
}
