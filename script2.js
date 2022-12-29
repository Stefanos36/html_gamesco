
import superHeroes from './superherous.json' assert {type:'json'};

import ulohy from './testotazky.json' assert {type: 'json'};
console.log(superHeroes);
populate()

async function populate() {

    //prerobit na lokal
   /* const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();
*/

    //superHeroes je json file

   // populateHeader(superHeroes);
   // populateHeroes(superHeroes,ako);
    zigga(ulohy);
  //  ['obtiaznost'][0]['otazka'][0]["moznosti"][0]["class"]
   // obtiaznost[0].otazka[0].moznosti[0].class

  //  vyberaj_otazky(ulohy)
    //randOtazky(ulohy)

}

function zigga(jsvstup){

       // const body = document.querySelector('dragable-elements');



        const boxmoznosti1 = document.getElementById("dragele1");
        const boxmoznosti2 = document.getElementById("dragele2");
        const boxmoznosti3 = document.getElementById("dragele3");

        var boxmoznosti=[boxmoznosti1,boxmoznosti2,boxmoznosti3]
        let arrayotazok =[];
        randOtazky(jsvstup,arrayotazok);
        //

        var prehodbox=0
        for(var otazkaid of arrayotazok){
            console.log("test for of ",otazkaid);


            //chcem zobrat a nacitat zopar udajov odtial
            //  console.log( jsvstup.obtiaznost[0].otazka[0].moznosti[0].class)
            //vytvor div v body s danou classou?

            //.classList.add("resetNigga");
            // classList
            const mylol = document.createElement('i');
            //  mylol.textContent= "test textu";

            //nepojde to takto, treba zobrat ten text a postupne ho tam dat
            //  mylol.classList.add( jsvstup.obtiaznost[0].otazka[0].moznosti[0].class);

            let text= jsvstup.obtiaznost[0].otazka[otazkaid].moznosti[0].class;
            const myArray = text.split(" ");
            for (const cast of myArray){
                // console.log(cast);
                mylol.classList.add(cast);
            }
            mylol.style.color = jsvstup.obtiaznost[0].otazka[otazkaid].moznosti[0].color;


            mylol.draggable =true;
            //  boxmoznosti.appendChild(mylol);

            const skratka = jsvstup.obtiaznost[0].otazka[otazkaid].moznosti;
            console.log("skratka ",skratka);
            var a=0;
            for (var a=0; a<skratka.length;a++){

                console.log(  skratka[a].class)
                console.log(  skratka[a].color)
                //chcem vytvorit pre kazdy novy div ci co jebnut ho tam
                const vizualhtml = document.createElement('i');
                vizualhtml.style.color = skratka[a].color;

                //pridanie vsetkych class co maju
                let text = skratka[a].class;
                const myArray = text.split(" ");
                for (const classa of myArray){
                    // console.log(cast);
                    vizualhtml.classList.add(classa);
                }
                vizualhtml.draggable =true;

                boxmoznosti[prehodbox].appendChild(vizualhtml);
            }


            prehodbox++;
        }



    }

    //funkcia co naahodne vylosuje z otazok a
    //vstup moze byt aj array a ten sa zamiesa
    function randOtazky(jsvstup,arrayotazok){
        console.log("pocet otazok ",jsvstup.obtiaznost[0].otazka.length)
       // let arrayotazok =[];
    for (var a=0;a<jsvstup.obtiaznost[0].otazka.length;a++){
        arrayotazok[a]=a;

    }
    console.log(arrayotazok);

        //chcem zamiesat otazky
        shuffle(arrayotazok);
        console.log("zamiesaj ",arrayotazok);

    }

    //vytahuj otazky z poradia
    function vyberaj_otazky(jsvstup){
        let arrayotazok =[];
        randOtazky(jsvstup,arrayotazok)


    }


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);


    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(myPara);
}

function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj.members;
    console.log(heroes)

    for (const hero of heroes) {
        console.log(hero);
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = 'Superpowers:';

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);



    }
}