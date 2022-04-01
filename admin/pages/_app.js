import '../styles/globals.css'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {

  const user=true;
  return (
    <>
 {user&&<Sidebar/>}
 {user&&<Navbar/>}

  <Component {...pageProps} />
  </>
  )
}

export default MyApp
