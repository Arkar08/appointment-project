import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Addappointment = () => {
    const [isClose , setIsClose] = useState(false);
    const [isOpen , setIsOpen] = useState(false);
    const [patients , setPatients] = useState([]);
    const [doctors , setDoctors]  = useState([]);
    const [rooms , setRooms] = useState([]);
    const [isroom , setIsRoom] = useState(false);
    const [input , setInput] = useState('');
    const [doctorInput , setDoctorInput] = useState('');
    const [roomInput , setRoomInput] = useState('');
    const [todate , setToDate] = useState('');
    const [getstatus , setGetStatus] = useState('');
    const navigate = useNavigate();
    const [userData , setUserData] = useState(
    {
        patientId:'',
        doctorId:'',
        roomId:'',
        date:'',
        status:''
    }
    );

    const handleOpen = () =>{
        setIsOpen(!isOpen);
    }
    const handleClick = () =>{
        setIsClose(!isClose)
    }
    const handleRoom = () =>{
        setIsRoom(!isroom)
    }
    useEffect(()=>{
        const getPatient = async() =>{
            const response = await fetch('http://localhost:3000/patient')
            const result = await response.json()
            setPatients(result);
        }
        getPatient();
    })
    useEffect(()=>{
        const getDoctor = async() =>{
            const response = await fetch('http://localhost:3000/Doctors')
            const result = await response.json()
            setDoctors(result);
        }
        getDoctor();
    })
    useEffect(()=>{
        const getRoom = async() =>{
            const response = await fetch('http://localhost:3000/Room')
            const result = await response.json();
            setRooms(result)
        }
        getRoom();
    })
    const handleChange = (e) =>{
        setInput(e.target.value)
        setIsOpen(false)
        if(input === ""){
            setIsOpen(true)
        }
    }
    const handleDoctorChange = (e) =>{
        setDoctorInput(e.target.value)
        setIsClose(false)
        if(doctorInput === ''){
            setIsClose(true)
        }
    }
    const handleRoomSearch = (e) =>{
        setRoomInput(e.target.value)
        setIsRoom(false)
        if(roomInput === ''){
            setIsRoom(true)
        }
    }
    const handelOption = (name) =>{
        setInput(name)
        setIsOpen(false)
    }
    const handelDoctorOption = (name) =>{
        setDoctorInput(name);
        setIsClose(false)
    }
    const handleRoomInput = (No) =>{
        setRoomInput(No)
        setIsRoom(false)
    }
    const handelClear = () =>{
        setInput('');
        setIsOpen(false)
    }
    const handelDoctorClear = () =>{
        setDoctorInput('')
        setIsClose(false)
    }
    const handleRoomClear = () =>{
        setRoomInput('');
        setIsRoom(false)
    }
    const handleStatus = (e) =>{
        setGetStatus(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3000/users', userData)
        .then(res=>{ 
            console.log(res.data)
            navigate('/appointment')
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <>
        <form className="flex justify-center items-center mt-8" onSubmit={handleSubmit}>
            <div className="border w-[350px] h-[100%] shadow-lg rounded-lg mb-4">
                <h2 className="text-center pt-2 text-3xl font-bold text-blue-300">Made An Appointment</h2>
                <div className="relative w-[100%] h-[80px] px-4 mt-2">
                    <label className="font-bold text-xl text-red-400">Patient Name</label>
                    <div className="relative h-[40px] mt-2">
                        <input type="text" className="border w-[100%] h-[100%] p-2 rounded-md" name="patientID" value={input} onChange={handleChange} placeholder="Patient Name"/>
                        <div className="absolute top-2 right-2 cursor-pointer flex items-center justify-center">
                            <HiOutlineXMark   size={25} onClick={handelClear} className={`${input  === '' ? "hidden":"block"}`}/>
                            <MdKeyboardArrowDown size={30} onClick={handleOpen}/>
                        </div>
                    </div>
                    <div className={`${isOpen ?'block border absolute w-[90%] h-[100px] overflow-y-scroll text-center z-10 bg-black':"hidden"}`}>
                        {
                            patients.filter((item)=>{
                                return input.toLowerCase() === ''? item : item.name.toLowerCase().includes(input)
                            }).map((patient )=>{
                                return (
                                    <option value={patient.name} key={patient.id} className="border cursor-pointer text-xl font-semibold text-white hover:bg-gray-500 text-center" onClick={() =>handelOption(patient.name)}>{patient.name}</option>
                                )
                            })
                        }
                    </div>
                </div>
                <div className=" relative w-[100%] h-[80px] px-4 mt-2">
                    <label className="font-bold text-xl text-red-400">Doctor Name</label>
                    <div className=" relative h-[40px] mt-2">
                        <input type="text" className="border w-[100%] h-[100%] p-2 rounded-md" name="doctorID" value={doctorInput} onChange={handleDoctorChange} placeholder="Doctor Name"/>
                        <div className="absolute top-2 right-2 cursor-pointer flex items-center justify-center">
                            <HiOutlineXMark   size={25} onClick={handelDoctorClear} className={`${doctorInput  === '' ? "hidden":"block"}`}/>
                            <MdKeyboardArrowDown size={30} onClick={handleClick}/>
                        </div>
                    </div>
                    <div className={`${isClose ?'block border absolute w-[90%] h-[100px] overflow-y-scroll text-center bg-black z-10':"hidden"}`}>
                        {
                            doctors.filter((item)=>{
                                return doctorInput.toLowerCase() === '' ? item : item.name.toLowerCase().includes(doctorInput)
                            }).map((doctor)=>{
                                return (
                                    <option value={doctor.name} key={doctor.id} className="border cursor-pointer text-xl font-semibold text-white hover:bg-gray-500" onClick={() =>handelDoctorOption(doctor.name)}>{doctor.name}</option>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-[100%] h-[80px] px-4 mt-2 flex flex-col">
                    <label className="text-xl font-bold text-red-400">Date</label>
                    <input type="datetime-local" className="w-[100%] mt-2 border rounded-md h-[100%]"value={todate} name="date" onChange={(e) => setToDate(e.target.value)}/>
                </div>
                <div className="relative w-[100%] h-[80px] px-4 mt-2">
                    <label className="font-bold text-xl text-red-400">Room No</label>
                    <div className=" relative h-[40px] mt-2">
                        <input type="number" className="border w-[100%] h-[100%] p-2 rounded-md" onChange={handleRoomSearch} name="roomId" value={roomInput} placeholder="Room No"/>
                        <div className="absolute top-2 right-6 cursor-pointer flex items-center justify-center">
                            <HiOutlineXMark   size={25} onClick={handleRoomClear} className={`${roomInput  === '' ? "hidden":"block"}`}/>
                            <MdKeyboardArrowDown size={30} onClick={handleRoom}/>
                        </div>
                    </div>
                    <div className={`${isroom ?'block border absolute w-[90%] h-[100px] overflow-y-scroll text-center bg-black z-10':"hidden"}`}>
                        {
                            rooms.filter((item)=>{
                                return roomInput.toString() === "" ? item : item.No.toString().includes(roomInput)
                            }).map((room ,index)=>{
                                return (
                                    <option value={room.No} key={index} className="border cursor-pointer text-xl font-semibold text-white hover:bg-gray-500" onClick={()=>handleRoomInput(room.No)}>{room.No}</option>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex w-[100%] h-[40px] mt-4 px-4">
                    <label className="text-xl font-bold mr-4 text-center text-sky-600">Status</label>
                    <select name="Status"  className="w-[100%] border rounded-md h-[100%] " onClick={handleStatus}>
                        <option value="Approved" className="texl-xl font-semibold text-gray-500">Approved</option>
                        <option value="Processing" className="texl-xl font-semibold text-gray-500">Processing</option>
                        <option value="Cancelled" className="texl-xl font-semibold text-gray-500">Cancel</option>
                    </select>
                </div>
                <div className="flex items-center justify-center m-4">
                    <input type="submit"  className="py-2 w-[200px] bg-green-400 text-white cursor-pointer text-xl font-semibold rounded-md" onClick={()=>setUserData(
            {...userData , patientId:input , doctorId:doctorInput , roomId:roomInput, date:todate, status:getstatus}
        )}/>
                </div>
            </div> 
        </form>
    </>
  )
}

export default Addappointment;