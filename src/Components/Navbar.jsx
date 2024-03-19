import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
        <ul className="flex justify-center items-center mt-8">
            <li className="p-4 bg-black text-white mr-4 rounded-md cursor-pointer">
                <Link to='/appointment' className="text-xl font-semibold">All Appiontments</Link>
            </li>
            <li className="p-4  bg-black text-white rounded-md cursor-pointer">
                <Link to='/appointment/add' className="text-xl font-semibold">Add an appiontment</Link>
            </li>
        </ul>
    </>
  )
}

export default Navbar