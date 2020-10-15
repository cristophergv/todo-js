import { Todo } from "../classes";
import { todoList } from "../index";

// <!-- This should be `0 items left` by default -->
// 				<span class="todo-count"><strong>0</strong> pendiente(s)</span>
// 				<!-- Remove this if you don't implement routing -->
// 				<ul class="filters">
// 					<li>
// 						<a class="selected filtro" class="selected" href="#/">Todos</a>
// 					</li>
// 					<li>
// 						<a class="filtro" href="#/active">Pendientes</a>
// 					</li>
// 					<li>
// 						<a class="filtro" href="#/completed">Completados</a>
// 					</li>
// 				</ul>

//Referencias en el HTML
const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const btnBorrar         = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = ulFiltros.querySelectorAll('.filtro');



export const crearTodoHtml= (todo) => {
    const htmlTodo = `
        <li class="${ todo.completado ? 'completed':'' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked':'' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;


    divTodoList.append(div.firstElementChild);

    return div;
}


//Eventos
txtInput.addEventListener('keyup',(event) =>{
    
    if(event.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

})


divTodoList.addEventListener('click',(event)=> {
    
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        //divTodoList.removeChild(todoElemento);
        todoElemento.remove();
    }

});

btnBorrar.addEventListener('click',(event) => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];
        //if(elemento.getAttribute('class').includes('completed')) {
        if(elemento.classList.contains('completed')) {
            console.log('Si lo contiene');
            divTodoList.removeChild(elemento);
            //elemento.remove();
        } else {
            console.log('No lo contiene');
        }
        
    }

});

ulFiltros.addEventListener('click',(event) => {

    const filtro = event.target.text;
    if(!filtro) {
        return;
    }
    
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado)
                    elemento.classList.add('hidden');
                break;
        
            default:
                break;
        }

    }
        

});