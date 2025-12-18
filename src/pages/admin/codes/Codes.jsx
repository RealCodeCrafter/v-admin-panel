// import React, { useState } from 'react'
// import './codes.scss'
// import { IoMdSettings } from 'react-icons/io'
// import { VscDebugRestart } from 'react-icons/vsc'
// import { FiSearch } from 'react-icons/fi'
// import { useGetCodesQuery } from '../../../context/api/codesApi'

// const Codes = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [activeTab, setActiveTab] = useState('codes')

//   const { data } = useGetCodesQuery()
//   console.log(data?.data);

//   return (
//     <div className='codes'>
//       <div className='codes__controls'>
//         <div className='codes__controls__search'>
//           <span className='codes__controls__search-icon'><FiSearch /></span>
//           <input
//             type='text'
//             placeholder='Search'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className='codes__controls__actions'>
//           <select className='codes__controls__select'>
//             <option>All data</option>
//           </select>
//           <button className='codes__controls__btn codes__controls__btn--download'><VscDebugRestart /></button>
//           <button className='codes__controls__btn codes__controls__btn--add'><IoMdSettings /></button>
//         </div>
//       </div>

//       <div className='codes__table-wrapper'>
//         <table className='codes__table'>
//           <thead>
//             <tr>
//               <th>Index</th>
//               <th>Value</th>
//               <th>Gift</th>
//               <th>Used by</th>
//               <th>Phone Number</th>
//               <th>Used at</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data?.data
//               ?.filter(item => item?.usedBy)
//               .map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{item?.index}</td>
//                   <td className='code-value'>{item?.value}</td>
//                   <td>{item?.gift ? item?.gift : "-"}</td>
//                   <td>
//                     <span className='user-badge'>{item?.usedBy?.fullName}</span>
//                   </td>
//                   <td className='user-badge'>{item?.usedBy?.phoneNumber}</td>
//                   <td className='date'>{item?.usedAtFormatted}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Codes

import React, { useState } from 'react'
import './codes.scss'
import { IoMdSettings } from 'react-icons/io'
import { VscDebugRestart } from 'react-icons/vsc'
import { FiSearch } from 'react-icons/fi'
import { useGetCodesQuery } from '../../../context/api/codesApi'

const Codes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isFetching } = useGetCodesQuery()
  console.log(data);
  

  const formatUzTime = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString)
    const uzTime = new Date(date.getTime() + 5 * 60 * 60 * 1000)

    return uzTime.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const filteredData = data?.data
    ?.filter(item => item?.usedBy)
    ?.filter(item => {
      const search = searchTerm.toLowerCase()

      return (
        item?.value?.toLowerCase().includes(search) ||
        item?.usedBy?.fullName?.toLowerCase().includes(search) ||
        item?.usedBy?.phoneNumber?.includes(search)
      )
    }) || []

  return (
    <div className='codes'>
      <div className='codes__controls'>
        <div className='codes__controls__search'>
          <span className='codes__controls__search-icon'><FiSearch /></span>
          <input
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='codes__controls__actions'>
          <select className='codes__controls__select'>
            <option>All data</option>
          </select>
          <button className='codes__controls__btn codes__controls__btn--download'><VscDebugRestart /></button>
          {/* <button className='codes__controls__btn codes__controls__btn--add'><IoMdSettings /></button> */}
        </div>
      </div>

      <div className='codes__table-wrapper'>
        <table className='codes__table'>
          
          <thead>
            <tr>
              <th>Index</th>
              <th>Value</th>
              <th>Gift</th>
              <th>Used by</th>
              <th>Phone Number</th>
              <th>Used at</th>
            </tr>
          </thead>

          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item?.index}</td>
                  <td className='code-value'>{item?.value}</td>
                  <td>{item?.gift || "-"}</td>
                  <td>
                    <span className='user-badge'>{item?.usedBy?.firstName}</span>
                  </td>
                  <td className='user-badge'>{item?.usedBy?.phoneNumber}</td>
                  <td className='date'>{formatUzTime(item?.usedAtFormatted)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Codes
