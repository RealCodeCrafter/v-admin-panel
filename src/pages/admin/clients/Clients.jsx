// import React, { useState, useMemo } from 'react';
// import { Search } from 'lucide-react';
// import './clients.scss';
// import { IoMdSettings } from 'react-icons/io';
// import { VscDebugRestart } from 'react-icons/vsc';
// import { useGetClientsQuery } from '../../../context/api/clientsApi';

// const formatDateUZ = (dateString) => {
//   if (!dateString) return '';
//   const date = new Date(dateString);

//   return date.toLocaleString('uz-UZ', {
//     timeZone: 'Asia/Tashkent',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// const Clients = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { data } = useGetClientsQuery();
//   console.log(data?.data?.length);

//   const filteredClients = useMemo(() => {
//     if (!searchTerm) return data?.data || [];

//     return data?.data?.filter((client) =>
//       client?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client?.phoneNumber?.includes(searchTerm)
//     );
//   }, [searchTerm, data]);

//   return (
//     <div className='clients'>
//       <div className="clients-header">
//         <div className="clients-header-controls">

//           <div className="clients-header-controls-search-box">
//             <Search className="clients-header-controls-search-box-icon" size={18} />
//             <input
//               type="text"
//               placeholder="Search name or phone"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="clients-header-controls-search-box-input"
//             />
//           </div>

//           <div className="clients-header-controls-action-buttons">
//             <button className="btn-action btn-download">Total: {data?.data?.length}</button>
//             <button className="btn-action btn-download" onClick={() => setSearchTerm('')}>
//               <VscDebugRestart />
//             </button>
//             <button className="btn-action btn-add">
//               <IoMdSettings />
//             </button>
//           </div>

//         </div>
//       </div>

//       <div className="clients-table">
//         <div className="clients-table-wrapper">
//           <table className="clients-table-wrapper-container">

//             <thead>
//               <tr>
//                 <th>First name</th>
//                 <th>Phone number</th>
//                 <th>Gifts count</th>
//                 <th>Register date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClients?.length > 0 ? (
//                 filteredClients.map((client) => (
//                   <tr key={client?._id}>
//                     <td>{client?.firstName}</td>
//                     <td>{client?.phoneNumber}</td>
//                     <td>{client?.giftsCount}</td>
//                     <td>{formatDateUZ(client?.createdAt)}</td>
//                     <td>
//                       <button className="btn-view">View</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no-data">
//                     <div className="loading-spinner"></div>
//                     <p>No clients found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Clients;


import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './clients.scss';
import { IoMdSettings } from 'react-icons/io';
import { VscDebugRestart } from 'react-icons/vsc';
import { useGetClientsQuery } from '../../../context/api/clientsApi';

