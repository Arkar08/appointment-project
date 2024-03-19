import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";


const Addappointment = () => {
    const [isClose , setIsClose] = useState(false)
    const [isOpen , setIsOpen] = useState(false);
    const [patients , setPatients] = useState([]);
    const [doctors , setDoctors]  = useState([]);
    const [rooms , setRooms] = useState([]);
    const [isroom , setIsRoom] = useState(false)
    const [input , setInput] = useState('');
    const [doctorInput , setDoctorInput] = useState('')

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
    const handelOption = (name) =>{
        setInput(name)
        setIsOpen(false)
    }
    const handelDoctorOption = (name) =>{
        setDoctorInput(name);
        setIsClose(false)
    }
    const handelClear = () =>{
        setInput('');
        setIsOpen(false)
    }
    const handelDoctorClear = () =>{
        setDoctorInput('')
        setIsClose(false)
    }
  return (
    <>
        <form className="flex justify-center items-center mt-8">
            <div className="border w-[350px] h-[100%] shadow-lg rounded-lg mb-4">
                <h2 className="text-center pt-2 text-3xl text-bold">Made An Appointment</h2>
                <div className="relative w-[100%] h-[80px] px-4 mt-2">
                    <label className="font-bold text-xl">Patient Name</label>
                    <div className="relative h-[40px] mt-2">
                        <input type="text" className="border w-[100%] h-[100%] p-2 rounded-md" name="patient" value={input} onChange={handleChange}/>
                        <div className="absolute top-2 right-2 cursor-pointer flex items-center justify-center">
                            <HiOutlineXMark   size={25} onClick={handelClear}/>
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
                    <label className="font-bold text-xl">Doctor Name</label>
                    <div className=" relative h-[40px] mt-2">
                        <input type="text" className="border w-[100%] h-[100%] p-2 rounded-md" name="doctor" value={doctorInput} onChange={handleDoctorChange}/>
                        <div className="absolute top-2 right-2 cursor-pointer flex items-center justify-center">
                            <HiOutlineXMark   size={25} onClick={handelDoctorClear}/>
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
                    <label className="text-xl font-bold">Date</label>
                    <input type="datetime-local" className="w-[80%] mt-2 border rounded-md h-[100%]"/>
                </div>
                <div className="relative w-[100%] h-[80px] px-4 mt-2">
                    <label className="font-bold text-xl">Room No</label>
                    <div className=" relative h-[30px] mt-2">
                        <input type="text" className="border w-[100%] h-[100%] p-2 rounded-md"/>
                        <MdKeyboardArrowDown className="absolute top-0 right-4 cursor-pointer" size={30} onClick={handleRoom}/>
                    </div>
                    <div className={`${isroom ?'block border absolute w-[90%] h-[100px] overflow-y-scroll text-center bg-black z-10':"hidden"}`}>
                        {
                            rooms.map((room ,index)=>{
                                return (
                                    <option value={room.No} key={index} className="border cursor-pointer text-xl font-semibold text-white hover:bg-gray-500">{room.No}</option>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex w-[100%] h-[40px] mt-4 px-4">
                    <label className="text-xl font-bold mr-4 text-center">Status</label>
                    <select name="Status" id="Status" className="w-[100%] border rounded-md h-[100%]">
                        <option value="approved" className="texl-xl font-semibold">Approved</option>
                        <option value="processing" className="texl-xl font-semibold">Processing</option>
                        <option value="cancel" className="texl-xl font-semibold">Cancel</option>
                    </select>
                </div>
                <div className="flex items-center justify-center m-4">
                    <input type="submit"  className="py-2 w-[200px] bg-gray-400 cursor-pointer text-xl font-semibold rounded-md"/>
                </div>
            </div> 
        </form>
    </>
  )
}

export default Addappointment;