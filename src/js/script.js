import { adjustArticles, displayArticles } from "./utils";

// Test Files
const latestfile = "json/newswire.json";
const popularfile = "json/most-pop.json";
const foodfile = "json/food.json";
const opinionfile = "json/opinion.json";

// API Test
const key = process.env.PARCEL_NYT_API;
// const latestfile = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${key}`;
// const popularfile = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`;
// const foodfile = `https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${key}`;
// const opinionfile = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${key}`;

// Containers
const popStories = document.getElementById('popular-article');
const latestNews = document.getElementById('latest-article');
const foodStories = document.getElementById('food-article');
const opinionArticle = document.getElementById('opinion-article');
const dynamicContent = document.getElementById('content-section');

// Nav Links
const logo = document.getElementById('home');
const world = document.getElementById('world');
const business = document.getElementById('business');
const health = document.getElementById('health');
const sports = document.getElementById('sports');
const science = document.getElementById('science');

// Cache Var
// var popularCache;
// var latestCache;
// var foodCache;
// var opinionCache;

const cache = {};

makeFetch();

async function getData(file, root, kind) {
    console.log(file)
    const result = await fetch(file);
    const data = await result.json();
    updateData(data.results, root, kind);
    cache[kind] = data.results;
}

// Read
async function makeFetch(){
    await fetchDelay(popularfile, popStories, 'popular');
    await fetchDelay(latestfile, latestNews, 'latest');
    await fetchDelay(opinionfile, opinionArticle, 'opinion');
    await fetchDelay(foodfile, foodStories, 'food');
}

async function fetchDelay(file, root, kind){
    await getData(file, root, kind);

    await new Promise(function(resolve){
        setTimeout(resolve, 12000);
    })
}

function displaySection(section){
    const file = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${key}`;
    dynamicContent.innerHTML = '';
    dynamicContent.style.flexDirection = 'column';
    fetchDelay(file, dynamicContent, section);
}

function updateData(articles, root, kind){
    displayArticles(articles, root, kind);
}

// event listeners
logo.addEventListener('click', function(){
    dynamicContent.innerHTML = '';
    dynamicContent.style.flexDirection = null;
    createElements(dynamicContent, 'main-content','popular');
    createElements(dynamicContent, 'main-content','latest');
    createElements(dynamicContent, 'side-content', 'opinion');
    
})

function createElements(root, section,kind){
    root.innerHTML = '';
    let mainContent;
    if (section === 'main-content'){
        mainContent = document.createElement('section');
        mainContent.setAttribute('id', 'main-content');
    }else{
        mainContent = document.createElement('section');
        mainContent.setAttribute('id', 'side-content');
    }

    if (kind === 'popular'){
        const popContent = document.createElement('div');
        const headerContainer = document.createElement('header');
        const headerP = document.createElement('p')
        const popularArticle = document.createElement('main');

        popContent.setAttribute('class', 'popular-content');
        headerContainer.setAttribute('class', 'header-container');
        popularArticle.setAttribute('id', 'popular-article');

        headerP.innerHTML = 'Popular Articles';
        displayArticles(cache[kind], popularArticle, kind);

        headerContainer.appendChild(headerP);
        popContent.appendChild(headerContainer);
        popContent.appendChild(popularArticle);

        mainContent.appendChild(popContent);
    }else if (kind === 'latest'){
        const popContent = document.createElement('div');
        const headerContainer = document.createElement('header');
        const headerP = document.createElement('p')
        const popularArticle = document.createElement('main');

        popContent.setAttribute('class', 'latest-content');
        headerContainer.setAttribute('class', 'header-container');
        popularArticle.setAttribute('id', 'latest-article');

        headerP.innerHTML = 'Latest Articles';
        displayArticles(cache[kind], popularArticle, kind);

        headerContainer.appendChild(headerP);
        popContent.appendChild(headerContainer);
        popContent.appendChild(popularArticle);

        mainContent.appendChild(popContent);
    }else if (kind === 'opinion'){
        const popContent = document.createElement('div');
        const headerContainer = document.createElement('header');
        const popularArticle = document.createElement('main');

        popContent.setAttribute('class', 'opinion-content');
        popularArticle.setAttribute('id', 'opinion-article');

        displayArticles(cache[kind], popularArticle, kind);

        popContent.appendChild(headerContainer);
        popContent.appendChild(popularArticle);

        mainContent.appendChild(popContent);
    }else if (kind === 'food'){
        const popContent = document.createElement('div');
        const headerContainer = document.createElement('header');
        const headerP = document.createElement('p')
        const popularArticle = document.createElement('main');

        popContent.setAttribute('class', 'latest-content');
        headerContainer.setAttribute('class', 'header-container');
        popularArticle.setAttribute('id', 'latest-article');

        headerP.innerHTML = 'Food';
        displayArticles(cache[kind], popularArticle, kind);

        headerContainer.appendChild(headerP);
        popContent.appendChild(headerContainer);
        popContent.appendChild(popularArticle);

        mainContent.appendChild(popContent);
    }

    root.appendChild(mainContent);
}
world.addEventListener('click', function(){
    displaySection('world');
});
business.addEventListener('click', function(){
    displaySection('business');
});
health.addEventListener('click', function(){
    displaySection('health');
});
sports.addEventListener('click', function(){
    displaySection('sports');
});
science.addEventListener('click', function(){
    displaySection('science');
});

window.addEventListener('resize', function(){
    adjustArticles(cache['popular'], popStories, 'popular');
    // adjustArticles(latestCache, latestNews, 'latest');
})
