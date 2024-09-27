import { adjustArticles, displayArticles } from "./utils";

// Test Files
// const latestfile = "json/newswire.json";
// const popularfile = "json/most-pop.json";
// const opinionfile = "json/opinion.json";

// API Test
const key = process.env.PARCEL_NYT_API;
const latestfile = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${key}`;
const popularfile = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`;
const opinionfile = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${key}`;

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
let doneFetching = false;

// Cache Var
// var popularCache;
// var latestCache;
// var foodCache;
// var opinionCache;

const cache = {};

makeFetch();

async function getData(file, root, kind) {
    try{
        const result = await fetch(file);
        const data = await result.json();
        updateData(data.results, root, kind);
        cache[kind] = data.results;
    } catch{
        displayErrorFetch(root);
    }
}

// Read
async function makeFetch(){
    await fetchDelay(popularfile, popStories, 'popular');
    await fetchDelay(latestfile, latestNews, 'latest');
    await fetchDelay(opinionfile, opinionArticle, 'opinion');
    // await getData(popularfile, popStories, 'popular');
    // await getData(latestfile, latestNews, 'latest');
    // await getData(opinionfile, opinionArticle, 'opinion');
    doneFetching = true;
}

async function fetchDelay(file, root, kind){
    try{
        displayFetching(root);
        await new Promise(function(resolve){
            setTimeout(resolve, 12000);
        });
        await getData(file, root, kind);
    }catch{
        displayErrorFetch(root);
    }
}

function displayFetching(root){
    const div = document.createElement('div');
    div.innerHTML= 'Fetching data please wait';

    root.appendChild(div);

}

function displayErrorFetch(root){
    root.innerHTML = '';

    const div = document.createElement('div');
    div.innerHTML= 'Error fetching data please reload the page';

    root.appendChild(div);
}

function displaySection(section){
    const file = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${key}`;
    dynamicContent.innerHTML = '';
    dynamicContent.style.flexDirection = 'row';
    dynamicContent.style.flexWrap= 'wrap';
    dynamicContent.style.justifyContent= 'center';

    fetchDelay(file, dynamicContent, section);
}

function updateData(articles, root, kind){
    displayArticles(articles, root, kind);
}

// event listeners
logo.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching');
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style = null;
        createElements(dynamicContent, 'main-content','popular');
        createElements(dynamicContent, 'main-content','latest');
        createElements(dynamicContent, 'side-content', 'opinion');
    }
})

function createElements(root, sectionKind, kind) {
    let existingSection;

    if (sectionKind === 'main-content') {
        existingSection = document.getElementById('main-content');
        if (!existingSection) {
            existingSection = document.createElement('section');
            existingSection.id = 'main-content';
            root.appendChild(existingSection);
        }
    } else {
        existingSection = document.getElementById('side-content');
        if (!existingSection) {
            existingSection = document.createElement('section');
            existingSection.id = 'side-content';
            root.appendChild(existingSection);
        }
    }

    const content = document.createElement('div');
    const article = document.createElement('main');

    if (kind === 'popular') {
        const header = document.createElement('header');
        const title = document.createElement('p');
        header.setAttribute('class', 'header-container');
        content.setAttribute('class', 'popular-content');
        article.setAttribute('id', 'popular-article');
        title.innerHTML = 'Popular Articles';
        header.appendChild(title);
        content.appendChild(header);
    } else if (kind === 'latest') {
        const header = document.createElement('header');
        const title = document.createElement('p');
        header.setAttribute('class', 'header-container');
        content.setAttribute('class', 'latest-content');
        article.setAttribute('id', 'latest-article');
        title.innerHTML = 'Latest News';
        header.appendChild(title);
        content.appendChild(header);
    } else if (kind === 'opinion') {
        content.setAttribute('class', 'opinion-content');
        article.setAttribute('id', 'opinion-article');
    }

    displayArticles(cache[kind], article, kind);
    
    content.appendChild(article);

    existingSection.appendChild(content);
}

world.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching')
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style.flexDirection = 'row';
        dynamicContent.style.flexWrap = 'wrap';
        dynamicContent.style.justifyContent= 'center';

        if (cache['world']){
            displayArticles(cache['world'], dynamicContent, 'world')
        }else{
            displaySection('world');
        }
    }
});
business.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching')
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style.flexDirection = 'row';
        dynamicContent.style.flexWrap = 'wrap';
        dynamicContent.style.justifyContent= 'center';

        if (cache['business']){
            displayArticles(cache['business'], dynamicContent, 'world')
        }else{
            displaySection('business');
        }
    }
});
health.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching')
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style.flexDirection = 'row';
        dynamicContent.style.flexWrap = 'wrap';
        dynamicContent.style.justifyContent= 'center';

        if (cache['health']){
            displayArticles(cache['health'], dynamicContent, 'world')
        }else{
            displaySection('health');
        }
    }
});
sports.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching')
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style.flexDirection = 'row';
        dynamicContent.style.flexWrap = 'wrap';
        dynamicContent.style.justifyContent= 'center';

        if (cache['sports']){
            displayArticles(cache['sports'], dynamicContent, 'world')
        }else{
            displaySection('sports');
        }
    }
});
science.addEventListener('click', function(){
    if (!doneFetching){
        window.alert('Not done fetching')
    }else{
        dynamicContent.innerHTML = '';
        dynamicContent.style.flexDirection = 'row';
        dynamicContent.style.flexWrap = 'wrap';
        dynamicContent.style.justifyContent= 'center';

        if (cache['science']){
            displayArticles(cache['science'], dynamicContent, 'world')
        }else{
            displaySection('science');
        }
    }
});

window.addEventListener('resize', function(){
    const container = document.getElementById('popular-article')
    adjustArticles(cache['popular'], container, 'popular');
})
