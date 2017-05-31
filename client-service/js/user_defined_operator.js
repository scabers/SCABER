// Remove the particular item
function removeArr(arr , removeItem){
    if(arr.indexOf(removeItem) > -1){
        arr.splice(arr.indexOf(removeItem),1);
    }
    return arr;
}
