import '../styles/globals.css'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import {wrapper} from '../store'

function MyApp({ Component, pageProps }) {

  const admin = useSelector(state=>state.admin.adminData)
  
  return (
    <>
    {/* //issue is here because these don't follow order */}
 {/* {admin&&<Sidebar/>}
 {admin&&<Navbar/>} */}
 <Sidebar/>
 <Navbar/>
  <Component {...pageProps} />
  </>
  )
}

export default  wrapper.withRedux(MyApp);
