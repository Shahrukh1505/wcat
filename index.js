#!/usr/bin/env node 
//node is an environment wcat command will run through this environment
//generally, globally linking data are stored in bin
/*executes index.js through wcat it will be globally accessible */
//require import statement
//fs library code stored in fs
/*To handle file operations like creating, reading, deleting, etc.,
 Node.js provides an inbuilt module called FS (File System).
 Module- provides special functionality , code can be used multiple times */
 /*Common use for File System module:

Read Files
Write Files
Append Files
Close Files
Delete Files */
const fs = require("fs");


//process.arg node path nd file path on first two indexes + the arguments that you.ve passed
/*The process.argv property is an inbuilt application programming interface of the process module 
which is used to get the arguments passed to the node.js process when run in the command line.

Syntax:

process.argv
Return Value: This property returns an array containing the arguments passed to the process when run it in the command line. 
The first element is the process execution path(node path) and the second element is the path for the js file. */

let arguments = process.argv.slice(2);
//it will contain all the flags
let flags = [];
//it will contain all the filenames
let filenames = [];

let secondaryArguments = [];
let renameArguments = [];

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
    else if(i[0] == "%"){ //rename file identifier
        renameArguments.push(i.slice(1));

    }
   
   else{
        filenames.push(i); //push the file
    }
}


//optimised
for(let j = 0;j<filenames.length;j++){
    let fileData = fs.readFileSync(filenames[j],"utf-8");
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

        //adding serial number to lines
            if(flag == '-s'){
            fileData = addNewline(fileData);
            }
            if(flag == '-rel'){
fileData = removeExtraLine(fileData);
            }
            //writing the file through console(using the #sign followed by the content)
            if(flag == "-w"){
               
                let updatedContent = fs.readFileSync(filenames[j+1], "utf-8");
            fs.writeFileSync(filenames[j],updatedContent);
             fileData = fs.readFileSync(filenames[j],"utf-8");
             break;
                
            }
            //appending the file that is adding contents to the existing file
            if(flag == "-a"){
let appendContent =  fs.readFileSync(filenames[j+1], "utf-8");
fs.appendFileSync(filenames[j]," " + appendContent);
fileData = fs.readFileSync(filenames[j],"utf-8");
break;
            }
             //count no. of lines
            if(flag == '-cli'){
               
fileData = countLines(fileData);
            }
            
            //rename files using %sign followed by file name
            if(flag == '-ren'){

                let newName = renameArguments.join("");
                fs.renameSync(filenames[j],newName);
                fileData = "File renamed";
            }
    }
console.log(fileData);
}
/*executes index.js through wcat it will be globally accessible */
function removeAll(string, removalData){
    return string.split(removalData).join("");
}

//adding numbers in front of new line
//omitting the empty lines

//We first split the string content by new line , after that we iterate over each content of the array and if it's empty or not
//if it's empty then don't add the number else if it's not add the number

function addNewline(string){
    let contentArr = string.split("\r\n");
    let j = 1;
    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i] != ""){
        contentArr[i] = `${j}  ${contentArr[i]}`;
        j++;
        }
    }
    return contentArr.join("\r\n");
}

function removeExtraLine(string){

    let contentArr = string.split("\r\n");

    let data = [];

    for(let i = 1;i<contentArr.length;i++){
     if(contentArr[i] == "" && contentArr[i-1] == ""){
         contentArr[i] = null;
     }
     else if(contentArr[i] == "" && contentArr[i-1] == null){
         contentArr[i] = null;
     }

    }

    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }

    return data.join("\r\n");
}


//counting the number of lines in file

function countLines(string){
    let contentArr = string.split("\r\n");

    return contentArr.length;
}

