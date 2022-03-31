import React from 'react';
import Image from 'next/image';
import styles from "../styles/Home.module.css";
import adminProfile from '../images/images.png';
const Navbar = () => {
    return (
		<div className={styles.headcontainer}>
			<div className={styles.headwrapper}>
				<div className={styles.title}>
					<h2>
						Hello, <span>Admin</span>
					</h2>
					<p>welcome to the board.</p>
				</div>
				<div className={styles.profile}>
					<Image src={adminProfile} width="40px" height="40px"  alt="profile" className={styles.image}  />
				</div>
			</div>
		</div>
	);
}

export default Navbar