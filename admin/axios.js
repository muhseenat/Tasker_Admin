import axios from 'axios'

const serverApi =axios.create({
    baseURL:"http://localhost:5050/api/admin"
})
   
export default serverApi;