import React from 'react'

export default function LocationDetails({data,setPollutionModal}) {
  
  return (
    <div className='locationDiv'>
      
        <h2 >{data?.name}</h2>
        <div className='locationContent'>
          <div>
        <p>Measures : <span>{data?.city},{data?.country}</span></p>
        <p>Unit : <span>{data?.parameters?.[0]?.parameter}({data?.parameters?.[0].unit})</span></p>
        <p>Last Updated : <span>{data?.parameters?.[0]?.lastUpdated}</span></p>
        </div>
        <button onClick={()=>{setPollutionModal(true)}}>Show Details</button>
        </div>
    </div>
  )
}
