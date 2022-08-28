import { useRouter } from "next/router";



const Station = () => {
    const router = useRouter();
    const id = router.query.id
    return (
        <div>{id}</div>
    );
};

export default Station;