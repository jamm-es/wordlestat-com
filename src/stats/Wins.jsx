import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Wins(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0) return;

    const max = Math.max(...props.data);

    props.data.forEach((d, i) => ({ wins: d, row: i }));

    const svg = d3.select(svgRef.current)
      .attr('height', 500)
      .attr('viewBox', [-10, -30, 130, 500]);

    const bars = svg.selectAll('.by-row-bar')
      .data(props.data)
      .enter()
      .append('svg:g')
        .attr('class', 'by-row-bar')
        .attr('transform', (_, i) => `translate(0, ${i*70})`)
        .on('mouseenter', function(_, d) {
          d3.select(this)
            .attr('opacity', 0.8);
          d3.select(props.tooltipRef.current)
            .style('visibility', 'visible')
            .html(`
              <p class='my-0' style='font-weight: 700'>Row ${d.i+1}</p>
              <p class='color-correct my-0'>${d} wins (${(d.correct/d.total*100).toFixed(2)}%)</p>
            `);
        })
        .on('mousemove', function(e) {
          d3.select(props.tooltipRef.current)
            .style('left', e.pageX + 10 + 'px')
            .style('top', e.pageY + 10 + 'px');
        })
        .on('mouseleave', function() {
          d3.select(this)
            .attr('opacity', 1);
          d3.select(props.tooltipRef.current)
            .style('visibility', 'hidden');
        });;;

    // masking rectangles

    bars.append('svg:rect')
      .attr('class', 'fill-correct')
      .attr('height', 60)
      .attr('width', 0)
      .transition()
        .duration(750)
        .delay((_, i) => i*250)
        .attr('width', d => d.wins / max * 130);

  }, [props.data])

  return <svg ref={svgRef} />
}

export default Wins;