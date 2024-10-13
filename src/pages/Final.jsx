import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './final.css'
import { Navigate } from 'react-router-dom';

const Final = () => {
  const { id } = useParams(); // Destructure id from useParams
    const country=localStorage.getItem('country')
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
    const handleBtn=()=>{
        localStorage.removeItem('country')
        navigate('/')
    }

//   const specificData=data.filter((item)=>item.id===id)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the beginning
      setError(null); // Reset error state before fetching

      
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${country}`)
        .then(response=>response.data)
        .then(data => setData(...data.filter(item=>item.id===id)))
        .finally(()=>setLoading(false))
        .catch(error=>setError(error.message+" try again after some time."))
        
      
    };

    fetchData(); // Call the async function
  }, [id,country]); // Dependency array includes country to refetch on change
  console.log(data);
  
  
  

  return (
    <div>
      {loading && <div className='w-fit mx-auto'>Loading...</div>}
      {error && <div className='text-red-400 w-fit mx-auto'>{error}</div>}

      {data!==0 ? <div className="container w-[50%] bg-slate-600 grid gap-x-6 items-center mx-auto my-5 rounded-xl">
        <div className="img "><img className='w-56 h-44 my-9 ml-[30%] ' src={data.image} alt="" /></div>
        <div className="id"><label htmlFor="Id">Id: </label>{data.id}</div>
        <div className="name"><label htmlFor="Name">Name: </label>{data.name}</div>
        <div className="price"><label htmlFor="price">Price: </label>{data.current_price}</div>
        <div className="fully_diluted_valuation"><label htmlFor="fully_diluted_valuation">Fully_diluted_valuation: </label>{data.fully_diluted_valuation}</div>
        <div className="market_cap"><label htmlFor="market_cap">market_cap: </label>{data.market_cap}</div>
        <div className="market_cap_rank"><label htmlFor="market_cap_rank">market_cap_rank: </label>{data.market_cap_rank}</div>
        <div className="total_volume"><label htmlFor="total_volume">total_volume: </label>{data.total_volume}</div>
        <div className="high_24h"><label htmlFor="high_24h">high_24h: </label>{data.high_24h}</div>
        <div className="low_24h"><label htmlFor="low_24h">low_24h: </label>{data.low_24h}</div>
        <div className="price_change_24h"><label htmlFor="price_change_24h">price_change_24h: </label>{data.price_change_24h}</div>
        <div className="price_change_percentage_24h"><label htmlFor="price_change_percentage_24h">price_change_percentage_24h: </label>{data.price_change_percentage_24h}</div>
        <div className="market_cap_change_24h"><label htmlFor="market_cap_change_24h">market_cap_change_24h: </label>{data.market_cap_change_24h}</div>
        <div className="market_cap_change_percentage_24h"><label htmlFor="market_cap_change_percentage_24h">market_cap_change_percentage_24h: </label>{data.market_cap_change_percentage_24h}</div>
        <div className="circulating_supply"><label htmlFor="circulating_supply">circulating_supply: </label>{data.circulating_supply}</div>
        <div className="total_supply"><label htmlFor="total_supply">total_supply: </label>{data.total_supply}</div>
        <div className="ath"><label htmlFor="ath">ath: </label>{data.ath}</div>
        <div className="ath_change_percentage"><label htmlFor="ath_change_percentage">ath_change_percentage: </label>{data.ath_change_percentage}</div>
        <div className="ath_date"><label htmlFor="ath_date">ath_date: </label>{data.ath_date}</div>
        <div className="atl"><label htmlFor="atl">atl: </label>{data.atl}</div>
        <div className="atl_change_percentage"><label htmlFor="atl_change_percentage">atl_change_percentage: </label>{data.atl_change_percentage}</div>
        <div className="atl_date"><label htmlFor="atl_date">atl_date: </label>{data.atl_date}</div>
        <div className="last_updated"><label htmlFor="last_updated">last_updated: </label>{data.last_updated}</div>
        <button className='border w-[40%] mx-auto my-5 border-blue-600 hover:bg-green-500 transition px-3 py-1 rounded-md' onClick={handleBtn}>Back to the page</button>


      </div> : <div className="text-white text-2xl flex justify-center items-center mx-auto w-2/3 border border-white h-56 my-9">
            <p>Don't have any data to show. Please go back try after some time.</p>
          </div>}
    </div>
  );
}

export default Final;
