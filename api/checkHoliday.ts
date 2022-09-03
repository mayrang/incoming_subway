import axios from "./axiosInstance"
import moment from "moment";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false, keepAlive: true });

const checkHoliday = async () => {
    const result = await axios.get(`https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.HOLIDAY_API_SERVICE_KEY}&solYear=${moment().format("YYYY")}&solMonth=${"07"}`, { httpsAgent});
    const day:undefined|string =  result.data.response.body.items?.item?.locdate;
    if(day === moment().format('YYYYMMDD')){
        return true;
    }else{
        return false;
    }
};

export default checkHoliday;