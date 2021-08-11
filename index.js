#!/usr/bin/env node

//require import statement
//fs library code stored in fs
const fs = require("fs");

//process.arg node path nd file path on first two indexes + the arguments that you.ve passed
let arguments = process.argv.slice(2);
//it will contain all the flags
let flags = [];
//it will contain all the filenames
let filenames = [];

let secondaryArguments = [];
//example
//flag = [-a,-w,-e]
//filesname = [a.txt,b.txt];
for(let i of arguments){
    if(i[0] == "-"){ //since flags start from -
flags.push(i);  //push the flags in flag array
    }
    else if(i[0] == "$"){
        secondaryArguments.push(i.slice(1)); //argument after $
    }
    else{
        filenames.push(i); //push the file
    }
}
//if no flags and only filenames are there in the arguent then
// if(flags.length == 0 && filenames.length!=0){
// for(let file of filenames) {
//     console.log(fs.readFileSync(file,"utf-8"));
// }
// }
// else {
//  for(let flag of flags){
//      //-rs flag from removing spaces
//      if(flag == "-rs"){
//          for(let file of filenames){
//              let fileData = fs.readFileSync(file,"utf-8");
//              console.log(fileData.split(" ").join(""));
//              //split the contents of file in array
//              //then join the array as one string
//          }
//      }
//  }
// }

//optimised
for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags) {
        if(flag == "-rs"){ //remove spaces
            fileData = removeAll(fileData, " ");      
         }
         if(flag == "-rn"){ //remove new line
             fileData = removeAll(fileData, "\r\n");
         }
         if(flag == "-rsc"){
            for(let secondaryArgument of secondaryArguments){
                //for removing special characters passed by us using $ (\r\n nahi remove kr skte)
                //$andthetexttobereoved
                fileData = removeAll(fileData, secondaryArgument);
            }
    }

 
}
console.log(fileData);
}
/*executes index.js through wcat it will be globally accessible */
function removeAll(string, removalData){
    return string.split(removalData).join("");
}