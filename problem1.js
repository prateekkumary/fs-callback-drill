import fs from "fs"
/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
export function createDirAndFilesThenDeleteFiles(path, x) {
    fs.mkdir(path, (err) => {
        if (err) console.log(err)
        console.log(`${path} directory created`)
        createFiles(path, x)
    })
}
function createFiles(path, x) {
    for (let i = 0; i < x; i++) {
        let name = `file-${i}.json`
        fs.writeFile(path + "/" + name, " ", (err) => {
            if (err) console.log(err)
            console.log(`${name} created successfully`)
            deleteFiles(path, name)
        })
    }
}
function deleteFiles(path, name) {
    fs.unlink(path + "/" + name, (err) => {
        if (err) console.log(err)
        console.log(`${name} deleted successFully`)
    })
}