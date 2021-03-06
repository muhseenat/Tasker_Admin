import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from '../axios';
import Chart from 'chart.js/auto';

//data for bar chart
const data = {
	labels: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	datasets: [
		{
			label: "Sales/ month",
			fill: true,
			lineTension: 0.1,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: "miter",
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 0,
			pointHoverRadius: 0,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 0,
			pointRadius: 0,
			pointHitRadius: 0,
			data: [65, 59, 80, 81, 56, 55, 40, 57, 40, 48, 59, 62],
		},
	],
};




function Content() {
	const [chartData, setChartData] = useState([])
	const [linearChart, seLinearChart] = useState([])
	const [userCount, setUserCount] = useState(0)
	const [linearChartData, setLinearChartData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
	const [jobCount, setJobCount] = useState(0)
	const [jobDone, setJobDone] = useState(0)
	const [appliedJobCount, setAppliedJobCount] = useState(0)

	useEffect(() => {
		axios.get('/all/jobs/sts').then((resp) => {
			setChartData(resp?.data);
			resp?.data.map((i) => {
				if (i._id == "Done") {
					setJobDone(i.count)
				}
			})
		}).catch(err => { console.log(err) })
		//user count
		axios.get('/users/count').then((resp) => {
			setUserCount(resp?.data)

		}).catch(err => { console.log(err) })
		//job count
		axios.get('/jobs/count').then((resp) => {
			setJobCount(resp?.data)


		}).catch(err => { console.log(err) })
		//applied job count
		axios.get('/users/count').then((resp) => {
			setAppliedJobCount(resp?.data)

		}).catch(err => { console.log(err) })
		//users by month
		axios.get('/all/user/statics').then((resp) => {
			let sample=resp?.data||[]
			setLinearChartData((prev)=>{
				sample.forEach(element => {
					prev[element._id-1]=element.total

				});
				return prev;
			})

		}).catch(err => console.log(err))
	}, [])

	//doughnut chart data set
	const data1 = {
		labels: chartData.map((i) => i?._id),
		datasets: [
			{
				data: chartData.map((i) => i?.count),
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};
	//data for bar chart
	const data = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		datasets: [
			{
				label: "Users/ month",
				fill: true,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 0,
				pointHoverRadius: 0,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 0,
				pointRadius: 0,
				pointHitRadius: 0,
				data: linearChartData
			},
		],
	};

	return (
		<div className={styles.contentcontainer}>
			<div className={styles.contentwrapper}>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h5>USERS</h5>
						<p>TOTAL USERS: {userCount}</p>
					</div>
				</div>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h5>JOBS</h5>
						<p>TOTAL JOBS: {jobCount}</p>

					</div>
				</div>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h5>APPLIED JOBS</h5>
						<p>TOTAL : {appliedJobCount}</p>

					</div>
				</div>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h5>JOB DONE</h5>
						<p>TOTAL :{jobDone}</p>

					</div>
				</div>
			</div>
			{/* chart started  */}
			<div className={styles.charts}>
				<div className={styles.bar}>
					<h2>Users</h2>
					{/* linechart */}
					<Line data={data} width={400} height={400} />
				</div>
				<div className={styles.circle}>
					<h2>Job Status</h2>
					{/* dognut chart */}
					<Doughnut data={data1} width={400} height={400} />
				</div>
			</div>
		</div>
	);
}

export default Content;