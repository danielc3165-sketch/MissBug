import fs from 'fs'
import Cryptr from 'cryptr'

import { utilService } from "./util-service.js"


const cryptr = new Cryptr('secret-puk-1234')

export const userService = {
   query,
   add,
   checkLogin,
   getLoginToken,
   validateToken,
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

function checkLogin({userName,password}){
    return getByUsername(userName)
    .then(user=>{
    if(user && password===user.password){
    user = {...user}
    delete user.password
    return Promise.resolve(user)
    } 
    else return Promise.reject()
})
}

function getByUsername(userName) {
	var user = users.find(user => user.userName === userName)
    return Promise.resolve(user)
}

function validateToken(token){
   if(!token) return null

   const str = cryptr.decrypt(token)
   const user = JSON.parse(str)
   return user
}

function getLoginToken(user) {
	const str = JSON.stringify(user)
	const encryptedStr = cryptr.encrypt(str)
	return encryptedStr
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