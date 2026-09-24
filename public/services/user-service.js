
export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getUserDetailsDefult
}

const url = 'http://localhost:3034/api/auth'

function login(user){

}

function signup(user){
    return axios.post(url+'/signup',user)
    .then(res => {
        console.log('res',res.data)
    })
    .catch(err => {'Cannot add bug',err})
}



function logout(){}

function getLoggedinUser(){}

function getUserDetailsDefult(){
    return {
        userName:'',
        password:'',
        fullName:''
    }
}