import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setCountries(data);
      })
      .catch(err => console.log(err));
  }, []);

  const sortAscending = () => {
    const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
    setCountries(sortedCountries);
  };
  
  const sortDescending = () => {
    const sortedCountries = [...countries].sort((a, b) => b.name.localeCompare(a.name));
    setCountries(sortedCountries);
  };

  const filterByLithuaniaArea = () => {
    const lithuaniaArea = 65300;
    const filteredCountries = data.filter(country => country.area < lithuaniaArea);
    setCountries(filteredCountries);
  };

  const filterByRegion = () => {
    const filteredCountries = data.filter(country => country.region === 'Oceania');
    setCountries(filteredCountries);
  };

  const filterCountries = (text) => {
    if (text === 'area') {
      filterByLithuaniaArea();
    } else if (text === 'oceania') {
      filterByRegion();
    } else {
      setCountries(data);
    }
  };
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const countriesToDisplay = countries.slice(startIndex, endIndex);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container mx-auto p-10 bg-gray-200">
      <h1 className="text-3xl font-bold text-center bg-blue-400 p-4 w-[40%]">Countries</h1>

      <div className="flex justify-between py-5">
        <div className="flex items-center gap-6">
          <button onClick={sortAscending} className="bg-green-600 px-3 py-2 rounded font-bold">Ascending</button>
          <button onClick={sortDescending} className="bg-green-600 px-3 py-2 rounded font-bold">Descending</button>
        </div>
        <select onChange={(e) => filterCountries(e.target.value)} className="bg-green-600 px-3 py-2 rounded font-medium">
          <option value="filter">Filter</option>
          <option value="area">Area smaller than Lithuania</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className="space-y-5">
        {
          countriesToDisplay.map(country => {
            const { name, region, area } = country;
            return (
              <ul key={name} className="bg-blue-200 py-5 font-bold">
                <li className="bg-purple-600 text-white px-3 py-1 w-[40%]">Country: {name}</li>
                <li className="bg-[#5958E8] text-gray-300 px-3 py-1 w-[35%]">Region: {region ? region : 'Null'}</li>
                <li className="bg-[#7EC658] px-3 py-1 w-[50%]">Area: {area ? area : 'Null'}</li>
              </ul>
            )
          })
        }
      </div>

      <div className="space-x-4 mt-6 text-center">
        {pageNumbers.map((page) => {
          return (
            <button
              key={page}
              className={currentPage === page ? 'bg-blue-700 px-2 py-1 text-white' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        })}
      </div>

    </div>
  );
}

export default App;