const formatDateUZ = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  return date.toLocaleString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data } = useGetClientsQuery();

  const filteredClients = useMemo(() => {
    if (!searchTerm) return data?.data || [];

    return data?.data?.filter((client) =>
      client?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.phoneNumber?.includes(searchTerm)
    );
  }, [searchTerm, data]);

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage <= 3) {
      // Beginning: 1, 2, 3, 4 ... 9, 10
      pages.push(2, 3, 4);
      pages.push('...');
      pages.push(totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      // End: 1 ... 7, 8, 9, 10
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Middle: 1 ... 4, 5, 6 ... 10
      pages.push('...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='clients'>
      <div className="clients-header">
        <div className="clients-header-controls">

          <div className="clients-header-controls-search-box">
            <Search className="clients-header-controls-search-box-icon" size={18} />
            <input
              type="text"
              placeholder="Search name or phone"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="clients-header-controls-search-box-input"
            />
          </div>

          <div className="clients-header-controls-action-buttons">
            <button className="btn-action btn-download">Total: {filteredClients?.length}</button>
            <button className="btn-action btn-download" onClick={handleReset}>
              <VscDebugRestart />
            </button>
            {/* <button className="btn-action btn-add">
              <IoMdSettings />
            </button> */}
          </div>

        </div>
      </div>

      <div className="clients-table">
        <div className="clients-table-wrapper">
          <table className="clients-table-wrapper-container">

            <thead>
              <tr>
                <th>First name</th>
                <th>Phone number</th>
                <th>Gifts count</th>
                <th>Register date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentClients?.length > 0 ? (
                currentClients.map((client) => (
                  <tr key={client?._id}>
                    <td>{client?.firstName}</td>
                    <td>{client?.phoneNumber}</td>
                    <td>{client?.giftsCount}</td>
                    <td>{formatDateUZ(client?.createdAt)}</td>
                    <td>
                      <button className="btn-view">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    <div className="loading-spinner"></div>
                    <p>No clients found</p>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {filteredClients?.length > 0 && (
          <div className="clients-pagination">
            <div className="clients-pagination-controls">
              <button 
                className="clients-pagination-controls-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="clients-pagination-controls-ellipsis">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={page}
                    className={`clients-pagination-controls-btn ${
                      currentPage === page ? 'clients-pagination-controls-current' : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button 
                className="clients-pagination-controls-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="clients-pagination-info">
              <span>Show</span>
              <select 
                className="clients-pagination-info-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>of {filteredClients.length} clients</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;


// import React, { useState, useMemo } from 'react';
// import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
// import './clients.scss';
// import { IoMdSettings } from 'react-icons/io';
// import { VscDebugRestart } from 'react-icons/vsc';
// import { useGetClientsQuery } from '../../../context/api/clientsApi';

// const formatDateUZ = (dateString) => {
//   if (!dateString) return '';
//   const date = new Date(dateString);

//   return date.toLocaleString('uz-UZ', {
//     timeZone: 'Asia/Tashkent',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// const Clients = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const { data } = useGetClientsQuery();

//   const filteredClients = useMemo(() => {
//     if (!searchTerm) return data?.data || [];

//     return data?.data?.filter((client) =>
//       client?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client?.phoneNumber?.includes(searchTerm)
//     );
//   }, [searchTerm, data]);

//   const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentClients = filteredClients.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   return (
//     <div className='clients'>
//       <div className="clients-header">
//         <div className="clients-header-controls">

//           <div className="clients-header-controls-search-box">
//             <Search className="clients-header-controls-search-box-icon" size={18} />
//             <input
//               type="text"
//               placeholder="Search name or phone"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="clients-header-controls-search-box-input"
//             />
//           </div>

//           <div className="clients-header-controls-action-buttons">
//             <button className="btn-action btn-download">Total: {filteredClients?.length}</button>
//             <button className="btn-action btn-download" onClick={handleReset}>
//               <VscDebugRestart />
//             </button>
//             <button className="btn-action btn-add">
//               <IoMdSettings />
//             </button>
//           </div>

//         </div>
//       </div>

//       <div className="clients-table">
//         <div className="clients-table-wrapper">
//           <table className="clients-table-wrapper-container">

//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Phone Number</th>
//                 <th>Gifts Count</th>
//                 <th>Register Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentClients?.length > 0 ? (
//                 currentClients.map((client) => (
//                   <tr key={client?._id}>
//                     <td>{client?.firstName}</td>
//                     <td>{client?.phoneNumber}</td>
//                     <td>{client?.giftsCount}</td>
//                     <td>{formatDateUZ(client?.createdAt)}</td>
//                     <td>
//                       <button className="btn-view">View</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no-data">
//                     <div className="loading-spinner"></div>
//                     <p>No clients found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>

//         {filteredClients?.length > 0 && (
//           <div className="clients-pagination">
//             <div className="clients-pagination-controls">
//               <button 
//                 className="clients-pagination-controls-btn"
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft size={20} />
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNumber = index + 1;
//                 return (
//                   <button
//                     key={pageNumber}
//                     className={`clients-pagination-controls-btn ${
//                       currentPage === pageNumber ? 'clients-pagination-controls-current' : ''
//                     }`}
//                     onClick={() => handlePageChange(pageNumber)}
//                   >
//                     {pageNumber}
//                   </button>
//                 );
//               })}
              
//               <button 
//                 className="clients-pagination-controls-btn"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>

//             <div className="clients-pagination-info">
//               <span>Show</span>
//               <select 
//                 className="clients-pagination-info-select"
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//               <span>of {filteredClients.length} clients</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Clients;