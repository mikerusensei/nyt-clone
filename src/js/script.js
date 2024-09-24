// Test Files
const latestfile = "json/newswire.json";
const popularfile = "json/most-pop.json";
const foodfile = "json/food.json";
const opinionfile = "json/opinion.json";

// API Test
// onst key = process.env.PARCEL_NYT_API;
// const latestfile = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${key}`;
// const popularfile = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`;
// const foodfile = `https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${key}`;
// const opinionfile = `https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${key}`;

let articlesRead;

// Containers
const popStories = document.getElementById('popular-article');
const latestNews = document.getElementById('latest-article');
const foodStories = document.getElementById('food-article');
const opinionArticle = document.getElementById('opinion-article');

// Read
getData(popularfile, popStories, 'popular');
getData(latestfile, latestNews, 'latest');
getData(foodfile, foodStories, 'food');
getData(opinionfile, opinionArticle, 'opinion');

function getImage(article){
    if (article.multimedia && article.multimedia.length > 0){
        return article.multimedia[0].url;
    }   
    return null;
}
function loopPopular(articles, root){
    let loopLength;
    if (window.innerWidth == 768){
        loopLength = 8;
    }else if (window.innerWidth === 1024){
        loopLength = 11;
    }else{
        loopLength = 5;
    }

    for (let i = 0; i < loopLength; i++){
        const article = articles[i];
        const articleContainer = document.createElement('article');
        // const imageContainer = document.createElement('img');
        const anchorContainer = document.createElement('a');
        const authorContainer = document.createElement('p');

        if (i === 0){
            articleContainer.style.width = '21rem';
            articleContainer.style.height = 'auto';
        }
        // Set up image
        // imageContainer.src = getImage(article);

        // Set up title anchor
        anchorContainer.href = article.url;
        anchorContainer.innerHTML = article.title;

        // Set up author
        authorContainer.innerHTML = article.byline;

        // Add the children to the container
        // articleContainer.appendChild(imageContainer);
        articleContainer.appendChild(anchorContainer);
        articleContainer.appendChild(authorContainer);

        // Add the container to the root
        root.appendChild(articleContainer);
    }
}
function loopLatest(articles, kind, root){
    let loopLength;

    if (kind === 'latest'){
        loopLength = 10;
    }else{
        loopLength = 3;
    }

    for (let i = 0; i < loopLength; i++){
        const article = articles[i];
        const articleContainer = document.createElement('article');
        const imgDiv = document.createElement('div');
        const txtDiv = document.createElement('div');
        const imageContainer = document.createElement('img');
        const anchorContainer = document.createElement('a');
        const authorContainer = document.createElement('p');
        
        // Set Attri
        imgDiv.setAttribute('class', 'img-div');
        txtDiv.setAttribute('class', 'text-div');

        // Set up image
        const imageUrl = getImage(article);
        if (imageUrl){
            imageContainer.src = imageUrl;
        }else{
            imageContainer.src = 'https://res.cloudinary.com/dzmhkee5i/image/upload/c_scale,h_75,w_75/nyt-clone/jjyajof6l8qkaprtldxx.jpg';
        }

        // Set up title anchor
        anchorContainer.href = article.url;
        anchorContainer.innerHTML = article.title;

        // Set up author
        authorContainer.innerHTML = article.byline;

        // Append the Children/Element
        imgDiv.appendChild(imageContainer);
        txtDiv.appendChild(anchorContainer);
        txtDiv.appendChild(authorContainer);

        articleContainer.appendChild(imgDiv);
        articleContainer.appendChild(txtDiv);

        // Add the container to the root
        root.appendChild(articleContainer);
    }
}
function adjustArticles(articles, root){
    const windowWidth = window.innerWidth;
    let childCount = root.children.length;

    let target = 0;
    console.log(childCount);

    const data = [
        {size: 425, articleNum: 5},
        {size: 768, articleNum: 8},
        {size: 1024, articleNum: 11}
        
    ]

    for (const key in data){
        const windowSize = data[key].size;
        const articleNums = data[key].articleNum;

        if (windowWidth <= windowSize){
            target = articleNums;
            break;
        }
    }

    if (childCount < target){
        for (let i = childCount; i < target; i++){
            const article = articles[i];
            const articleContainer = document.createElement('article');
            const anchorContainer = document.createElement('a');
            const authorContainer = document.createElement('p');

            // Set up title anchor
            anchorContainer.href = article.url;
            anchorContainer.innerHTML = article.title;

            // Set up author
            authorContainer.innerHTML = article.byline;

            // Add the children to the container
            // articleContainer.appendChild(imageContainer);
            articleContainer.appendChild(anchorContainer);
            articleContainer.appendChild(authorContainer);

            root.appendChild(articleContainer);
        }
    } else if (childCount > target){
        while (childCount > target){
            root.lastChild.remove();
            childCount--;
        }
    }
}

function updateData(articles, root, kind){
    if (kind === 'popular'){
        loopPopular(articles, root);
    }else{
        loopLatest(articles, kind, root);
    }
}

async function getData(file, root, kind) {
    const result = await fetch(file);
    const data = await result.json();
    articlesRead = data.results;
    updateData(articlesRead, root, kind);
}

window.addEventListener('resize', function(){
    adjustArticles(articlesRead, popStories);
})