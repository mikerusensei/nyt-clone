function getImage(article){
    if (article.multimedia && article.multimedia.length > 0){
        return article.multimedia[0].url;
    }   
    return '';
}

export function adjustArticles(articles, root, kind){
    const windowWidth = window.innerWidth;
    let childCount = root.children.length;

    let target = 0;

    const data = [
        {size: 425, articleNum: 3},
        {size: 768, articleNum: 5},
        {size: 1024, articleNum: 5},
        {size: 1440, articleNume: 8},
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
            const imgDiv = document.createElement('div');
            const txtDiv = document.createElement('div');
            const imageContainer = document.createElement('img')
            const titleContainer = document.createElement('a');
            const authorContainer = document.createElement('p');
            const imageUrl = getImage(article);

            imgDiv.setAttribute('class', 'img-div');
            txtDiv.setAttribute('class', 'text-div');

            titleContainer.href = article.url;
            titleContainer.innerHTML = article.title;

            authorContainer.innerHTML = article.byline;

            if (kind === 'popular'){
                articleContainer.appendChild(titleContainer);
                articleContainer.appendChild(authorContainer);

                root.appendChild(articleContainer);
            }else{
                if (imageUrl){
                    imageContainer.src = imageUrl;
                }else{
                    imageContainer.src = 'https://res.cloudinary.com/dzmhkee5i/image/upload/c_scale,h_75,w_75/nyt-clone/jjyajof6l8qkaprtldxx.jpg'
                }

                imgDiv.appendChild(imageContainer);
                txtDiv.appendChild(titleContainer);
                txtDiv.appendChild(authorContainer);

                articleContainer.appendChild(imgDiv);
                articleContainer.appendChild(txtDiv);

                root.appendChild(articleContainer);

            }
        }
    } else if (childCount > target){
        while (childCount > target){
            root.lastChild.remove();
            childCount--;
        }
    }
}

export function displayArticles(articles, root, kind){
    if (root.hasChildNodes()){
        root.removeChild(root.firstElementChild);
    }

    let loopLength = 0;
    let windowWidth = window.innerWidth;

    if (kind === 'popular'){
        if (windowWidth <= 425){
            loopLength = 3;
        }else if (windowWidth <= 768){
            loopLength = 5;
        }else if (windowWidth <= 1024){
            loopLength = 5;
        }else if (windowWidth <= 1440){
            loopLength = 8;
        }else if (windowWidth <= 2000){
            loopLength = 12;
        }
        else{
            loopLength = 12;
        }
    }else if (kind === 'latest'){
        loopLength = 8;
    }else if (kind === 'world'){
        loopLength = 10;
    }else if (kind === 'business'){
        loopLength = 10;
    }else if (kind === 'health'){
        loopLength = 10;
    }else if (kind === 'sports'){
        loopLength = 10;
    }else if (kind === 'science'){
        loopLength = 10;
    }
    else{
        loopLength = 6;
    }

    for (let i = 0; i < loopLength; i++){
        const article = articles[i];
        const articleContainer = document.createElement('article');
        const imageContainer = document.createElement('img');
        const imgDiv = document.createElement('div');
        const txtDiv = document.createElement('div');
        const titleContainer = document.createElement('a');
        const authorContainer = document.createElement('p');
        const imageUrl = getImage(article);

        imgDiv.setAttribute('class', 'img-div');
        txtDiv.setAttribute('class', 'text-div');

        titleContainer.href = article.url;
        titleContainer.innerHTML = article.title;

        authorContainer.innerHTML = article.byline;

        if (kind === 'popular'){
            if (i === 0){
                articleContainer.style.width = '21rem';
            }
            articleContainer.appendChild(titleContainer);
            articleContainer.appendChild(authorContainer);

            root.appendChild(articleContainer);

        }else{
            if (imageUrl){
                imageContainer.src = imageUrl;
            }else{
                imageContainer.src = 'https://res.cloudinary.com/dzmhkee5i/image/upload/c_scale,h_75,w_75/nyt-clone/jjyajof6l8qkaprtldxx.jpg'
            }

            imgDiv.appendChild(imageContainer);
            txtDiv.appendChild(titleContainer);
            txtDiv.appendChild(authorContainer);

            articleContainer.appendChild(imgDiv);
            articleContainer.appendChild(txtDiv);

            root.appendChild(articleContainer);
        }
        
    }
}