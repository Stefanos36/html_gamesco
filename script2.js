
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
        const boxmoznosti4 = document.getElementById("dragele4");
        const boxmoznosti5 = document.getElementById("dragele5");

        const odpovedbox1 = document.getElementById("drop1");
        const odpovedbox2 = document.getElementById("drop2");
        const odpovedbox3 = document.getElementById("drop3");
        const odpovedbox4 = document.getElementById("drop4");
        const odpovedbox5 = document.getElementById("drop5");

        //nahraju sa maznosti z jsnou
        var boxmoznosti=[boxmoznosti1,boxmoznosti2,boxmoznosti3, boxmoznosti4, boxmoznosti5 ];
        //z jsonu len nacita kolko odpovedovych boxov ma vytvorit
        var odpovedbox = [odpovedbox1,odpovedbox2, odpovedbox3, odpovedbox4, odpovedbox5];

        let arrayotazok =[];
        randOtazky(jsvstup,arrayotazok);
        //

        var prehodbox=0
        for(var otazkaid of arrayotazok){
            console.log("vybrata otazka ",otazkaid);

            //budem apendovat daco s co ma classu droppable - tolko krat kolko je v odovede
            //odpovedbox[prehodbox].appendChild()
            //nacitaj odpoved
            // ok nice ide, zlozitejsie otazku budu mat 1 alebo 2 odpovede idk
            console.log("pocet odpovedi ",jsvstup.obtiaznost[0].otazka[otazkaid].odpovede);
            //vytvor html element div

            for(var pocet =0; pocet<jsvstup.obtiaznost[0].otazka[otazkaid].odpovede; pocet++){

                const docasneHtmlodpoved = document.createElement('div');

                docasneHtmlodpoved.classList.add('droppable');
                //appendnut child do toho
                odpovedbox[prehodbox].appendChild(docasneHtmlodpoved)
            }



            //chcem zobrat a nacitat zopar udajov odtial
            //  console.log( jsvstup.obtiaznost[0].otazka[0].moznosti[0].class)
            //vytvor div v body s danou classou?

            //.classList.add("resetNigga");
            // classList
            const docasneHtml = document.createElement('i');
            //  docasneHtml.textContent= "test textu";

            //nepojde to takto, treba zobrat ten text a postupne ho tam dat
            //  docasneHtml.classList.add( jsvstup.obtiaznost[0].otazka[0].moznosti[0].class);

            let text= jsvstup.obtiaznost[0].otazka[otazkaid].moznosti[0].class;
            const myArray = text.split(" ");
            for (const cast of myArray){
                // console.log(cast);
                docasneHtml.classList.add(cast);
            }
            docasneHtml.style.color = jsvstup.obtiaznost[0].otazka[otazkaid].moznosti[0].color;




            docasneHtml.draggable =true;
            //  boxmoznosti.appendChild(docasneHtml);

            const skratka = jsvstup.obtiaznost[0].otazka[otazkaid].moznosti;
          //  console.log("skratka ",skratka);
            var a=0;
            for (var a=0; a<skratka.length;a++){

              //  console.log(  skratka[a].class)
              //  console.log(  skratka[a].color)
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
                vizualhtml.id= 'box_'+ prehodbox+'_'+ a;
               // vizualhtml.id= 'box'+ prehodbox;

                boxmoznosti[prehodbox].appendChild(vizualhtml);
            }


            prehodbox++;
        }


    pridajDragDroplogiku();
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

var draggableElements =[];
var droppableElements = [];
    function pridajDragDroplogiku(){
        draggableElements = document.querySelectorAll(".draggable"); //vsetky elementy
         droppableElements = document.querySelectorAll(".droppable");



        droppableElements.forEach(elem => {
            //kazdemu objektu pridame eventlisteneri ktore budu spustat ine funkcie
            elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
            elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
            elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
            elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
        });



        draggableElements.forEach(elem => {
            elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
            // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
            // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
        });
    }




function dragStart(event) {

    event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
    console.log(event.dataTransfer.getData("text"));
    console.log("dragStart");
}


function dragEnter(event) {

    //skontroluje ci nebol dropped daco v tom
    if(!event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover"); //prida mu do zoznamu objekt "droppadle-hover" , podla neho mozme urcit ci ho drzime
    }
    console.log("dragEnter");
}

function dragOver(event) {
    //skontroluje ci nebolo dropped daco v tom
    if(!event.target.classList.contains("dropped")) {
        event.preventDefault(); // Prevent default to allow drop - zobrazi ze nemozes pustit (gulata ikonka preciarknutia)
    }
    console.log("dragOver");
}


function dragLeave(event) {
    if(!event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
    console.log("dragLeave");
}


//orezat drop o veci co nepouziva
function drop(event) {
    event.preventDefault(); // This is in order to prevent the browser default handling of the data
    event.target.classList.remove("droppable-hover");  //odstrani ten droppable objekt

    const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
    const droppableElementData = event.target.getAttribute("data-draggable-id");

    //overuje ci je rovnake
    // const isCorrectMatching = draggableElementData === droppableElementData;
    console.log("draggableElementData ", draggableElementData);
    console.log("droppableElements ", droppableElements);
    // const isCorrectMatching = draggableElementData === droppableElementData;
    //  const isCorrectMatching = true  ;


    //chcem porovnat ci to co dropujem je zo zoznamu (moznosti co som dal) a nie daco random, to za ciarkou je vstupny element - v funkcii sa pouziva ako this
 //TODO ?   droppableElements.forEach(overcitamje,draggableElementData  )

    //posielaju sa mu tam rovno data (z textu? a s tym to porovnam)
  //TODO ?  overRovnost(draggableElementData, droppableElementData);

    //treba overit ci je aspon z toho listu inak mozu nastat buggs, ked prechadza tymto ifom
    if(true) {
   // if(rovne) {
        //if(isCorrectMatching) {



        const draggableElement = document.getElementById(draggableElementData); //tu spravit nech zobere prve 2 classi ez

        console.log("ukaz classu",  draggableElement.classList.value);
        var stringClass = draggableElement.classList.value;
        const myArray = stringClass.split(" ");
        //pridam iba prve dve


        console.log( myArray[0] ," ", myArray[1])
       /* for (const classa of myArray){
            // console.log(cast);
            vizualhtml.classList.add(classa);
        }*/



        event.target.classList.add("dropped");

        // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following:
        event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
        draggableElement.classList.add("dragged");

        draggableElement.setAttribute("draggable", "false");

        //skopiroval som array s clasami a preposlem mu ho tam
        event.target.insertAdjacentHTML("afterbegin", `<i class="${myArray[0]} ${myArray[1]}"></i>`);
    }
}





    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }



