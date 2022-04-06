import React from 'react'
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../store/actions/adminAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faFolder,
	faBriefcase,
	faSignOutAlt,
	faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';



const Sidebar = () => {

	const router = useRouter()
	const dispatch = useDispatch();
	const handleLogout = () => {
		localStorage.removeItem("admin")
		dispatch(setAdminDetails(null))
		router.push('/login')

	}
	return (
		<div className={styles.navcontainer}>
			<div className={styles.logo}>
				<img style={{ marginLeft: "20px" }} src="./logo.png" />
				<h2 >Tasker</h2>
			</div>
			<div className={styles.wrapper}>
				<ul>
					<li>
						<FontAwesomeIcon
							icon={faTachometerAlt}
							style={{ width: "18px", cursor: "pointer", color: "white" }}
						/>{" "}
						<Link href='/'><a>Dashboard</a></Link>
					</li>
					<li><FontAwesomeIcon
						icon={faFolder}
						style={{ width: "18px", cursor: "pointer", color: "white" }}
					/>{" "}
						<Link href='/category'><a>Category</a></Link>

					</li>
					<li>
						<FontAwesomeIcon
							icon={faBriefcase}
							style={{ width: "18px", cursor: "pointer", color: "white" }}
						/>{" "}
						<a href="#">Job Providers</a>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faUser}
							style={{ width: "18px", cursor: "pointer", color: "white" }}
						/>{" "}
						<a href="#">Taskers</a>
					</li>

					<li onClick={handleLogout}>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							style={{ width: "18px", cursor: "pointer", color: "white" }}
						/>{" "}
						<a href="">Logout</a>
					</li>
				</ul>
			</div>
			<style jsx>
				{
					`
					
a {
	color: #FFFEFD;
	text-decoration: none;
  }`
				}
			</style>
		</div>

	);
}

export default Sidebar