import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bugs'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

var url = 'http://localhost:3034/api/bug'


function query(filterBy) {
    return fetch(url)
    .then(res => res.json())
    .then(bugs => {

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            bugs = bugs.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.minSeverity) {
            bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
        }

        return bugs
    })
}

function getById(bugId) {
    return fetch(url+'/' + bugId)
    .then(res => res.json())
    .then(bug =>{ return bug})
    .catch(err => {'Cannot get bug',err})
}

function remove(bugId) {
    return fetch(url+'/' + bugId+'/remove')
    .then(res => res.json())
}

function save(bug) {
    var queryParams = '?title='+bug.title+'&severity='+bug.severity+'&description='+bug.description
    if (bug._id) queryParams += '&id='+bug._id
     return fetch(url+'/save'+queryParams)
    .then(res => res.json())
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (bugs && bugs.length > 0) return 

    bugs = [
        {
            title: "Infinite Loop Detected",
            severity: 4,
            _id: "1NF1N1T3"
        },
        {
            title: "Keyboard Not Found",
            severity: 3,
            _id: "K3YB0RD"
        },
        {
            title: "404 Coffee Not Found",
            severity: 2,
            _id: "C0FF33"
        },
        {
            title: "Unexpected Response",
            severity: 1,
            _id: "G0053"
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, bugs)
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}