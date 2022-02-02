import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Wins(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0) return;

    const max = Math.max(...props.data);

    const svg = d3.select(svgRef.current)
      .attr('height', 500)
      .attr('viewBox', [-10, -30, 130, 500]);

    const bars = svg.selectAll('.by-row-bar')
      .data(props.data)
      .enter()
      .append('svg:g')
        .attr('class', 'by-row-bar')
        .attr('transform', (_, i) => `translate(0, ${i*70})`);

    // masking rectangles

    bars.append('svg:rect')
      .attr('class', 'fill-correct')
      .attr('height', 60)
      .attr('width', 0)
      .transition()
        .duration(750)
        .delay((_, i) => i*250)
        .attr('width', d => d / max * 130);

  }, [props.data])

  return <svg ref={svgRef} />
}

export default Wins;