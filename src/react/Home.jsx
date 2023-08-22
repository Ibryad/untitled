import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import "../style.css";

axios.defaults.baseURL = 'http://localhost:8080';
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Home = () => {
    const navigate = useNavigate();


    const [costs, setCosts] = useState([]);
    const [costDetail, setCostDetail] = useState(undefined);



    useEffect(() => {
        // Envoyer une requête HTTP à votre API pour récupérer les données de la base de données
        axios.get(`/costs/all`)
            .then(response => {
                const apiData = response.data;
                setCosts(apiData);


            })
            .catch(error => {
            });
    }, []);





    const handleClick = ({ payload }, index) => {
        console.log(payload);
        axios.get(`/costs/monthsdate/${payload.yearMonth}`)
            .then(response => {
                const apiData = response.data;
                console.log('====>',apiData)
                setCostDetail(apiData);

            })
            .catch(error => {


            });
        };


    return (

<>
            <div style={{ display: "flex", justifyContent: "center" }}>

                <BarChart
                    width={1200}
                    height={400}
                    data={(costs)}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="yearMonth" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="debit"
                        onClick={handleClick}
                        fill="#8884d8"
                        stackId="a"


                    >
                        {costs.map((entry, index) => (
                            <Cell cursor="pointer" key={`cellc-${index}`} />
                        ))}
                    </Bar>
                    <Bar
                        dataKey="credit"
                        onClick={handleClick}
                        fill="#82ca9d"
                        stackId="b"
                    >
                        {costs.map((entry, index) => (
                            <Cell cursor="pointer" key={`celld-${index}`} />
                        ))}
                    </Bar>
                </BarChart>

        </div>

    {costDetail && <div>

        <div>
            <h2 >Tableau des coûts</h2>
            <table style={{
                borderCollapse: "collapse",
                width: "70%",
                boxShadow: "0 5px 50px rgba(0,0,0,0.15)",
                margin:"100px auto",
                border:"2px solid midnightblue",
                textAlign:"center",
                            }}>
                <thead style={{
                    backgroundColor: "midnightblue",
                    color:"#fff",
                    textAlign:"center",
                    border:"1px solid #ddd",

                }}>
                <tr>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {costDetail.map((entry, payload) => (
                    <tr key={payload}>
                        <td>{entry.date}</td>
                        <td>{entry.montant}</td>
                        <td>{entry.type}</td>
                        <td>{entry.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </div>
    }
</>

    );



};

export default Home;