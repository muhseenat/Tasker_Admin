import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import { useSelector } from 'react-redux';


const dashboard = () => {
  const admin=   typeof window !== 'undefined'&& localStorage.getItem('admin')
  const router = useRouter();
  if (!admin) {
    typeof window !== 'undefined' && router.push({
      pathname: '/login'
    })
    return true;
  }



  return (
    <div>
      <Sidebar />
      <Navbar />
      <Content />

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
  )
}


export default dashboard