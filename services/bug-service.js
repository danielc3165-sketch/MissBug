
import fs from 'fs'

import { utilService } from '../public/services/util.service.js'


export const bugService = {
    query,
    save,
    get,
    remove,
}

const bugs = _readJsonFile()


function query(filterBy = {}, pageIdx = 0, sortBy = 'title') {
    var results={}
    var filteredBugs = [...bugs]
    
    

    if (filterBy.txt){
    const regExp = new RegExp(filterBy.txt, 'i')
    filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
    }

    if (filterBy.minSeverity){
        filteredBugs = filteredBugs.filter(bug => bug.severity >= filterBy.minSeverity)
    }
    
   
    if (filterBy.labels&&filterBy.labels.length>0) {
        
        filteredBugs = filteredBugs.filter(bug => bug.labels.some(label => filterBy.labels.includes(label)))
    }
    
    if (sortBy === 'title') {
        filteredBugs = filteredBugs.sort((a, b) => a.title.localeCompare(b.title))
    }else if (sortBy === 'severity') {
        filteredBugs = filteredBugs.sort((a, b) => a.severity - b.severity)
    }else if (sortBy === 'creatTime') {
        filteredBugs = filteredBugs.sort((a, b) => a.createdAt - b.createdAt)
    }
    
    var pageSize=6
    results.pagesCount=Math.ceil(filteredBugs.length/pageSize)
    
    

    filteredBugs = filteredBugs.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize)
    results.bugs=filteredBugs
    
    return Promise.resolve(results)
}

function get(_id){
    return Promise.resolve(bugs.find(bug => bug._id === _id))
}

function save(bug) {
    if (bug._id) {
        const idx = bugs.findIndex(currBug => currBug._id === bug._id)
        if (idx === -1) return Promise.reject('Bug not found')
        bugs[idx] = { ...bugs[idx], ...bug }
        //bugs.splice(idx, 1, bug)
    } else {
        bug._id = utilService.makeId()
        bug.createdAt=Date.now()
        bug.labels=_createLabels()
        bugs.unshift(bug)
    }
   
    // console.log('bugToAdd',bug)

    _saveBugsToFile()
    return Promise.resolve(bug)
}

function remove(_id) {
    const idx = bugs.findIndex(bug => bug._id === _id)
    bugs.splice(idx, 1)
    _saveBugsToFile()
    return Promise.resolve()
}

function _createLabels(){
    var labels= [ 'critical','dev-branch','need-CR' ]
    const index= utilService.getRandomIntInclusive(0,2)
    var labelToAdd=[labels[index]]
    return labelToAdd
}

function _readJsonFile() {
    const contents = fs.readFileSync('data.json', 'utf8')
    return JSON.parse(contents)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs,null ,2)
        fs.writeFile('data.json', data, (err) => {
            if (err) {
                return reject(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}



