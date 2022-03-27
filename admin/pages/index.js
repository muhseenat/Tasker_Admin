import {useEffect} from 'react'
import { useRouter } from 'next/router';
const dashboard = () => {

    const router=useRouter();

    // const token = localStorage.getItem('adminToken');
    // console.log(token);
    console.log('tokennnn');
    const token=false;
    if(!token){
    router.push({
      pathname:'/login'
    })
    return false;
    }
if(token){
 return (
    <div>
     
     <h4>WELCOME TO DASHBOARD</h4>

    <style jsx>
        {
            `h4{
                
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 30px;
	color: #6600FF;
	text-align: center;
  
            }`
        }
    </style>

  
    </div>
  )}
}


export default dashboard