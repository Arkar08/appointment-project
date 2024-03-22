import { FaSquarePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Allappointment = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [miniPageNumberLimit, setMiniPageNumberLimit] = useState(0);
  const pages = [];

  for (let i = 1; i <= Math.ceil(user.length / itemPerPage); i++) {
    pages.push(i);
  }
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentIndex = user.slice(firstIndex, lastIndex);

  const pageClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const prevClick = () => {
    setCurrentPage((prev) => prev - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMiniPageNumberLimit(miniPageNumberLimit - pageNumberLimit);
    }
  };
  const nextClick = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMiniPageNumberLimit(miniPageNumberLimit + pageNumberLimit);
    }
  };
  const reloadClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:3000/users")
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  });
  const navigate = useNavigate();
  const handleDelete = (id) => {
    let text = confirm("Are you sure for delete?");
    if (text) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
          console.log(res.data);
          navigate("/appointment");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const handleCancel = (id) => {
    axios
      .put(`http://localhost:3000/users/${id}`, {
        status: "Cancelled",
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const tenClick = (e) => {
    setItemPerPage(Number(e.target.value));
  };
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <div className="flex justify-between items-center px-12  p-4 bg-blue-300 shadow-md">
        <div className="icon flex justify-start items-center">
          <Link to="/appointment/add">
            <FaSquarePlus size={28} className="cursor-pointer mr-4" />
          </Link>
          <MdFilterList size={28} className="cursor-pointer mr-4" />
          <AiOutlineReload
            size={28}
            className="cursor-pointer"
            onClick={reloadClick}
          />
        </div>
        <form className="w-[350px] rounded-md flex justify-start items-center">
          <label className="text-xl text-black mr-2 select-none">Search:</label>
          <input
            type="text"
            placeholder="Search ID..."
            className="border w-[100%] p-2 rounded-t-md rounded-b-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="max-h-[531px] overflow-y-scroll">
        <table className="w-[100%] border-collapse text-center mt-4">
          <thead className="sticky top-0">
            <tr className="text-center h-[50px] bg-gray-400">
              <th>Action</th>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Appointment Date</th>
              <th>Room ID</th>
              <th>Token ID</th>
              <th>Status</th>
              <th>Is Cancel</th>
            </tr>
          </thead>
          <tbody className="bg-slate-300">
            {currentIndex
              .filter((u) => {
                return search.toLowerCase() === ""
                  ? u
                  : u.id.toLowerCase().includes(search) ||
                      u.patientId.toLowerCase().includes(search) ||
                      u.doctorId.toLowerCase().includes(search) ||
                      u.roomId.toString().includes(search) ||
                      u.status.toLowerCase().includes(search);
              })
              .map((d) => {
                return (
                  <tr
                    className="border-b h-[46px]  hover:bg-gray-500 hover:text-white"
                    key={d.id}
                  >
                    <td className="flex justify-center items-center text-center mt-2">
                      <Link to={`/appointment/edit/${d.id}`}>
                        <MdEdit size={20} className="cursor-pointer" />
                      </Link>
                      <AiOutlineDelete
                        size={20}
                        onClick={() => handleDelete(d.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td>{d.id}</td>
                    <td>{d.patientId}</td>
                    <td>{d.doctorId}</td>
                    <td>{moment(d.date).format("MMMM Do YYYY, h:mm:ss a")}</td>
                    <td>{d.roomId}</td>
                    <td></td>
                    <td>{d.status}</td>
                    <td>
                      <button
                        type="submit"
                        className="px-2 bg-red-300"
                        onClick={() => handleCancel(d.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-4 my-8 w-[100%] h-[40px] bg-slate-400 shadow-md fixed bottom-0">
        <h2 className="text-xl text-white">
          Page {currentPage} to {pages.length} of {pages.length} results
        </h2>
        <select className="border w-[50px]" onClick={tenClick}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div className="pagination">
          <button
            type="button"
            className="py-1 w-[40px] bg-white mr-1 cursor-pointer rounded-sm"
            onClick={prevClick}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
          {pages.map((p, index) => {
            if (p < maxPageNumberLimit + 1 && p > miniPageNumberLimit) {
              return (
                <button
                  type="button"
                  className={
                    currentPage === p
                      ? "bg-red-400 py-1 mr-1 w-[30px] cursor-pointer text-white rounded-sm"
                      : "py-1 w-[30px] bg-white mr-1 cursor-pointer rounded-sm"
                  }
                  key={index}
                  id={p}
                  onClick={pageClick}
                >
                  {p}
                </button>
              );
            } else {
              return null;
            }
          })}
          <button
            type="button"
            className="py-1 w-[40px] bg-white mr-1 cursor-pointer rounded-sm"
            onClick={nextClick}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Allappointment;
