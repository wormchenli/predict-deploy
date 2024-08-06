import { getPrices } from "../helpers/DBHelper.js";
import { useEffect, useState, useRef } from "react";
import * as echarts from 'echarts';
import { Box } from '@radix-ui/themes';

export const Chart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [numDays, setNumDays] = useState(600);
    const chartRef = useRef(null);

    useEffect(() => {
        getPrices()
            .then((res) => {
                setData(res);
                setLoading(false);
                console.log('Data loaded:', res);
            });
    }, []);

    useEffect(() => {
        if (!loading && data.length > 0) {
            const chartInstance = echarts.init(chartRef.current);

            const dates = data.map(item => item.Date);
            const values = data.map(item => [item.Open, item.Close, item.Low, item.High]);
            const priceLinear = data.map(item => item.Price_Linear);

            const option = {
                xAxis: {
                    type: 'category',
                    data: dates,
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    splitArea: {
                    show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100
                    }
                ],
                legend: {
                    data: ['Candlestick', 'Price_Linear']
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        const date = params[0].name;
                        const realClose = params[0].data[1];
                        const linearValue = params[1].data;
                        return `Date: ${date}<br/>Real Closing Price: ${realClose}<br/>Predicted Price: ${linearValue}`;
                    }
                },
                series: [
                    {
                        name: 'Candlestick',
                        type: 'candlestick',
                        data: values,
                    },
                    {
                        name: 'Price_Linear',
                        type: 'line',
                        data: priceLinear,
                        smooth: true,
                        lineStyle: {
                            color: 'red'
                        }
                    }
                ],
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [loading, data]);

    return (
        <Box>
            {loading ? <p>Loading...</p> : <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>}
        </Box>
    );
};