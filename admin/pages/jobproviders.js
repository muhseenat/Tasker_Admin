import { useRouter } from 'next/router'
import axios from '../axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useMemo } from "react";
import styles from "../styles/Home.module.css";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const TableHeader = dynamic(() => import('../components/DataTable/Header'))
const Pagination = dynamic(() => import('../components/DataTable/Pagination'))
const Search = dynamic(() => import('../components/DataTable/Search'))


const JobProviders = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 3;
    const router = useRouter()
    const { id } = router.query;

    const headers = [
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Total Job", field: "count", sortable: true },
        { name: "Status", field: "status", sortable: false }
    ];

    useEffect(() => {

        const getData = () => {

            axios.get(`/providers`).then((resp) => {
                setComments(resp?.data);

            }).catch(err => console.log(err))

        };

        getData();
    }, []);

    //CHANGE STATUS
    const changeStatus = (id) => {
        const data = {
            id,
            provider: true
        }
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.put('/providers/status/change/', data).then((resp) => {
                    setComments(resp?.data);
                    swal("Changes updated successfully", {
                        icon: "success",
                      });
                    }).catch(err => console.log(err))
       
                } else {
                    swal("There is no change occur");
                  }
                });

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
            <Sidebar />
            <Navbar />
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
                                    {commentsData.map((comment, index) => (
                                        <tr key={index}>
                                            <th scope="row" >
                                                {comment?.name}
                                            </th>
                                            <td>{comment?.email}</td>
                                            <td>{comment?.count}</td>
                                            <td>{(comment?.status) ? "Active" : "Blocked"}</td>
                                            <td onClick={(e) => { changeStatus(comment._id) }}>
                                                <FontAwesomeIcon
                                                    icon={faTimesCircle}
                                                    style={{ width: "18px", cursor: "pointer", color: "dark" }}
                                                />{" "}
                                            </td>

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

export default JobProviders 
