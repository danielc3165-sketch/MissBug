
import fs from 'fs'

import { utilService } from '../../../services/util.service.js'


export const bugService = {
    query,
    save,
    get,
    remove,
}

const bugs = _readJsonFile()
const sortBy = 'title'

function query(filterBy = {}) {
    var filteredBugs = [...bugs]

    if (filterBy.txt){
    const regExp = new RegExp(filterBy.txt, 'i')
    filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
    }

    if (filterBy.minSeverity){
        filteredBugs = filteredBugs.filter(bug => bug.severity >= filterBy.minSeverity)
    }
    
    if (sortBy === 'title') {
        filteredBugs = filteredBugs.sort((a, b) => a.title.localeCompare(b.title))
    }else if (sortBy === 'severity') {
        filteredBugs = filteredBugs.sort((a, b) => a.severity - b.severity)
    }else if (sortBy === 'creatTime') {
        filteredBugs = filteredBugs.sort((a, b) => a.createdAt - b.createdAt)
    } 
    
    
    return Promise.resolve(filteredBugs)
}

function get(_id){
    return Promise.resolve(bugs.find(bug => bug._id === _id))
}

function save(bug) {
    if (bug._id) {
        const idx = bugs.findIndex(currBug => currBug._id === bug._id)
        if (idx === -1) return Promise.reject('Bug not found')
        bugs.splice(idx, 1, bug)
    } else {
        bug._id = utilService.makeId()
        bugs.push(bug)
    }
   
    _saveBugsToFile()
    return Promise.resolve(bug)
}

function remove(_id) {
    const idx = bugs.findIndex(bug => bug._id === _id)
    bugs.splice(idx, 1)
    _saveBugsToFile()
    return Promise.resolve()
}

function _readJsonFile() {
    const contents = fs.readFileSync('data.json', 'utf8')
    return JSON.parse(contents)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs)
        fs.writeFile('data.json', data, (err) => {
            if (err) {
                return reject(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}



