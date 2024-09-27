import fs from "fs"
/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
export function readFile(path){
    fs.readFile(path,"utf-8",(err,data)=>{
        if(err)console.log(err)
        else{
    toUppercase(data)
        }
    })
}
function toUppercase(data){
    //data=fs.readFile()
    data=data.toUpperCase();
    fs.writeFile("uppercase.txt",data,(err)=>{
        if(err)throw(err)
        console.log("uppercase file saved")
        fs.writeFile("./filenames.txt","uppercase.txt\n",(err)=>{
            if(err)throw err
            console.log("uppercase file name added into filenames.txt")
            splitToSentences()
        })
        
    })
}
function splitToSentences(){
    fs.readFile("uppercase.txt","utf-8",(err,data)=>{
        if(err)throw err
        data=data.toLowerCase()
        data=data.split(".").join("\n")
        fs.writeFile("sentences.txt",data,(err)=>{
            if(err)throw err
            fs.appendFile("./filenames.txt","sentences.txt\n",(err)=>{
                if(err)throw err
                console.log("sentences file written Successfully and saved file name")
                sort()
            })
    })
    });
}
function sort(){
    fs.readFile("sentences.txt","utf-8",(err,data)=>{
        if(err)throw err
        data=data.split(" ").sort().join(" ")
        fs.writeFile("sortData.txt",data,(err)=>{
            if(err)throw err
            console.log("sortData file written successfully and saved file name")
            fs.appendFile("./filenames.txt","sortData.txt",(err)=>{
                if(err)throw err
               deletion()
            })
        })

    })
}
function deletion(){
    fs.readFile("./filenames.txt","utf-8",(err,data)=>{
        if(err)throw err
        let arr=data.split("\n")
        arr.forEach(file=>{
            fs.unlink(file,(err)=>{
                if(err)throw err
                console.log(file+" deleted successfully")
            })
        })
    })
}