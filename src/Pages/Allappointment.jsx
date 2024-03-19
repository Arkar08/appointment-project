import { FaSquarePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Allappointment = () => {
    const [user , setUser] = useState([])

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
    const handleCancel = (statu) =>{
        const appUser = user.filter((u)=>{
            return u.id === statu.id
        })
        if(appUser){
            setUser(user.map((use)=>{
                return {
                    ...use , status:"Cancelled"
                }
            }))
        }
        else{
            return;
        }
    }
  return (
    <>
        <div className="flex justify-between items-center px-12 mt-4">
            <div className="icon flex justify-start items-center">
                <Link to='/appointment/add'><FaSquarePlus size={30} className="cursor-pointer mr-4"/></Link>
                <MdFilterList size={30} className="cursor-pointer mr-4"/>
                <AiOutlineReload size={30} className="cursor-pointer" onClick={reloadClick}/>
            </div>
            <form className="w-[350px] rounded-md flex justify-start items-center">
                <label className="text-xl text-black mr-2 select-none">Search:</label>
                <input type="text" placeholder="Search ID..." className="border w-[100%] p-2 rounded-t-md rounded-b-md"/>
            </form>
        </div>
        <table className="w-[100%] border-collapse text-center mt-4 border select-none">
            <thead>
                <tr className="text-center h-[50px]  bg-gray-400 ">
                    <th>
                        <input type="checkbox" className="cursor-pointer ml-2"/>
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
                    user.map((d)=>{
                        return(
                    <tr className="border-b h-[50px]  hover:bg-gray-500 hover:text-white" key={d.id}>
                        <td>
                            <input type="checkbox" className="cursor-pointer ml-2"/>
                        </td>
                        <td>{d.id}</td>
                        <td>{d.patientId}</td>
                        <td>{d.doctorId}</td>
                        <td>{d.date}</td>
                        <td>{d.roomId}</td>
                        <td></td>
                        <td>{d.status}</td>
                        <td>
                            <button type="submit" className="px-2 bg-red-300" onClick={()=>handleCancel(d.status)}>Cancel</button>
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