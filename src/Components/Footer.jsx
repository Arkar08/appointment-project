

const Footer = () => {
  return (
    <div className="flex justify-between items-center px-4 mt-4">
        <h2>page 1 to 6 of 6 results</h2> 
        <select className="border">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <div className="pagination">
            <button type="button" className="py-1 w-[30px] bg-slate-200 mr-1">1</button>
            <button type="button" className="py-1 w-[30px] bg-slate-200 mr-1">2</button>
            <button type="button" className="py-1 w-[30px] bg-slate-200 mr-1">3</button>
        </div>
    </div>
  )
}

export default Footer;