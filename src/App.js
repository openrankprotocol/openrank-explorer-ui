import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionListPage from "./pages/TransactionListPage";
import TransactionDetailPage from './pages/TransactionDetail';
import JobListPage from './pages/jobList'
import { NavLink } from 'react-router-dom'

export default function Home() {
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [searchHash, setSearchHash] = useState('');

  const handleSearchChange = (event) => {
    setSearchHash(event.target.value);
  };

  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden">
        <nav className="w-full opacity-100 border-gray-200 md:max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center py-6 px-[16px] md:py-10 md:px-[100px]">
            <div className="w-[8rem]">
              {<img src={'./openrank_logo.svg'} alt="OpenRank Logo" />}
            </div>

            <div className="flex text-gray-500 font-dm-sans font-medium text-sm space-x-2 md:space-x-8 items-center">
              <a href="https://docs.openrank.com" className="hover:text-gray-800" target="_blank" rel="noreferrer">
                docs
              </a>
            </div>
          </div>

        </nav>

        <main className="pb-8 px-[16px] mx-auto flex flex-col gap-8 md:gap-8 md:items-center md:px-[100px] md:max-w-[1200px]">
          <div className="flex flex-col w-full">

            <ul className="flex space-x-8 w-[8rem] md:max-w-[1200px]">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-semibold transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-gray-700'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `font-semibold transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-gray-700'
                    }`
                  }
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `font-semibold transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-gray-700'
                    }`
                  }
                >
                  Transactions
                </NavLink>
              </li>
            </ul>


            <br />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by hash..."
                value={searchHash}
                onChange={handleSearchChange}
                className="border px-4 py-2 w-full"
              />
            </div>


            <Routes>
              <Route path="/" element={<TransactionListPage />} />
              <Route path="/jobs" element={<JobListPage />} />
              <Route path="/transactions" element={<TransactionListPage />} />
              <Route path="/transactions/:hash" element={<TransactionDetailPage />} />
            </Routes>


          </div>
        </main>
      </div>
    </Router>
  );
}
