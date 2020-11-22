// console.log(
//     "we are cconnected"
// );

let word = document.getElementById('text')
let option = document.getElementsByTagName('select')[0]

let search = document.getElementsByClassName('ol')[0];
let makeTableData = document.getElementById('insideBody')

let __showTable = document.getElementsByClassName('table')[0]






word.addEventListener('click', () => {
    __showTable.style.display = "none"
    makeTableData.innerHTML = ""
})




search.addEventListener('click', () => {

    if (navigator.onLine == true) {


        // makeTableData=""
        let insertedOptionis = 'en'
        // console.log(word.value, option.value);//for the debugging purpose
        if (option.value == 'hindi') {
            insertedOptionis = 'hi'
        }



        //creting a xml object

        if (word.value != "") {

            try {

                let xhr = new XMLHttpRequest()
                xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/${insertedOptionis}/${word.value}`, true)//method is get ,true for the asynchronous 

                xhr.onprogress = function () {//this will during the process time 
                    console.log('we are at progress ', this.readyState);
                }
                xhr.onload = function () {//after getting all the data
                    __showTable.style.display = "block"
                    if (this.readyState == 4 && this.status == 200) {
                        // console.log(this.responseText, this.responseURL, this.responseType);
                        let finalData = JSON.parse(this.responseText)
                        // for (i of JSON.parse(this.responseText)) {
                        //     // console.log(i);
                        // }
                        for (i in finalData) {
                            makeTableData.innerHTML += `        <tr>
                <th>${finalData[i].word}</th>
                <th>${finalData[i].meanings[0].partOfSpeech}</th>
                <th>${finalData[i].meanings[0].definitions[0].synonyms}</th>
                <th>${finalData[i].meanings[0].definitions[0].definition}</th>
                <th>${finalData[i].meanings[0].definitions[0].example}</th>
              
                </tr>`
                        }
                        // let str = `<h1> The word is : ${finalData[0].word} </h1><br><h3> Part Of Speech is ${finalData[0].meanings[0].partOfSpeech}`
                        // console.log(str);
                    }




                }



                xhr.send()



            }
            catch (err) {
                alert(err)
            }
        } else {
            alert("Please enter the word !")
        }
    }
    else {
        __showTable.style.display = "block"
        makeTableData.innerHTML = `        <tr>
    <th>Please</th>
    <th>Check</th>
    <th>Your </th>
    <th>Internet </th>
    <th>connection</th>
  
</tr>`
    }
})

// }

// else
// {
//     __showTable.style.display="block"
//     makeTableData.innerHTML +=`        <tr>
//     <th>Please</th>
//     <th>Check</th>
//     <th>Your </th>
//     <th>Internet </th>
//     <th>connection</th>

// </tr>`
// }