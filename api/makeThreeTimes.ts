import axios from "./axiosInstance";
import moment from "moment";
import https from "https";

interface initDataType {
    dayType: number;
    drctType: number;
    stNum: number;
    tmList: string|number;
    tmZone: number
}

const httpsAgent = new https.Agent({ rejectUnauthorized: false, keepAlive: true });


const makeThreeTimes = async (dayType:string, drctType:string, stNum:string) => {
    const result = await axios.get(`http://www.djtc.kr/OpenAPI/service/TimeTableSVC/getTimeTable?serviceKey=${process.env.TRAIN_API_SERVICE_KEY}&stNum=${stNum}&dayType=${dayType}`, {
        httpsAgent,
    });
    let initData = result.data.response.body.items.item
    if(drctType === "0"){
        initData = initData.filter((it:initDataType) => it.drctType === 0);
    }else{
        initData = initData.filter((it:initDataType) => it.drctType === 1);
    }
    const hourMinuteData = initData.map((it:initDataType) => { return {hour:it.tmZone<10?`0${it.tmZone}`:it.tmZone.toString(), minutes:typeof it.tmList === 'number'? [it.tmList.toString()] : it.tmList.split(" ")}});
    const filteredData:{hour:string; minutes:string[];}[] = [];
    let finalData:string[]
    const filteredHour = parseInt(moment().format("HH")) === 0 ? 24 : parseInt(moment().format("HH"));
    for(const data of hourMinuteData){
        if(parseInt(data.hour) === filteredHour){
            let filteredMinutes:string[] = [];
            for(const minute of data.minutes){
                if(parseInt(minute) > parseInt(moment().format("mm"))){
                    filteredMinutes.push(minute);
                }
            }
            if(filteredMinutes.length > 0){
                filteredData.push({hour:data.hour, minutes:filteredMinutes})
            }
        }else if(parseInt(data.hour) > filteredHour){
            filteredData.push(data);
        }
    }
    const joinData:string[] = [];
    for(const data of filteredData){
        for(const minute of data.minutes){
            joinData.push(`${data.hour}${minute}`);
        }
    }
    if(joinData.length === 0){
        finalData = ["데이터 없음"];
    }else if(joinData.length === 1){
        finalData = [...joinData.slice(0)];
    }else if(joinData.length === 2){
        finalData = [...joinData.slice(0, 2)];
    }else{
        finalData = [...joinData.slice(0, 3)];
    }
    return finalData;
    
};

export default makeThreeTimes;