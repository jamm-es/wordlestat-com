import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function MobileRowLabel(props) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('class', 'tick')
      .attr('viewBox', [-10, -30, 20, 520]);

    svg.selectAll('text')
      .data([1, 2, 3, 4, 5, 6, 'X'])
      .enter()
        .append('svg:text')
        .attr('y', (_, i) => 70 * i + 30)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .text(d => d);

  }, []);

  return <svg ref={svgRef} />
}

export default MobileRowLabel;