const accessKey = 'IsGmpPArcgzDOElQf8cs7ESPnZ9u5oezJyK8h5ztsbg';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page=1;
// Function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
    if (pageNo == 1) {
    imagesContainer.innerHTML = ''; // Clear previous results
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            imagesContainer.innerHTML = `<h2>No image found </h2>`;
            return;
        }

        data.results.forEach(photo => {
            //Creating Image div
            const imageElement = document.createElement('div');
            imageElement.classList.add('image');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

            //Creating overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            //Creating overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;

            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);

            imagesContainer.appendChild(imageElement);
        });

        if (data.total_pages === pageNo){
            loadMoreBtn.style.display = "none";
        }

        else{
            loadMoreBtn.style.display = "block";
        }
    } catch (error) {
        imagesContainer.innerHTML = `<h2>An error occurred while fetching images. Please try again later.</h2>`;
        console.error('Error fetching images:', error);
    }
};

// Adding event listener to the search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page=1;
        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
        if(loadMoreBtn.style.display === "block")
            loadMoreBtn.style.display = "none";
    }
});

//Adding event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () =>{
    fetchImages(searchInput.value.trim(), ++page);
});