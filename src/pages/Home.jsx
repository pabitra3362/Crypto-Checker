import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";

function Home() {
  const [currency, setCurrency] = useState("");
  const [currencyData, setCurrencyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCurrency = (e) => {
    const value = e.target.value;
    setCurrency(value);

    // Filter the data based on the input value
    if (value) {
      const filtered = currencyData.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(currencyData);
    }
  };

  const handleBtn = () => {
    setCurrency("");
    setFilteredData(currencyData);
  };

  const handleData = (data) => {
    setCurrencyData(data);
    setFilteredData(data); // Initialize filteredData
    localStorage.setItem('currency',JSON.stringify(data))
  };

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr")
      .then(response => handleData(response.data))
      .catch(error => setError("Error while fetching data Please try after some time: " + error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container w-2/3 mx-auto">
        <form className='mx-auto w-fit mt-44 my-10'>
          <input
            className='text-black font-bold px-3 mx-3 text-lg'
            type="text"
            value={currency}
            onChange={handleCurrency}
            placeholder='Enter currency name'
          />
          <button
            type='button'
            className='border border-orange-400 hover:bg-orange-400 transition px-3 py-1 rounded-md mx-3'
            onClick={handleBtn}
          >
            Refresh
          </button>
        </form>

        {loading && <div className="text-white w-fit mx-auto">Loading...</div>}

        <div className="currencyData">
          {error && <div className="text-red-500 w-fit mx-auto">{error}</div>}

          {filteredData.length > 0 ? (
            <table className="mx-auto">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Last Updated</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(item => (
                  <tr className="border border-white px-2" key={item.id}>
                    <td className="px-4">
                      <img loading="lazy" src={item.image} height={50} width={50} alt={item.name} />
                    </td>
                    <td className="px-2">{item.name}</td>
                    <td className="px-2"><div className='flex gap-x-2 justify-center items-center'><FaRupeeSign />{item.current_price}</div></td>
                    <td className="px-2">{item.last_updated}</td>
                    <td className="px-2">
                      <button className="border border-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-md mx-3">
                        <Link to={`/crypto/${item.id}`}>Show Details</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && !error && (
              <div className="text-white text-2xl flex justify-center items-center mx-auto w-2/3 border border-white h-56">
                <p>Don't have any data to show. Please try again later.</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
