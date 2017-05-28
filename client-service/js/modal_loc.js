// For modal_loc.ejs
var types = [];
function addItem(value){
    if(types.indexOf(value) == -1){
        types.push(value);
    }
    else {
        removeArr(types,value);
    }
}

$('#hireBtn').click(function(){
    // Deliver the types of driver and user location to server to call the cab
    // Get user name & type
    let username = document.getElementById('userID').value;
    let type = document.getElementById('userTYPE').value;
    // Get key
    let key = document.getElementById('key').value;
    // Get user location
    getCurrentLocation(function(err,msg_pos){
        if(err){
            // alert and return
            alert(msg_pos);
            return;
        }
        else{
            // set to the server
            socket.emit('trip_start',{
                user: username,
                type: type,
                key: key,
                filter: types,
                pos: msg_pos
            });
        }
    })
});

// Socket io (get the matching result)
