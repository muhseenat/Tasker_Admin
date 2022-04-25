import Head from 'next/head'
import styles from '../styles/Login.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAdminDetails } from '../store/actions/adminAction'
import axios from '../axios'

export default function Home() {

  const admin=   typeof window !== 'undefined'&& localStorage.getItem('admin')


  const router = useRouter();

  if (admin) {
    typeof window !== 'undefined' && router.push({
      pathname: '/'
    })
  }


  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");




  const handleLogin = async (e) => {
    e.preventDefault()
    const data = { email, password }
    try {
      const res = await axios.post('/login', data)
      if (res) {
        localStorage.setItem('admin', JSON.stringify(res.data))
        dispatch(setAdminDetails(res.data))
        router.push({
          pathname: '/',
          query: { returnUrl: router.asPath }
        })
      }
    } catch (error) {

      setError(error.response?.data.errorMessage)
    }

  }

  return (
    <div className={styles}>
      <Head>
        <title>Tasker Admin</title>
        <meta name="Tasker-job portal" content="Admin Dashboard" />
        <link rel="icon" href="/admin.png" />
      </Head>

      <div className={styles.login}>
        <div className={styles.form}>
          <form className={styles.loginform} onSubmit={handleLogin}>
            <h3 className={styles.heading}>Admin Login</h3>
            <input type="text" placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
            {error && <p className={styles.error} >{error}</p>}
            <button type="submit"> login</button>
          </form>
        </div>
      </div>
      <style global jsx>
        {
          `html,body{
      background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);

     }`
        }

      </style>
    </div>
  )
}
