import React from 'react'
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBookOpen,
	faCog,
	faHeart,
	faRocket,
	faSignOutAlt,
	faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    return (
		<div className={styles.navcontainer}>
			<div className={styles.logo}>
				<h2>Tasker</h2>
			</div>
			<div className={styles.wrapper}>
				<ul>
					<li>
						<FontAwesomeIcon
							icon={faTachometerAlt}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<Link href='/'><a>Dashboard</a></Link>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faRocket}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
		            <Link href='/category'><a>Category</a></Link>

					</li>
					<li>
						<FontAwesomeIcon
							icon={faBookOpen}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Job Providers</a>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faHeart}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Taskers</a>
					</li>
					
					<li>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							style={{ width: "18px", cursor: "pointer" }}
						/>{" "}
						<a href="#">Logout</a>
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