
$(function() {
    console.log("JQuery is working!");
    loadTasks();
    $('task-results').hide();
    $('#search').keyup(function() {
        if ($('#search').val()) {
                    let search = $('#search').val();
        $.ajax({
            url: 'task-search.php',
            type: 'POST',
            data: {search},
            success: function(response) {
                let tasks = JSON.parse(response);
                console.log(tasks);
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
            description: $('#description').val()
        };
        $.post('task-add.php', postData, function(response) {
            loadTasks();
            $('#task-form').trigger('reset');
            console.log(response);
            
        });
        e.preventDefault();
    });

   function loadTasks() {
         $.ajax({
        url: 'task-list.php',
        type: 'GET',
        success: function(response) {
        console.log(response);
        let tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
            template += `
            <tr TaskID="${task.id}">
            <td>${task.id}</td>
            <td>${task.name}</td>
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
    
    $.post('task-delete.php', {id}, function(response) {
    loadTasks();
    console.log(response);
        
         });
        return;
        }
});

});
