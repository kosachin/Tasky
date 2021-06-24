const taskContainer = document.querySelector(".task__container")
console.log(taskContainer)

let globalStore = [];

const generateNewCard = (taskData)=>`
<div class="col-md-6 col-lg-4 mb-3" >
                <div class="card ">
                    <div class="card-header text-end gap-2">
                        <button type="button" class="btn btn-outline-success"><i
                                class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger"
                        id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)" ></i></button>
                    </div>
                    <img src=${taskData.imageUrl} class="card-img-top" alt="card-img">
                    <div class="card-body">
                        <h5 class="card-title">${taskData.taskTitle}</h5>
                        <p class="card-text">${taskData.taskDescription}
                        </p>
                        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                    </div>
                    <div class="card-footer float-end">
                        <button type="button" class="btn btn-outline-primary">Open Task</button>
                    </div>
                </div>
            </div>
`
// when we reload page data is tored in localStorage but their cards were not showing
const loadInitialCardData = () => {
    // localStorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    // convert from string to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
    
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
        
        // update our globalStore
        globalStore.push(cardObject);
         
    })

}

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl : document.getElementById("imageUrl").value,
        taskTitle : document.getElementById("taskTitle").value,
        taskType : document.getElementById("taskType").value,
        taskDescription : document.getElementById("taskDescription").value,
    };
    
    // To create html code(generateNewCard) from object(taskData)
    // And to add next to the card
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    
    // To push/add every new card object(taskData) into the array(globalStore)
    globalStore.push(taskData);

    
    // Adding objects from array to localStorage 
    // ID is given to identify data
    // To convert JS object to string stringify used since it aspects object key name cards is created with value as array of object
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

};

const deleteCard = (event) => {
    
    event = window.event;
    const targetID = event.target.id;
    const tagName = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}))

    if(tagName === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode)
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
    }

}