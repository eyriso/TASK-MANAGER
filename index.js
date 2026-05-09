
const form = document.querySelector('form');

 

form.addEventListener('submit', submitTask);

 

function submitTask(e) {

    e.preventDefault();

 

    const formElement = e.target;

    const submitBtn = formElement.querySelector('button[type="submit"]');

    const taskId = submitBtn.dataset.taskId;

 

    const formData = new FormData(formElement);

 

    const task = {

        id: taskId || Date.now(),

        title: formData.get('title'),

        description: formData.get('description')

    };

 

    const taskContainer = document.getElementById('task-list-container');

 

    if (!taskContainer) return;

 

    const taskItem = createTask(task);

 

    taskContainer.appendChild(taskItem);

 

    submitBtn.textContent = 'Agregar';

    delete submitBtn.dataset.taskId;

 

    formElement.reset();

}

 

function createTask(taskData) {

 

    const li = document.createElement('li');

    li.className = 'task-item';

    li.id = taskData.id;

 

    // CONTENIDO

    const contentBox = document.createElement('div');

    contentBox.className = 'task-content';

 

    const title = document.createElement('h3');

    title.textContent = taskData.title;

 

    const description = document.createElement('p');

    description.textContent = taskData.description;

 

    contentBox.append(title, description);

 

    // ACCIONES

    const actionBox = document.createElement('div');

    actionBox.className = 'task-actions';

 

    // BOTÓN ELIMINAR

    const removeBtn = document.createElement('button');

    removeBtn.textContent = 'Borrar';

 

    removeBtn.addEventListener('click', () => {

        li.remove();

    });

 

    // BOTÓN EDITAR

    const editBtn = document.createElement('button');

    editBtn.textContent = 'Modificar';

 

    editBtn.addEventListener('click', () => {

 

        const form = document.querySelector('form');

 

        form.querySelector('input[name="title"]').value =

            taskData.title;

 

        form.querySelector('textarea[name="description"]').value =

            taskData.description;

 

        const submitBtn =

            form.querySelector('button[type="submit"]');

 

        submitBtn.textContent = 'Guardar';

        submitBtn.dataset.taskId = taskData.id;

 

        li.remove();

    });

 

    actionBox.append(editBtn, removeBtn);

 

    li.append(contentBox, actionBox);

 

return li;

}

