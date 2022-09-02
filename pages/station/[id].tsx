import { useRouter } from "next/router";
import Navigator from "../../components/Navigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect } from "react";
import stationList from "../../utils/stationList";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/Station.module.scss";
import makeThreeTimes from "../../api/makeThreeTimes";
import checkHoliday from "../../api/checkHoliday";
import moment from "moment";

interface StationProps {
    stationName: string|undefined;
    upTime: string[];
    downTime: string[];
    upStation: string|undefined;
    downStation: string|undefined
}

const Station = ({stationName, upTime, downTime, upStation, downStation}:StationProps) => {
    const router = useRouter();
   
  
    useEffect(() => {
        const handler = setTimeout(() => {
        router.reload();
        }, 60000);
        return () => {clearTimeout(handler);};
     }, []);
    
    const clickBack = useCallback(() => {
        router.push("/");
    }, []);

    return (
        <div>
            <Navigator leftButton={<FontAwesomeIcon icon={faArrowLeft} size="lg"/>} leftOnClick={clickBack} centerText={stationName}/>
            <div className={styles.stationName}>
                <div className={styles.nowStation}>{stationName}</div>
            </div>
            <div className={styles.timeInfo}>
                <div className={styles.upTimeInfo}>
                    <div className={styles.stationInfo}><p style={{fontWeight:"bold"}}>상행</p><p>{upStation||""}</p></div>
                    {upTime.map((it:string) => (
                        <div key={it} className={styles.timeCard}>
                            <div>{`${isNaN(Number(it))?it:Math.floor(moment.duration(moment(it.slice(0, 2) === "24"?it.replace("24", "00"):it, "HHmm").diff(moment())).asMinutes())}분 뒤 도착`}</div>
                            <div className={styles.timeCardGray}>{`${it.slice(0, 2)}:${it.slice(2, 4)}`}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.downTimeInfo}>
                    <div className={styles.stationInfo}><p style={{fontWeight: "bold"}}>하행</p><p>{downStation||""}</p></div>
                    {downTime.map((it:string) => (
                        <div key={it} className={styles.timeCard}>
                            <div>{`${isNaN(Number(it))?it:Math.floor(moment.duration(moment(it.slice(0, 2) === "24"?it.replace("24", "00"):it, "HHmm").diff(moment())).asMinutes())}분 뒤 도착`}</div>
                            <div className={styles.timeCardGray}>{`${it.slice(0, 2)}:${it.slice(2, 4)}`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Station;


export const getStaticPaths:GetStaticPaths = () => {
    const paths = stationList.map((it) =>{ return {params: {id: it.id} }});
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps:GetStaticProps = async ({params}) => {
    const stationName = stationList.find((it) => it.id === params?.id)?.name;
    const holiday = await checkHoliday();
    let upTime:string[];
    let downTime:string[];
    if(moment().day()===0||moment().day()===6||holiday){
        upTime = await makeThreeTimes("1", "0", params?.id as string);
        downTime = await makeThreeTimes("1", "1", params?.id as string);
    }else{
        upTime = await makeThreeTimes("0", "0", params?.id as string);
        downTime = await makeThreeTimes("0", "1", params?.id as string);
    }
    const upStation = stationList.find((it) => (parseInt(it.id)+1).toString() === params?.id)?.name;
    const downStation = stationList.find((it) => (parseInt(it.id)-1).toString() === params?.id)?.name
    return {
        props: {
            stationName,
            upTime,
            downTime,
            upStation,
            downStation,
        }
    };
};


