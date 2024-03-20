import { FaSquarePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Allappointment = () => {
    const [user , setUser] = useState([]);
    const [search , setSearch] = useState('');

    const reloadClick = () =>{
        window.location.reload()
    }
    useEffect(()=>{
        const getData = async()=>{
                await axios.get('http://localhost:3000/users')
                .then(res => 
                    setUser(res.data)
                ).catch(err=>{
                    console.log(err)
                })
           
        } 
        getData()
    })
    const navigate = useNavigate();
    const handleDelete = (id) =>{
      let text = confirm('Are you sure for delete?');
      if(text){
        axios.delete(`http://localhost:3000/users/${id}`)
        .then(res =>{
            console.log(res.data)
            navigate('/appointment')
        })
        .catch(err=>{
            console.log(err.message)
        })
      }
    }
  return (
    <>
        <div className="flex justify-between items-center px-12 mt-4 p-4 bg-blue-300 shadow-md">
            <div className="icon flex justify-start items-center">
                <Link to='/appointment/add'><FaSquarePlus size={30} className="cursor-pointer mr-4"/></Link>
                <MdFilterList size={30} className="cursor-pointer mr-4"/>
                <AiOutlineReload size={30} className="cursor-pointer" onClick={reloadClick}/>
            </div>
            <form className="w-[350px] rounded-md flex justify-start items-center">
                <label className="text-xl text-black mr-2 select-none">Search:</label>
                <input type="text" placeholder="Search ID..." className="border w-[100%] p-2 rounded-t-md rounded-b-md" value={search} onChange={(e) =>{setSearch(e.target.value)}}/>
            </form>
        </div>
        <table className="w-[100%] border-collapse text-center mt-4 border select-none">
            <thead>
                <tr className="text-center h-[50px]  bg-gray-400 ">
                    <th>
                        Action
                    </th>
                    <th>
                        Appointment ID
                    </th>
                    <th>
                        Patient Name
                    </th>
                    <th >
                        Doctor Name  
                    </th>
                    <th >
                        Appointment Date
                    </th>
                    <th >
                        Room ID  
                    </th>
                    <th >
                        Token ID
                    </th>
                    <th>Status</th>
                    <th>Is Cancel</th>
                </tr>
            </thead>
            <tbody className="bg-slate-300">    
            {
                    user.filter((u)=>{
                        return search.toLowerCase() === ''? u : u.id.toLowerCase().includes(search) || u.patientId.toLowerCase().includes(search) || u.doctorId.toLowerCase().includes(search)
                        || u.roomId.toString().includes(search) || u.status.toLowerCase().includes(search)
                    })
                    .map((d)=>{
                        return(
                    <tr className="border-b h-[50px]  hover:bg-gray-500 hover:text-white" key={d.id}>
                        <td className="flex justify-center items-center text-center mt-4">
                            <Link to={`/appointment/edit/${d.id}`}><MdEdit size={20} className="cursor-pointer"/></Link>
                            <AiOutlineDelete size={20} onClick={()=>handleDelete(d.id)} className="cursor-pointer"/>
                        </td>
                        <td>{d.id}</td>
                        <td>{d.patientId}</td>
                        <td>{d.doctorId}</td>
                        <td>{moment(d.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        <td>{d.roomId}</td>
                        <td></td>
                        <td>{d.status}</td>
                        <td>
                            <button type="submit" className="px-2 bg-red-300">Cancel</button>
                        </td>
                    </tr>
                    )})
                } 
            </tbody>
        </table>
        <div className="footer">
            <Footer />
        </div>
    </>
  )
}

export default Allappointment;