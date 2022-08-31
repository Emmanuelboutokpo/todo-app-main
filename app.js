const tglBtn = document.querySelector(".tgl-btn");
const todosContainer=document.querySelector(".todos");
const todoInput = document.querySelector("#todo-input");
const clearCompleted =document.querySelector(".clearCompleted");
const completedCount =document.querySelector(".completedCount");
const showAll =document.querySelector(".showAll");
const filterActive =document.querySelector(".filterActive");
const filterCompleted =document.querySelector(".filterCompleted");
let todos =[];
var elem = null;


const isBefore = (el1, el2)=>{
     for(
         var cur = el1.previousSibling;
         cur && cur.nodeType==9;
         cur=cur.previousSibling
     )
     if (cur == el2) return true;
     return false;
}

tglBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light")
});

clearCompleted.addEventListener("click", (e)=>{
    document.querySelectorAll(".todo").forEach((todo)=>{
        if (todo.querySelector("input").checked) {
            todo.remove();
        }
    })
});

showAll.addEventListener("click",(e)=>{
    document.querySelectorAll(".filters div").forEach((d,i) =>{
          if (i==0) {
              d.classList.add("filterActived");
          }else{
              d.classList.remove("filtersActived");
          }
    });

    document.querySelectorAll(".todo").forEach((todo)=>{
       todo.style.display = "grid";
    })
});

filterActive.addEventListener("click",(e)=>{
    document.querySelectorAll(".filters div").forEach((d,i) =>{
        if (i==1) {
            d.classList.add("filterActived");
        }else{
            d.classList.remove("filtersActived");
        }
  });

    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display = "grid";
        if (todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    })
});

filterCompleted.addEventListener("click",(e)=>{
    document.querySelectorAll(".filters div").forEach((d,i) =>{
        if (i==2) {
            d.classList.add("filterActived");
        }else{
            d.classList.remove("filtersActived");
        }
  });

    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display = "grid";
        if (!todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    })
});

const  countCompleted = () =>{
    completedCount.textContent = `
    ${
        todos.filter((t) => t.checked == false).length
    } items left`;
}


todoInput.addEventListener('keyup', (e)=>{
    if (e.key === "Enter"|| e.keyCode === 13) {
           todos.push({ value: e.target.value ,  checked : false })
          newTodo(e.target.value)
           todoInput.value="";
           countCompleted();
    }
});

const newTodo = (value) =>{
    const todo = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckbox = document.createElement("input");
    const  todoCheckboxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    let obj = todos.find((t) => t.value === value); //find the first element of array todos when this value is value
    
    todoText.textContent=value;
     todoCheckbox.type="checkbox";
     todoCheckbox.name= "checkbox";
     todoCheckboxLabel.htmlFor="checkbox";
     
     todoCheckboxLabel.addEventListener("click", (e)=>{

         if (todoCheckbox.checked) {
             todoCheckbox.checked=false;
              todoText.style.textDecoration="none";
              todoCheckboxLabel.classList.remove("active");
              obj.checked=false;
              countCompleted();
              console.log(todos);
          }
          else{
              todoCheckbox.checked=true;
              obj.checked=true;
              console.log(todos);
              countCompleted();
            todoText.style.textDecoration="line-through";
            todoCheckboxLabel.classList.add("active")
        }
     })
     
todoCross.textContent="X";
todoCross.addEventListener("click",(e)=>{
    e.target.parentElement.remove();
    todos=todos.filter((t) => t === obj);
    countCompleted();
})

todo.classList.add("todo");
todoCheckboxLabel.classList.add("circle");
todoCross.classList.add("cross");

todo.appendChild(todoCheckbox);
todo.appendChild(todoCheckboxLabel);
todo.appendChild(todoText);
todo.appendChild(todoCross);

todo.draggable = true;
todo.addEventListener("dragstart", (e) =>{
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain",null) ;
    elem=e.target;
    console.log(elem);
});

todo.addEventListener("dragover", (e) =>{
   let el1;
   e.preventDefault();

   if (e.target.classList.contains("todo")) {
       el1=e.target;
   } else {
       el1=e.target.parentElement
   }

   if (isBefore(elem, el1)) {
       el1.parentNode.insertBefore(elem,el1);
   } else {
    el1.parentNode.insertBefore(elem,el1.nextSibling);
   }
});

todo.addEventListener("dragend", ()=>{
    elem =null;
    let index =todos.findIndex((t) => t.value == value);
    todos.splice(index, 1);
    if(todos.nextSibling){
        let index1= todos.findIndex(
            (t) => t.value == todo.nextSibling.querySelector("p").textContent
        );
        todos.splice(index1,0,{
            value:value,
            checked:todo.querySelector("input").checked
        })
    } else{
        todos.push({
            value:value,
            checked:todo.querySelector("input").checked
        });
    }
})

todosContainer.appendChild(todo)

}

function updateTodos(value, bool) {
    todos.forEach((t)=>{
        if (t.value==value) {
            t.checked=bool
        } else {
            
        }
    })
}
