const d = document;

const templateNotes = d.getElementById("templateNotes").content;
const containerNotes = d.getElementById("NotesContainerAdd");
const formNotes = d.getElementById("formNotes");
const alertNote = d.querySelector(".uk-alert-danger");
console.log(formNotes);

let notes = [];

formNotes.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const data = new FormData(formNotes);
    let [nombre] = [...data.values()];

    if(!nombre.trim()){
        console.log("debes llenar el form");
        alertNote.style.display = "block";
        return;
    }else{
        handleNote(nombre)
    alertNote.style.display = "none";
    }
    

    
})

function handleNote(text){
    let notesObject = {
     name: text,
     id:Date.now().toString(),
    }
    notes.push(notesObject);
    paintNote();
}

function paintNote(){
    addLocalStorage();
     containerNotes.textContent = "";
    
    let fragment = d.createDocumentFragment();

    notes.forEach((item)=>{
        let cloneTemplate = templateNotes.cloneNode(true);
        cloneTemplate.querySelector(".displayDiv dd").textContent = item.name;
        cloneTemplate.querySelector("button").dataset.todo=item.id;
        fragment.appendChild(cloneTemplate);

    })
    containerNotes.appendChild(fragment);

}

d.addEventListener("click",(e)=>{
    if(e.target.dataset.todo){
        notes = notes.filter((item)=>item.id !== e.target.dataset.todo)
        paintNote();
    }
})

function addLocalStorage(){
    localStorage.setItem("notes",JSON.stringify(notes))
}

document.addEventListener("DOMContentLoaded",(e)=>{
    if(localStorage.getItem("notes")){
        notes = JSON.parse(localStorage.getItem("notes"));
        paintNote();
    }
    

})


















