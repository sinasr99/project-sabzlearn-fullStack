import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

export default ({getSpaceX, clickX, data}) => {
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="date"
                        interval={0}
                        tick={({ x, y, payload, index }) => {
                            const value = payload.value || "";
                            const parts = value.split("*");
                            const isSplit = parts.length === 2;

                            const topText = isSplit ? parts[0] : value;
                            const bottomText = isSplit ? parts[1] : null;

                            return (
                                <g
                                    onClick={() => clickX(topText, index)}
                                    transform={`translate(${x},${y})`} style={{ cursor: 'pointer' }}>
                                    <text
                                        x={getSpaceX(index, topText)} /// باید این مقدارش تغییر کنه >=====
                                        y={0}
                                        dy="10"
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="#000"
                                    >
                                        {topText}
                                    </text>
                                    {bottomText && (
                                        <text
                                            x={getSpaceX(index, topText)}
                                            y={0}
                                            dy="28"
                                            textAnchor="middle"
                                            fontSize="12"
                                            fontFamily="IRANSans"
                                            fill="#000"
                                        >
                                            {bottomText}
                                        </text>
                                    )}
                                </g>
                            );
                        }}
                        height={60}
                        width={500}
                    />
                    <YAxis
                        tick={{dx: -100}} // اینجا می‌تونی با عددها بازی کنی تا فاصله‌ مناسب پیدا بشه
                        tickFormatter={(value) => `${value.toLocaleString()} تومان`}
                        width={130} // فضای بیشتر برای محور Y
                    />
                    <Tooltip
                        formatter={(value, name, props) => [`${value.toLocaleString()} تومان`, 'فروش']}
                        labelFormatter={(label) => {
                            const [day, date] = label.split("*");
                            return `${day} ${date || ""}`; // مثلاً: "یکشنبه - ۲۱ اسفند ۱۴۰۴"
                        }}
                    />

                    <Area type="monotone" dataKey="price" stackId="1" stroke="#1EB35B" fill="#1EB35B4C"/>
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}