import {  useParams } from "react-router-dom"
import {  useEffect } from "react";
import axios from "axios";


const Updateappointment = () => {
    const {id} = useParams();

    useEffect(()=>{
        const getData = async()=>{
                await axios.get('http://localhost:3000/users'+'/'+id)
                .then(res => 
                    console.log(res.data)
                ).catch(err=>{
                    console.log(err)
                })
           
        } 
        getData();
    })
  return (
    <form className="flex justify-center items-center mt-8">
        <div className="border w-[350px] h-[100%] shadow-lg rounded-lg mb-4">       
            <h2 className="text-center pt-2 text-3xl font-bold text-red-600">Update A Appointment</h2>
            <div className=" w-[100%] h-[80px] px-4 mt-4">
                <label className="font-bold text-xl">Patient Name</label>
                <input type="text" placeholder="Patient Name" className="border w-[100%] h-[40px] p-2 rounded-md mt-2"/>
            </div>
            <div className=" w-[100%] h-[80px] px-4 mt-2">
                <label className="font-bold text-xl">Doctor Name</label>
                <input type="text" placeholder="Doctor Name" className="border w-[100%] h-[40px] p-2 rounded-md mt-2"/>
            </div>
            <div className=" w-[100%] h-[80px] px-4 mt-2">
                <label className="font-bold text-xl">Room No</label>
                <input type="number" placeholder="Room No" className="border w-[100%] h-[40px] p-2 rounded-md mt-2" />
            </div>
            <div className=" w-[100%] h-[50px] px-4 mt-2">
                <label className="font-bold text-xl">Date:</label>
                <input type="datetime-local" className="w-[80%] mt-2 border rounded-md h-[40px]"/>
            </div>
            <div className=" w-[100%] h-[80px] px-4 mt-2">
                <label className="font-bold text-xl">Status</label>
                <input type="text" placeholder="Status" className="border w-[100%] h-[40px] p-2 rounded-md mt-2"/>
            </div>
            <div className="flex items-center justify-center m-4">
                <input type="submit" className="py-2 w-[200px] bg-gray-400 cursor-pointer text-xl font-semibold rounded-md"/>
            </div>
        </div>
    </form>
  )
}

export default Updateappointment;