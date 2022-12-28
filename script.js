const draggableElements = document.querySelectorAll(".draggable"); //vsetky elementy
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
    // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
    // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
    //kazdemu objektu pridame eventlisteneri ktore budu spustat ine funkcie
    elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
    elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
    elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
    elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {

    event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
    console.log("dragStart");
}

//Events fired on the drop target

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
var rovne = true;

function drop(event) {
    event.preventDefault(); // This is in order to prevent the browser default handling of the data
    event.target.classList.remove("droppable-hover");  //odstrani ten droppable objekt

    const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
    const droppableElementData = event.target.getAttribute("data-draggable-id");

   //overuje ci je rovnake
   // const isCorrectMatching = draggableElementData === droppableElementData;
    console.log("draggableElementData");
    console.log(draggableElementData);
    console.log(droppableElements);
   // const isCorrectMatching = draggableElementData === droppableElementData;
    const isCorrectMatching = true  ;

    rovne=false;
    //chcem porovnat ci to co dropujem je zo zoznamu (moznosti co som dal) a nie daco random, to za ciarkou je vstupny element - v funkcii sa pouziva ako this
    droppableElements.forEach(overcitamje,draggableElementData  )


//treba overit ci je aspon z toho listu inak mozu nastat buggs, ked prechadza tymto forom -  done
    if(rovne) {
    //if(isCorrectMatching) {

        const draggableElement = document.getElementById(draggableElementData);
        event.target.classList.add("dropped");

        // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following:
        event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
        draggableElement.classList.add("dragged");

        draggableElement.setAttribute("draggable", "false");
        event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
    }
}
//funkcia napojena na reset
function testSkupiny(){
    //takto zistim ci sa tam nachadza dana vec
//    droppableElements.forEach(element => console.log(element.getAttribute("data-draggable-id")))


    //for each v kazdom odstranim obrazky a popridam ked tak text? - alebo overim ci tam su 2 veci a vymazem jednu


   // document.querySelector('[ data-draggable-id="cat" ]').classList.add("resetNigga");//pridanie classy
    document.querySelector('[ data-draggable-id="cat" ]').classList.remove("dropped"); // odstranenie classy
    document.querySelector('[ data-draggable-id="cat" ]').style.backgroundColor="white"; //da farbu spat na bielu

  //najdenie konkretneho elementu podla vlastneho atributu
  //  var skratka =  document.querySelector('[ data-draggable-id="cat" ]');
  //  skratka.removeChild(skratka.firstElementChild); //vymazat z listu
//    skratka.childElementCount
//    console.log("pocet childov ",skratka.childElementCount );
   // if(skratka.childElementCount>1){
        //chcem odstranit prvy objekt v dive
     //   skratka.removeChild(skratka.firstElementChild);
   // }

        //takto mozem pre vsetky zmazat
    droppableElements.forEach(resetOdpovede);


    draggableElements.forEach(resetMoznosti);



}

//resetuje odpovedovy harok
function resetOdpovede(item){

    //odstrani classu dropped (css)
    item.classList.remove("dropped");

    //backgorund zmeni na defaultnu bielu
    item.style.backgroundColor="white";

    //ak je ich tam viacej, vrati pocet na 1
    if(item.childElementCount>1){
        // novo pridame veci su ako prve, tak mi staci vymazat to prve
        item.removeChild(item.firstElementChild);
    }
}


function resetMoznosti(item){
    //da naspat na povodnu viditelnost
    item.style.display ='initial';
    //custom boolean nastavim na true, aby som ho mohol tahat - dragovat obrazok
    item.draggable=true;
    //odstanim css classu
    item.classList.remove("dragged");
}

//pozrie zoznam a porovna ci sa tam nachadza
function overcitamje(item){
    console.log(  item.getAttribute("data-draggable-id"));
    console.log(this);
    if(item.getAttribute("data-draggable-id") ==this){
        console.log("rovna sa ");
        rovne=true;
    }

}

// Hra java
// potrebujeme x pocet booleanov pre x moznosti odpovede (5 ovoci = 5 booleanov)
// reset, nacitanie dalsej otazky resetuje vsetky booleany
// ak budu vsetky booleany true, moze dat dalsiu otazku
// pocitadlo na spravne/nespravne odpovede?

//koncept: nacitanie otazky (moznosti) z jsonu
// zaznamenavanie odpovedi do jsonu - funckionalita: budes moct pozriet naspat na predch odpovedane otazky
// pri resete bude potrebne vymazat "dragged" classu z veci v draggable-elements