import React, { useEffect } from 'react'
import axios from 'axios';
import country from "../../assets/countries.json"

const Currency = ({ location, loading }) => {

    const [conversion, setConversion] = React.useState(null);

    useEffect(() => {
        const getBaseCurrency = () => {
            if (location) {
                return country[location].currency.primary;
            }

        }
        const getData = async () => {
            var baseCurrency = getBaseCurrency();
            if (baseCurrency) {
                const res = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.REACT_APP_EXCHANGE_API_KEY}&base_currency=${baseCurrency}`);
                const conversions = [
                    { convName: `${getBaseCurrency()}USD`, conv: res.data.data.USD },
                    { convName: `${getBaseCurrency()}EUR`, conv: res.data.data.EUR }
                ]
                setConversion(conversions);
            }
        }
        getData();

    }, [location])
    return (
        <div>
            <div className="currencyContainer">
                <span>Currency</span>
                <span>Price</span>
            </div>
            {conversion && conversion.map((item) => <div key={item.convName} className="currencyContainer">
                <span>{item.convName}</span>
                <span>{item.conv}</span>
            </div>)}
        </div>
    )
}

export default Currency;
