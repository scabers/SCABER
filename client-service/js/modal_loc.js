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
        document.getElementById('arrival_time').innerHTML = (Math.floor(total_sec/60) >= 10 ? Math.floor(total_sec/60).toString() : '0'+Math.floor(total_sec/60).toString())  +':'+ (total_sec%60 >= 10 ? total_sec%60 : '0'+(total_sec%60).toString() );
        if(total_sec <= 0){
            // enable the button
            document.getElementById('goTrip').className = "btn btn-success col-md-12 col-xs-12 col-sm-12";
            // emit signal to dismiss
            // disconnectFromServer();
            clearInterval(timer);
        }
        else{
            total_sec--;
        }
    },1000);
}

// StartTrip (Driver、User and GAs all go to one channel)
function startTrip(){
    // emit signal
    // Get user name & type
    let username = document.getElementById('userID').value;
    let type = document.getElementById('userTYPE').value;
    // Get key
    let key = document.getElementById('key').value;
    socket.emit('trip_launch',{
        user: username,
        type: type,
        key: key
    });
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
