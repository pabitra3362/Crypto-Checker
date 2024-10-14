import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function Home() {
  const [country, setCountry] = useState("");
  const [suggestions, setSuggestions] = useState([])
  const [cryptodata, setCryptodata] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const data = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", "INR", "SGD", "HKD", "NOK", "MXN", "RUB", "ZAR"];

  const handleCountry=(event)=> {
    const value=event.target.value
    setCountry(value);
    if(value){
      setSuggestions(data.filter(item=>item.toLowerCase().includes(value.toLowerCase())))
    }else{
      setSuggestions([])
    }
  }
  const handleSuggestionClick=(suggestion) => {
    setCountry(suggestion)
    setSuggestions([])
  }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new request

    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${country}`)
      .then(response => response.data)
      .then(data => setCryptodata(data))
      .then(() => localStorage.setItem('country', country))
      .catch(error => setError(error.message+" try after some time."))
      .finally(()=>setLoading(false))
  };

  return (
    <>
      <div className="container">
        <form className="w-fit mx-auto mt-36 mb-10" onSubmit={handleSubmit}>
          <input
            className="text-lg w-80 px-3 text-black font-bold"
            type="text"
            placeholder="Enter currency code (e.g., usd)..."
            value={country}
            onChange={handleCountry}
          />
          <button className="border border-orange-400 hover:bg-orange-400 transition px-3 py-1 rounded-md mx-3">
            Search
          </button>
          
        {suggestions.length >0 && (
          <ul>
            {suggestions.map((item,index)=>(
              <li
              className="bg-blue-900 opacity-60 text-center text-lg transition font-bold w-80 mt-2"
              key={index} onClick={()=>handleSuggestionClick(item)}>{item}</li>
            ))}
          </ul>
        )}
        </form>

        {loading && <div className="text-white w-fit mx-auto">Loading...</div>}

        <div className="cryptodata">

          {error && <div className="text-red-500 w-fit mx-auto">{error}</div>}
          {cryptodata != 0 && <table className="mx-auto">
            <thead>
              <tr>
                <th>name</th>
                <th>price</th>
                <th>symbol</th>
                <th>last updated date</th>
              </tr>
            </thead>
            <tbody>
              {cryptodata.map(item => (
                <tr className="border border-white px-2" key={item.id}>
                  <td className="pl-6">{item.name}</td>
                  <td>{item.current_price}</td>
                  <td><img loading="lazy" src={item.image} height={50} width={50} alt="" /></td>
                  <td>{item.last_updated}</td>
                  <td><button className="border border-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-md mx-3"><Link to={`/crypto/${item.id}`}>Show Details</Link></button></td>
                </tr>
              ))}
            </tbody>

          </table>}
        </div>

        {cryptodata.length === 0 && !loading && !error && (
          <div className="text-white text-2xl flex justify-center items-center mx-auto w-2/3 border border-white h-56">
            <p>Don't have any data to show. Please write the country code.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
