import { useParams } from "react-router-dom";

const Details = () => {
    const params = useParams();

    return (
        <div>
            <div>Month: {params.Month}</div>
            <div>Credit: {params.Credit}</div>
            <div>Debit: {params.Debit}</div>
        </div>
    );
};

export default Details;