// Test Files
// const latestfile = "json/newswire.json";
// const popularfile = "json/most-pop.json";
// const foodfile = "json/food.json";
// const opinionfile = "json/opinion.json";

// API Test
// const latestfile = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=bMoWWsjXxQi8PP8DJFeehGHuIXd1dRcu";
// const popularfile = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=bMoWWsjXxQi8PP8DJFeehGHuIXd1dRcu";
// const foodfile = "https://api.nytimes.com/svc/topstories/v2/food.json?api-key=bMoWWsjXxQi8PP8DJFeehGHuIXd1dRcu";
// const opinionfile = "https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=bMoWWsjXxQi8PP8DJFeehGHuIXd1dRcu";

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
    for (let i = 0; i < 5; i++){
        const article = articles[i];
        const articleContainer = document.createElement('article');
        const imageContainer = document.createElement('img');
        const anchorContainer = document.createElement('a');
        const authorContainer = document.createElement('p');

        if (i === 0){
            articleContainer.style.width = '21rem';
            articleContainer.style.height = 'auto';
        }
        // Set up image
        imageContainer.src = getImage(article);

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
    updateData(data.results, root, kind);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(window.innerWidth);
});
