import { useState, useEffect } from "react";
import { GraphQLClient, gql } from 'graphql-request';

import { getTransactions } from './api'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionList from "./TransactionList";
import TransactionDetail from './TransactionDetail';
import JobList from './jobList'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [searchHash, setSearchHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async (hash = '') => {
    setIsLoading(true);
    try {
      const data = await getTransactions(hash);
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents(searchHash);
  }, [searchHash]);

  const toggleEventDetails = (index) => {
    setSelectedEventIndex(index === selectedEventIndex ? null : index);
  };

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
              <Route path="/" element={<TransactionList />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/transactions/:hash" element={<TransactionDetail />} />
            </Routes>


          </div>
        </main>
      </div>
    </Router>
  );
}
