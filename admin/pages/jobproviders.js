import { useRouter } from 'next/router'
import axios from '../axios'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
const TableHeader = dynamic(() => import('../components/DataTable/Header'))
const Pagination = dynamic(() => import('../components/DataTable/Pagination'))
const Search = dynamic(() => import('../components/DataTable/Search'))


const jobProviders = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    // const user = useSelector(state => state.user.userData)
    const ITEMS_PER_PAGE = 3;
    const router = useRouter()
    const { id } = router.query;

    const headers = [
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Total Job", field: "counr", sortable: true },
        { name: "Status", field: "status", sortable: false }
    ];
    // const statusOption = ['Pending', 'Approved', 'Done']
//     let comments=[
//         {
//         name:"Muc",
//         email:"Muckts",
//         place:"ktd",
//         details:"gjgjgj",
//         status:"active"
//     },
//     {
//         name:"Muc",
//         email:"Muckts",
//         place:"ktd",
//         details:"gjgjgj",
//         status:"active"
//     },
// ]
    useEffect(() => {

        const getData = () => {

            axios.get(`/providers`).then((resp) => {
                console.log(resp?.data);
                setComments(resp?.data);

            }).catch(err => console.log(err))

        };

        getData();
    }, []);
    console.log(comments, 'this is comments');

    //CHANGE STATUS
    const changeStatus = (e, id, userId, jobId) => {
        const data = { sts: e.target.value, id, userId, jobId }
        axios.put('/change/status', data).then((resp) => {
            console.log(resp);
        }).catch(err => console.log(err))

    }




    //search function
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);


    return (
        <>
          <Sidebar/>
            <Navbar/>
            <div className={styles.contentcontainer}>
            <div className='container mt-5'>
                <h3 className='text-center'>Job Providers</h3>

                <div className="row w-100">
                    <div className="col mb-3 col-12 text-center">
                        <div className="row">
                            <div className="col-md-6">
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-row-reverse">
                                <Search
                                    onSearch={value => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <table className="table table-striped">
                            <TableHeader
                                headers={headers}
                                onSorting={(field, order) =>
                                    setSorting({ field, order })
                                }
                            />
                            <tbody>
                                {commentsData.map((comment,index) => (
                                    <tr key={index}>
                                        <th scope="row" >
                                            {comment?.name}
                                        </th>
                                        <td>{comment?.email}</td>
                                        <td>{comment?.count}</td>
                                        <td>{(comment?.status) ? "Active":"Blocked"}</td>
                                        {/* <td>{comment?.qualification},{comment?.skill},{comment?.experience}</td> */}
                                        {/* <td>

                                            {comment?.status === ("Done") ? (
                                                comment?.status
                                            ) : (
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    defaultValue={comment?.status}
                                                    onChange={(e) => {
                                                        changeStatus(e, comment?._id, comment?.user_id, comment?.job_id);
                                                    }}

                                                >
                                                    {statusOption.map((i, index) => (
                                                        <MenuItem key={index} value={i}>
                                                            {i}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        </td> */}

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default jobProviders 
