import React, { useState, useEffect } from 'react'
import './Final.css'
import { useParams, Link } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";


const Final = () => {
    const [filteredData, setFilteredData] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const savedData = localStorage.getItem('currency')
        if (savedData) {
            const parsedData = JSON.parse(savedData)

            const foundItem = parsedData.find(item => item.id === id)
            setFilteredData(foundItem)
        } else {
            setData([])
            setFilteredData({})
        }

    }, [id])

    return (
        <div className='final min-h-screen pt-12'>

            {filteredData.length !== 0 && (
                <div className='container w-[40%] bg-black opacity-80 mx-auto rounded-xl'>
                    <h1 className='text-center text-5xl py-4 text-sky-500 font-bold'>{filteredData.name}</h1>
                    <img className='mx-auto my-3' src={filteredData.image} height={150} width={150} alt="" />
                    <div className="innerContainer grid grid-cols-2 justify-center text-center items-center leading-10 font-bold text-xl">
                        <div className="symbol">Symbol:</div>
                        <div>{filteredData.symbol}</div>
                        <div className="price">Current Price:</div>
                        <div className='flex justify-center gap-x-2 items-center'><FaRupeeSign />{filteredData.current_price}</div>
                        <div className="marketCap">Market Cap:</div>
                        <div>{filteredData.market_cap}</div>
                        <div className="totalVolume">Total Volume:</div>
                        <div>{filteredData.total_volume}</div>
                        <div className="high">24hr High:</div>
                        <div className="text-green-600 flex justify-center gap-x-2 items-center"><FaRupeeSign />{filteredData.high_24h}</div>
                        <div className="low">24hr Low:</div>
                        <div className='text-red-600 flex justify-center gap-x-2 items-center'><FaRupeeSign />{filteredData.low_24h}</div>
                        <div className='col-span-2 my-4'><button className='border w-[40%] mx-auto my-5 border-blue-600 hover:bg-green-500 transition px-3 py-1 rounded-md'><Link to='/'>Go Back</Link></button></div>
                    </div>
                </div>)}
        </div>
    )
}

export default Final
