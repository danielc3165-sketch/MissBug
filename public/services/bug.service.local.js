import { utilService } from './util.service.js'
import { userService } from './user-service.js'

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


function query(filterBy, pageIdx ,sortBy) {
    return axios.get(url,{ params:{filterBy, pageIdx, sortBy} })
    .then(res => res.data)
    .then(results => {
     return results
    })
}

function getById(bugId) {
    return axios.get(url + '/' + bugId, { withCredentials: true })
    .then(res => res.data)
    .then(bug =>{ return bug})
    .catch(err => {'Cannot get bug',err})
}

function remove(bugId) {
    return axios.delete(url+'/' + bugId)
    .then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        console.log('bug', bug)
        return axios.put(url+'/'+bug._id, bug)
        .then(res => res.data)
    }
     else {
        //console.log('bug', bug)
        const bugUser=userService.getLoggedinUser()
        bug.creator=bugUser
        return axios.post(url,bug)
        .then(res => res.data)
    }
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
    return { txt: '', minSeverity: 0, labels: []} 
}