
const main = document.getElementById("main")
const searchBar = document.getElementById("searchbar")
const searchList = document.getElementById("searchlist")
const pickedList = document.getElementById("pickedlist")
const barChart = document.getElementById("barchart")

searchList.innerHTML = ``
pickedList.innerHTML = ``

let all = ["horny", "racist", "based", "cringe"]
let picked = []
let resultsObj = {

    "horny": [],
    "racist": [],
    "based": [],
    "cringe": []

}

function getAverage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }
  

let animeJson

axios.get('https://raw.githubusercontent.com/nefarkitti/anime-test/main/animes.json').then(res => {
    let jsonData = res.data // should be json by default

    animeJson = jsonData

    search()

}).catch(console.error)

searchBar.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("searchbtn").click();
    }
});

function rate() {

    if (picked.length < 5) return;

    main.classList.add("result")

    picked.forEach(anime=>{

        resultsObj.horny.push(anime.horny)
        resultsObj.racist.push(anime.racist)
        resultsObj.based.push(anime.based)
        resultsObj.cringe.push(anime.cringe)

        document.getElementById("final").innerHTML += `
        <span>${anime.name}</span>
        `

    })

    barChart.innerHTML = ``

    all.forEach(ranking=>{

        let average = getAverage(resultsObj[ranking])

        barChart.innerHTML += `
        <div class="barItem">

                    <div class="bar">
                        <div class="barFill" style="height: ${average*100}%;">${Math.floor(average*100)}%</div>
                    </div>
                    <span class="title">${ranking.toUpperCase()}</span>

                </div>
        `

    })

    console.log(resultsObj)

}

function addToPicked(indx) {

    if (picked.length >= 5) return;

    let found = false

    picked.forEach(anime=>{
        if (anime.name == animeJson[indx].name) {
            found = true
            return
        }
    })

    if (found) return
    
    picked.push(animeJson[indx])

    updatePicked()
}

function removeFromPicked(indx) {

    picked.splice(indx, 1)

    updatePicked()

}

function updatePicked() {

    pickedList.innerHTML = ``

    let indx = 0

    picked.forEach(anime=>{

        pickedList.innerHTML += `
        <div class="animeItem" onclick="removeFromPicked(${indx})">
            <img src="assets/anime/${anime.image}" alt="">
            <span>${anime.name}</span>
        </div>
    `

        indx++

    })

}

function search() {

    searchList.innerHTML = ``

    let indx = 0

    animeJson.forEach(anime => {

        if (anime.name.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1) {
    
            searchList.innerHTML += `
                <div class="animeItem" onclick="addToPicked(${indx})">
                    <img src="assets/anime/${anime.image}" alt="">
                    <span>${anime.name}</span>
                </div>
            `
    
        }

        indx++
        
    });

}