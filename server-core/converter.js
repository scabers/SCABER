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
    csv2json_w(csv_path,dist_path,cb){
        // convert the csv file and write into the json file in dist_path
        fs.readFile(path.join(__dirname,csv_path),'utf-8', (err,data) => {
            if(err)
                cb(0,'Error in reading file - '+csv_path); // return nothing but error message
            else{
                jsfs.writeFile(path.join(__dirname,dist_path),csvjson.toSchemaObject(data,{delimiter:',',quote:'"'}),{spaces: 2},function(err){
                    if(err) cb(0,'['+err+'] Error in Json writing files error.');
                    else cb(1,'[csv->json] Successfully write file into '+path.join(__dirname,dist_path));
                });
            }
        });
    }
    xlsx2json(xlsx_path,cb){
        // convert xlsx format object to json format and return
        if(!fs.existsSync(path.join(__dirname,xlsx_path))){
            // not exist
            cb(0,'Invalid reading file path: '+xlsx_path);
        }
        else{
            xlsx2json(path.join(__dirname,xlsx_path)).then(jsonArray => {
                // send back jsonArray !
                cb(1,jsonArray);
            });
        }
    }
    xlsx2json_w(xlsx_path,dist_path,cb){
        // convert the target xlsx format object and write back into json file specify in dist_path
        if(!fs.existsSync(path.join(__dirname,xlsx_path))){
            // not exist
            cb(0,'Invalid reading file path: '+xlsx_path);
        }
        else{
            xlsx2json(path.join(__dirname,xlsx_path)).then(jsonArray => {
                // write back jsonArray !
                jsfs.writeFile(path.join(__dirname,dist_path),jsonArray,{spaces: 2},function(err){
                    if(err) cb(0,'['+err+'] Error in Xlsx writing files error.');
                    else cb(1,'[xlsx->json] Successfully write file into '+path.join(__dirname,dist_path));
                });
            });
        }
    }
}

module.exports = {
    Converter: new Converter()
};
