import axios from 'axios'

const serverApi =axios.create({
    baseURL:"https://tasker-01.herokuapp.com/api/admin"
})
   
export default serverApi;