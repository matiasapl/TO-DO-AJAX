
$(function() {
    let edit = false;
    loadTasks();
    $('task-results').hide();
    $('#search').keyup(function() {
        if ($('#search').val()) {
                    let search = $('#search').val();
        $.ajax({
            url: '../TASK-APP/MODELO/task-search.php',
            type: 'POST',
            data: {search},
            success: function(response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `<li>
                        ${task.name}
                        </li>`
                });
                $('#container').html(template);
                $('#task-results').show();
            }

        });
        }
      
    });


    $('#task-form').submit(function(e) {
        
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        };

        let url = edit === false ? '../TASK-APP/MODELO/task-add.php' : '../TASK-APP/MODELO/task-edit.php';
        
        $.post(url, postData, function(response) {
            loadTasks();
            $('#task-form').trigger('reset');
            
            
        });
        edit = false;
        e.preventDefault();
    });

   function loadTasks() {
         $.ajax({
        url: '../TASK-APP/MODELO/task-list.php',
        type: 'GET',
        success: function(response) {
        let tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
            template += `
            <tr TaskID="${task.id}">
            <td>${task.id}</td>
            <td>
            <a href="#" class="task-item"> ${task.name} </a>
            </td>
            <td>${task.description}</td>
            <td>
            <button class="task-delete btn btn-danger">
                Delete
            </button>
            </td>
            </tr>`
        });
        $('#tasks').html(template);
        
    }
    });
}
$(document).on('click', '.task-delete', function() {
    if (confirm('Are you sure you want to delete this task?')) {
        
    
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('TaskID');
    
    $.post('../TASK-APP/MODELO/task-delete.php', {id}, function(response) {
    loadTasks();
        
         });
        return;
        }
});

$(document).on('click', '.task-item', function() {
    
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('TaskID');
    $.post ('../TASK-APP/MODELO/task-single.php', {id}, function(response) {
    const task = JSON.parse(response);
    $('#name').val(task.name);
    $('#description').val(task.description);
    $('#taskId').val(task.id);
    edit = true;
    
    });

});
    
});
