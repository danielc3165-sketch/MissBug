
export const userService = {
    login,
    signup,
    logout,
    getUserDetailsDefult,
    getLoggedinUser
}

const url = 'http://localhost:3034/api/auth'
const STORAGE_KEY_LOGGEDIN_USER='curr-user'


function login(user){
}

function signup(user){
    return axios.post(url+'/signup',user)
    .then(res => res.data)
    .then(user=> _setLoggedinUser(user))
    .catch(err => {'Cannot add bug',err})
}

function logout(){
    console.log('it work')
}

function getUserDetailsDefult(){
    return {
        userName:'',
        password:'',
        fullName:''
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


function _setLoggedinUser(user) {
    const { _id, fullName } = user
    const userToSave = { _id, fullName }
    
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}