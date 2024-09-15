const file = "test-json.json";
const root = document.getElementById('content');
const date_div = document.getElementById('date');

// fetch(file)
//     .then(result => result.json())
//     .then(data => {
//         console.log(data.results);
//         data.results.forEach(item => {
//             console.log(item)
//         });
//     })
getDate();

async function getDate() {
    let today = new Date();
    let day = today.getDay();
    let weekdays = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let month = today.getMonth();
    let months = new Array('January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
    let date = today.getDate();
    let year = today.getFullYear();

    let current_day;

    current_day = weekdays[day] + ', ' + months[month - 1] + ' ' + date + ', ' + year

    const h1_date = document.createElement('h1');
    h1_date.innerText = current_day;
    date_div.appendChild(h1_date);
    console.log(current_day);
}

getFile(file)

async function getFile(file) {
    let result = await fetch(file);
    let data = await result.json();
    let items_arr = await data.results;
    items_arr.forEach(item => {
        // console.log(item)
        let title = item.title;
        // console.log(title)

        const h1 = document.createElement('h1');
        h1.innerText = title;
        root.appendChild(h1);
    })

}