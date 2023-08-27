import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function PollutionDetails({ id, setLocation, setPollutionModal }) {
    const date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const [pollutionData, setPollutionData] = useState([])
    const [fromDate, setFromDate] = useState(previous.toJSON())
    const [toDate, setToDate] = useState(date.toJSON())

    useEffect(() => {
        axios.get(`https://api.openaq.org/v2/measurements?location_id=${id}&parameter=pm25&date_from=${fromDate}&date_to=${toDate}&limit=1000`).then(res => setPollutionData(res.data.results))
    }, [fromDate,toDate])
  
const data = [...pollutionData?.map(data => { const { value, date } = data 
    return ({value: value, label: new Date(date.utc).toLocaleTimeString() + ' ' + new Date(date.utc).toLocaleDateString()})})]

return (
    <div className='pollutionModal'>
        <button className='' onClick={() => { setPollutionModal(false); setLocation({}); }}>Exit</button>
        <div className='modalInput'>
            <div>
            <label htmlFor='fromDate'>From Date</label>
            <input type='date' name='fromDate' onChange={e=>setFromDate(e.target.valueAsDate.toJSON())}/>
            </div>
            <div>
            <label htmlFor='toDate'>To Date</label>
            <input type='date' name='toDate' onChange={e=>setToDate(e.target.valueAsDate.toJSON())}/>
            </div>
        </div>
        <div className='modalContent'>

            {pollutionData.length ? <LineChart width={1500} height={300} data={data} > <Line type="monotone" dataKey="value" stroke="#000" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
            </LineChart> : <p>No Data to Display</p>}
        </div>
    </div>
)
}
