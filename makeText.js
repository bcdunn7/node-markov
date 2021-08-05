/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');


async function cat(path) {
    let result = await readAndResp(path);
    return result;
}

async function readAndResp(path) {
    if (checkifURL(path)) {
        let resp = await webCat(path)
        return resp;
    }
    else {
        let resp = read(path);
        return resp;
    }
}

function read(path) {
    try {
        let res = fs.readFileSync(path, 'utf8')
        return res;
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

function checkifURL(path) {
    if (path.startsWith('http')) {
        return true
    }
    else {return false}
}


async function webCat(url) {
    try {
        let res = await axios.get(url);
        return res; 
    }
    catch (e) {
        return e;
    }
}


async function acceptCommand(){
    try {
        let text = await cat(process.argv[3]);
        if (process.argv[2] === 'file') {
            markov(text)
        }
        else if (process.argv[2] === 'url') {
            markov(text.data)
        }
    }
    catch(e) {
        console.error(e);
        process.exit(1);
    }
}

function markov(text) {
    try {
        let mm = new MarkovMachine(text);
        let output = mm.makeText();
        console.log(output)
    }
    catch (e) {
        console.error(e);
        console.log("Make sure file or url is specified correctly!")
        process.exit(1);
    }
}

acceptCommand();