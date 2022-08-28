
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Navigator from '../components/Navigator'
import styles from '../styles/Home.module.scss'
import stationList from '../utils/stationList'


const Home = () => {
  const [orderStationList, setOrderStationList] = useState(stationList);
  const router = useRouter();

  const clickStation = (id:string) => {
    router.push(`/station/${id}`);
  };
  const changeOrder = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === "start"){
      setOrderStationList([...orderStationList.sort((a, b) => parseInt(a.id) - parseInt(b.id))]);
      console.log(1)
    }else{
      setOrderStationList([...orderStationList.sort((a, b) => parseInt(b.id) - parseInt(a.id))]);
      console.log(2)
    }
  }

  return (
    <>
    <Navigator />
    <section>
      <select className={styles.selectLine} defaultValue="start" onChange={changeOrder}>
        <option value="start">판암</option>
        <option value="end">정부청사</option>
      </select>
      <article>
        {orderStationList.map((station:{id:string; name:string;}) => (
          <div key={station.id} onClick={() => clickStation(station.id)} className={styles.stationCard}>
            {station.name}
          </div>
        ))}
      </article>
    </section>
    </>
  )
}
export default Home
