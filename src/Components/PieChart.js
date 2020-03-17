import React from 'react';
import * as d3 from "d3";
import styled from 'styled-components';

const Path = styled.path`
    fill: ${props => d3.schemePaired[props.index]};
`

const Arc = ({ arcData }) => {
    const arc = d3.arc()
    .innerRadius(45)
    .outerRadius(75);

    return (
        <Path d={arc(arcData)} index={arcData.index} />
    )
}

const PieChart = ({ data, x, y }) => {
    const pie = d3.pie();
    console.log(pie(data))
    return (
        <g transform={`translate(${x}, ${y})`}>
            {pie(data).map( d =>(
                <Arc arcData={d}/>
            ))}
        </g>
    )
}

export default PieChart;
