$('#new-todo-form').submit(function(e){
    e.preventDefault();
//  NEW ENTRY
    var toDoItem = $(this).serialize();
    $.post('/trtip', toDoItem, function(data){
        $('#trans-tipas').append(
            `
            <div class="form-group col-md-4 col-sm-4">
            <form action="/trtip/${data._id}" method="POST" class='edit-item-form'>
            <div class="form-group">
                <label for='${data._id}'>Naujas irasas</label>
                <input class="form-control" type="text" name="trtip[trtipas]" value="${data.trtipas} id:'${data._id}'">
            </div>
            <div class="form-group">
                <button class="btn btn-xs btn-primary btn-block">Pakeisti !</button>
            </div>
            </form>
            <div class="col-md-3 col-sm-6">
                <div class="caption">
                    <h4>${data.trtipas}</h4>
                    <div>
                        <button class="btn btn-xs btn-warning edit-button">REDAGUOTI</button>
                        <hr>
                        <form id="delete-form" action="/trtip/${data._id}", method=POST class='delete-item-form'>
                            <button class="btn btn-xs btn-danger">TRINTI</button>
                        </form>
                    </div>
                </div>
            </div>
            `
            )
        $('#new-todo-form').find('.form-control').val(''); //Clears the input form
    });
});
//  EDIT 
$('#trans-tipas').on('click', '.edit-button', function(){
    $(this).parent().siblings('.edit-item-form').toggle();
});
//  EDIT UPDATE
$('#trans-tipas').on('submit', '.edit-item-form', function(e){
    e.preventDefault();
    var toDoItem = $(this).serialize();
    var actionUrl = $(this).attr('action');
    var $originalItem = $(this).parent('.form-group');
    $.ajax({
        url: actionUrl,
        data: toDoItem,
        type: 'PUT',
        originalItem: $originalItem,
        success: function(data){
            this.originalItem.html(
                `
                <form action="/trtip/${data._id}" method="POST" class='edit-item-form'>
                    <div class="form-group">
                        <label for='${data._id}'>Naujas irasas</label>
                        <input class="form-control" type="text" name="trtip[trtipas]" value="${data.trtipas} id:'${data._id}'">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-xs btn-primary btn-block">Pakeisti !</button>
                    </div>
                </form>
                <h4>${data.trtipas}</h4>
                <div>
                    <button class="btn btn-xs btn-warning edit-button">REDAGUOTI</button>
                    <form style="display: inline" id="delete-form" action="/trtip/${data._id}" method="POST" class='delete-item-form'>
                        <button class="btn btn-xs btn-danger">TRINTI</button>
                    </form>
                    <hr>
                </div>
                `
            )
        }
    });
});

$('#trans-tipas').on('submit', '.delete-item-form', function(e){
    e.preventDefault();
    var confirmResponce = confirm("Ar tikrai norite istrinti ?");
    if(confirmResponce) {
        var actionUrl = $(this).attr('action');
        $itemToDelete = $(this).closest('.form-group');
        $.ajax({
            url: actionUrl,
            type:"DELETE",
            itemToDelete: $itemToDelete,
            success:function(data){
                this.itemToDelete.remove();
            }
        })
    } else{
        $(this).find('button').blur();
    }
});






















































// $.get('/todos', function(data){
//     debugger
// })
        
// $('form').submit(function(e) {
//     e.preventDefault();
//     var formData = $(this).serialize();
//     $.post('/todos', formData, function(data){
//         console.log(data);
//     });
// });

  
// $('form').submit(function(e) {
//     e.preventDefault();
//     var formData = $(this).serialize();
//     var formAction = $(this).attr('action');
//     $.ajax({
//         url: formAction,
//         data: formData,
//         type: 'PUT',
//         success: function(data){
//             console.log(data);
//         }
//     });
// });

  
// $('form').submit(function(e) {
//     e.preventDefault();
//     var formAction = $(this).attr('action');
//     $.ajax({
//         url: formAction,
//         type: 'DELETE',
//         success: function(data){
//             console.log(data);
//         }
//     });
// });