import { useRouter } from "next/router";
import Navigator from "../../components/Navigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useCallback } from "react";
import stationList from "../../utils/stationList";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/Station.module.scss";
import makeThreeTimes from "../../api/makeThreeTimes";
import checkHoliday from "../../api/checkHoliday";
import moment from "moment";

interface StationProps {
    stationName: string;
    upTime: string[];
    downTime: string[];
}

const Station = ({stationName, upTime, downTime}:StationProps) => {
    const router = useRouter();
    const id = router.query.id;
    
    const clickBack = useCallback(() => {
        router.push("/");
    }, []);

    return (
        <div>
            <Navigator leftButton={<FontAwesomeIcon icon={faArrowLeft} size="lg"/>} leftOnClick={clickBack} centerText={stationName}/>
            <div className={styles.stationName}>
                <div className={styles.nowStation}>{"월드컵경기장\n(노은도매시장)"}</div>
            </div>
            <p>상행</p>
            {upTime.map((it:string) => (
                <div key={it}><p>{Math.floor(moment.duration(moment(it, "HHmm").diff(moment())).asMinutes())}</p><p>{it}</p></div>
            ))}
            <p>하행</p>
            {downTime.map((it:string) => (
                <div key={it}><p>{Math.floor(moment.duration(moment(it, "HHmm").diff(moment())).asMinutes())}</p><p>{it}</p></div>
            ))}
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
   
    return {
        props: {
            stationName,
            upTime,
            downTime,
        }
    };
};


