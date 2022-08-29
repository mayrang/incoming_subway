import { useRouter } from "next/router";
import Navigator from "../../components/Navigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useCallback } from "react";
import stationList from "../../utils/stationList";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

interface StationProps {
    stationName: string;
}

const Station = ({stationName}:StationProps) => {
    const router = useRouter();
    const id = router.query.id;
    
    const clickBack = useCallback(() => {
        router.push("/");
    }, []);

    return (
        <div>
            <Navigator leftButton={<FontAwesomeIcon icon={faArrowLeft} size="lg"/>} leftOnClick={clickBack} centerText={stationName}/>
        </div>
    );
};

export default Station;


export const getStaticPaths:GetStaticPaths = () => {
    const paths = stationList.map((it) =>{ return {params: {id: it.id} }});
    console.log(paths)
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps:GetStaticProps = async ({params}) => {
    const stationName = stationList.find((it) => it.id === params?.id)?.name;
    const result = await axios.get(`http://www.djtc.kr/OpenAPI/service/TimeTableSVC/getTimeTable?serviceKey=${process.env.API_SERVICE_KEY}&stNum=${params?.id}&dayType=0&drctType=0`);
    console.log(result.data.response.body.items.item);
    return {
        props: {
            stationName
        }
    };
};


