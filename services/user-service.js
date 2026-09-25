import fs from 'fs'

import { utilService } from "./util-service.js"

export const userService = {
   query,
   add
}

const users = _readUserJsonFile()


function query(){
    console.log(users)
    return users
}

function add(user={}){
    return getByUsername(user.userName)
    .then(userEX=>{
        if(userEX) return Promise.reject('Username taken')
       
    user._id=utilService.makeId()
    users.push(user)
    
    return _saveUsersToFile()
    .then(()=>{
        user={...user}
        delete user.password
        return user
    })
 })
}

function getByUsername(userName) {
        
	var user = users.find(user => user.userName === userName)
    return Promise.resolve(user)
}

function _readUserJsonFile() {
    const contents = fs.readFileSync('user.json', 'utf8')
    return JSON.parse(contents)
}

function _saveUsersToFile() {
	return new Promise((resolve, reject) => {
		const usersStr = JSON.stringify(users, null, 2)
		fs.writeFile('user.json', usersStr, err => {
			if (err) {
				return console.log(err)
			}
			resolve()
		})
	})
}