import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { wrapper } from '../store'

function MyApp({ Component, pageProps }) {

  const admin = useSelector(state => state.admin.adminData)

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp);
