import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ByLetter(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('height', 450)
      .attr('viewBox', [-10, -30, 360, 450]);

    for(let i = 0; i < props.data.length; ++i) {
      for(let j = 0; j < props.data[0].length; ++j) {
        props.data[i][j].row = i;
        props.data[i][j].col = j;
      }
    }

    
    const data = new Array().concat(...props.data);
    
    const squares = svg.selectAll('.by-letter-square')
      .data(data)
      .enter()
      .append('svg:g')
        .attr('class', 'by-letter-square')
        .attr('transform', d => `translate(${d.col*70}, ${d.row*70})`);

    // bars, from right to left: correct, wrong place, wrong letter

    squares.append('svg:rect')
      .attr('class', 'fill-correct')
      .attr('width', 60)
      .attr('height', d => d.correct / d.total * 60)
      .attr('y', d => 60 - d.correct / d.total * 60);

    squares.append('svg:rect')
      .attr('class', 'fill-wrong-place')
      .attr('width', 60)
      .attr('height', d => d.wrongPlace / d.total * 60)
      .attr('y', d => d.wrongLetter / d.total * 60);

    squares.append('svg:rect')
      .attr('class', 'fill-wrong-letter')
      .attr('width', 60)
      .attr('height', d => d.wrongLetter / d.total * 60)
      .attr('y', 0);

    // masking rectangles

    squares.append('svg:rect')
      .attr('class', 'fill-stats-background')
      .attr('height', 70)
      .attr('width', 70)
      .attr('x', -5)
      .attr('y', -5)
      .transition()
        .duration(750)
        .delay(d => (d.row+Math.min(d.col, 4-d.col))*250)
        .attr('height', 0)
        .attr('y', 60);

  }, [props.data])

  return <svg ref={svgRef} />
}

export default ByLetter;