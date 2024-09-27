import { adjustArticles, displayArticles } from "./utils";

// Test Files
const latestfile = "json/newswire.json";
const popularfile = "json/most-pop.json";
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
    // await fetchDelay(foodfile, foodStories, 'food');
}

async function fetchDelay(file, root, kind){
    displayFetching(root);
    await new Promise(function(resolve){
        setTimeout(resolve, 12000);
    });
    await getData(file, root, kind);
}

function displayFetching(root){
    const div = document.createElement('div');
    div.innerHTML= 'Fetching data please wait';

    root.appendChild(div);

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
    createElements(dynamicContent, contentSection, 'main-content','popular');
    createElements(dynamicContent, contentSection, 'main-content','latest');
    createElements(dynamicContent, contentSection, 'side-content', 'opinion');
})

var contentSection = document.createElement('section');

function createElements(root, section, sectionKind,kind){
    const sectionIntialized = document.getElementById('main-content');

    if (sectionIntialized && sectionKind === 'side-content'){
        section = document.createElement('section');
    }

    if (sectionKind === 'main-content'){
        section.id = 'main-content';
    }else if (sectionKind === 'side-content'){
        section.id = 'side-content'
    }

    const content = document.createElement('div');
    const article = document.createElement('main');

    if (kind === 'popular'){
        const header = document.createElement('header');
        const title = document.createElement('p');
        header.setAttribute('class', 'header-container');
        content.setAttribute('class', 'popular-content');
        article.setAttribute('id', 'popular-article');
        title.innerHTML = 'Popular Articles';
        header.appendChild(title);
        content.appendChild(header);
    } else if (kind === 'latest'){
        const header = document.createElement('header');
        const title = document.createElement('p');
        header.setAttribute('class', 'header-container');
        content.setAttribute('class', 'latest-content');
        article.setAttribute('id', 'latest-article');
        title.innerHTML = 'Latest News';
        header.appendChild(title);
        content.appendChild(header);
    } else if (kind === 'opinion'){
        content.setAttribute('class', 'opinion-content');
        article.setAttribute('id', 'opinion-article');
    }

    displayArticles(cache[kind], article, kind);

    
    content.appendChild(article);
    section.appendChild(content);
    root.appendChild(section);
}

world.addEventListener('click', function(){
    dynamicContent.innerHTML = '';
    dynamicContent.style.flexDirection = 'column';
    if (cache['world']){
        displayArticles(cache['world'], dynamicContent, 'world')
    }else{
        displaySection('world');
    }
});
business.addEventListener('click', function(){
    dynamicContent.innerHTML = '';
    dynamicContent.style.flexDirection = 'column';
    if (cache['business']){
        displayArticles(cache['business'], dynamicContent, 'world')
    }else{
        displaySection('business');
    }
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
})
