import { adjustArticles, displayArticles } from "./utils";

// Test Files
const latestfile = "json/newswire.json";
const popularfile = "json/most-pop.json";
const foodfile = "json/food.json";
const opinionfile = "json/opinion.json";

// API Test
// const key = process.env.PARCEL_NYT_API;
// const latestfile = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${key}`;
// const popularfile = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`;
// const foodfile = `https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${key}`;
// const opinionfile = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${key}`;

// Containers
const popStories = document.getElementById('popular-article');
const latestNews = document.getElementById('latest-article');
const foodStories = document.getElementById('food-article');
const opinionArticle = document.getElementById('opinion-article');

// Cache Var
var popularCache;
var latestCache;
var foodCache;
var opinionCache

makeFetch();

async function getData(file, root, kind) {
    const result = await fetch(file);
    const data = await result.json();
    updateData(data.results, root, kind);
    return data.results;
}

// Read
async function makeFetch(){
    popularCache = await getData(popularfile, popStories, 'popular');
    latestCache = await getData(latestfile, latestNews, 'latest');
    foodCache = await getData(foodfile, foodStories, 'food');
    opinionCache = await getData(opinionfile, opinionArticle, 'opinion');
}

function updateData(articles, root, kind){
    displayArticles(articles, root, kind);
}

window.addEventListener('resize', function(){
    adjustArticles(popularCache, popStories, 'popular');
    // adjustArticles(latestCache, latestNews, 'latest');
})
