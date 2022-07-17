const taskData = [
    {
        name: 'Task 01',
        completed: false
    },
    {
        name: 'Task 02',
        completed: true
    },
]

const btnShowModal = document.querySelector('.btn-show-modal');
btnShowModal.addEventListener('click', function(){
    // modal-title
    const modalTitle = document.querySelector('.modal-title');
    // btn create
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.textContent = 'Create';

    modalTitle.textContent = 'Create Task';
    document.querySelector('.task-modal').value = '';
});

// edit element in table
function editItemInTable(index){
    btnShowModal.click();
    // modal-title
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.textContent = 'Edit Task';
    // btn create
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.textContent = 'Edit';

    const taskName = document.querySelector('.task-modal');

    taskName.value = taskData[index].name;
    taskName.setAttribute('data-index', index);
}

// remove element from table
function removeItemFromTable(buttonRemove, index){
    taskData.splice(index, 1);
    buttonRemove.removeEventListener('click', removeItemFromTable);
    showTable(taskData);
}

function setCompleted(inputCheckbox, tr, index){
    if(inputCheckbox.checked) {
        tr.classList.add('completed');
        inputCheckbox.setAttribute('checked', 'checked');
        tr.querySelector('.btn-success').setAttribute('disabled', 'disabled');
        tr.querySelector('.btn-danger').setAttribute('disabled', 'disabled');
    } else {
        tr.classList.remove('completed');
        inputCheckbox.setAttribute('checked', '');
        tr.querySelector('.btn-success').removeAttribute('disabled');
        tr.querySelector('.btn-danger').removeAttribute('disabled');
    }
    taskData[index].completed = this.value;
}


// show the data results in the table
function showTable(dataTable = []){
    const taskTable = document.getElementById('task-table');
    const tableTbody = taskTable.querySelector('tbody');
    tableTbody.innerHTML = '';

    dataTable.forEach((objValue = {}, index) => {
        const tr = document.createElement('tr');
        if(objValue.completed){
            tr.classList.add('completed')
        }

        // <td class="checbox-cell"><input type="checkbox"></td>
        const tdCheckbox = document.createElement('td');
        tdCheckbox.classList.add('checkbox-cell');
        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');
        if(objValue.completed){
            inputCheckbox.setAttribute('checked', 'checked');
        }
        inputCheckbox.addEventListener('click', setCompleted.bind(this, inputCheckbox, tr, index))

        
        tdCheckbox.appendChild(inputCheckbox);
        tr.appendChild(tdCheckbox);

        // <td class="text-cell">Task Description 1</td>
        const tdText = document.createElement('td');
        tdText.classList.add('text-cell');
        tdText.textContent = objValue.name;
        tr.appendChild(tdText);

        //  <td class="action-cell">
        //     <button class="btn btn-sm btn-success"><i class="bi bi-pencil-fill"></i></button>
        //     <button class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
        //   </td>
        const tdActions = document.createElement('td');
        tdActions.classList.add('action-cell');

        const buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        buttonEdit.classList.add('btn', 'btn-sm', 'btn-success');
        buttonEdit.addEventListener('click', editItemInTable.bind(this, index));

        const buttonRemove = document.createElement('button');
        buttonRemove.innerHTML = '<i class="bi bi-trash"></i>';
        buttonRemove.classList.add('btn', 'btn-sm', 'btn-danger');
        buttonRemove.addEventListener('click', removeItemFromTable.bind(this, buttonRemove, index));

        if(objValue.completed){
            buttonEdit.setAttribute('disabled', 'disabled');
            buttonRemove.setAttribute('disabled', 'disabled');
        }

        tdActions.appendChild(buttonEdit);
        tdActions.appendChild(buttonRemove);
        tr.appendChild(tdActions);
        
        tableTbody.appendChild(tr);
    });

}

function showModal(){
    const taskModal = document.getElementById('task-modal');
    const taskName = document.querySelector('.task-modal');
    const btnCreate = taskModal.querySelector('.btn-create');
    const btnClose = taskModal.querySelector('.btn-close-dialog');
    // modal-title
    const modalTitle = taskModal.querySelector('.modal-title');

    btnCreate.addEventListener('click', function(){
        if(modalTitle.textContent === 'Edit Task') {
            const index = taskName.getAttribute('data-index');
            taskData[index].name = taskName.value;
            showTable(taskData);
            btnClose.click();
        } else {
            const newTask = {
                name: taskName.value,
                completed: false
            };
            taskData.push(newTask);
            showTable(taskData);
            btnClose.click();
        }
    });
}

// initialize data
function init(){
    showTable(taskData);
    showModal();
}

init();