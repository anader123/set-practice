import React from 'react';
import * as d3 from "d3";
import styled from 'styled-components';

const Path = styled.path`
    fill: ${props => d3.schemePaired[props.index]};
    stroke: black;
    cursor: pointer;
`

const Arc = ({ arcData }) => {
    const arc = d3.arc()
    .innerRadius(35)
    .outerRadius(75);

    return (
        <Path d={arc(arcData)} index={arcData.index} />
    )
}

const PieChart = ({ data, x, y }) => {
    const pie = d3.pie();
    return (
        <g transform={`translate(${x}, ${y})`}>
            {pie(data).map( d =>(
                <Arc key={d.id} arcData={d}/>
            ))}
        </g>
    )
}

export default PieChart;
