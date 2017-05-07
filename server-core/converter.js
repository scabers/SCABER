const fs = require('fs');
const jsfs = require('jsonfile');
const path = require('path');
const csvjson = require('csvjson');
const xlsx2json = require('xlsx2json');

// Mainly using to convert any text format into json
class Converter{
    csv2json(csv_path,cb){
        // convert the csv file and return with json object format
        fs.readFile(path.join(__dirname,csv_path),'utf-8', (err,data) => {
            if(err)
                cb(0,'Error in reading file - '+csv_path); // return nothing but error message
            else{
                cb(1,csvjson.toSchemaObject(data,{delimiter:',',quote:'"'}))
            }
        });
    }
    csv2json_w(csv_path,dist_path){

    }
}

module.exports = {
    Converter: new Converter()
};
