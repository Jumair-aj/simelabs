import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Select from 'react-select'
import LocationDetails from '@/components/ui/LocationDetails'
import PollutionDetails from '@/components/ui/PollutionDetails'



export default function Home() {
  const [locations, setLocations] = useState({})
  const [location, setLocation] = useState({})
  const [pollutionModal,setPollutionModal] = useState(false)
  console.log(location)
  useEffect(() => {
axios.get('https://api.openaq.org/v2/locations?limit=1400').then(res=>{setLocations(res.data);console.log('locations', locations)})
  }, [])
  const locationOption = locations.results?.map(location=>{
    const {name,id} = location
    return ({value:location,label:name}) }
  )
    
  return (
    <>
  <div className='container'>
    <div className='homeContent'>
      <Select className='selectInput' options={locationOption} classNamePrefix="select" isSearchable={true} onChange={e=>(setLocation(e?.value))}   />
      {/* <img src={'/images/indexImg.jpg'} className='homeImg'/> */}
      {Object.keys(location).length ? <LocationDetails data={location} setPollutionModal={setPollutionModal}/> : ''}
      {pollutionModal && <PollutionDetails id={location.id} setPollutionModal={setPollutionModal} setLocation={setLocation}/>}
      </div>
      </div>
    </>
  )
}
