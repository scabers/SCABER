// For modal_loc.ejs
var types = [];
var timer = undefined;
function addItem(value){
    if(types.indexOf(value) == -1){
        types.push(value);
    }
    else {
        removeArr(types,value);
    }
}

// Timer of waiting time
function count_down_timer(raw_data){
    clearInterval(timer);
    // raw_data format: (min:sec)
    var total_sec = parseInt(raw_data.split(':')[0])*60 + parseInt(raw_data.split(':')[1]);
    console.log(total_sec);
    // calculate
    timer = setInterval(function(){
        // count down
        document.getElementById('arrival_time').innerHTML = Math.floor(total_sec/60)+':'+total_sec%60;
        if(total_sec <= 0){
            clearInterval(timer);
        }
        else{
            total_sec--;
        }
    },1000);
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

$('#dismissBtn').click(function(){
    // Delete this channel (and inform driver to cancel this ride)
    // Get user name & type
    let username = document.getElementById('userID').value;
    let type = document.getElementById('userTYPE').value;
    // Get key
    let key = document.getElementById('key').value;
    // emit dismiss signal
    socket.emit('trip_cancel',{
        user: username,
        type: type,
        key: key
    });
    clearInterval(timer);
});
