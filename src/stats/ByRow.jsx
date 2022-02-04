import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ByRow(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0) return;

    props.data.forEach((d, i) => d.i = i);

    const svg = d3.select(svgRef.current)
      .attr('height', 500)
      .attr('viewBox', [-10, -30, 140, 500]);

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
              <p class='color-200 my-0'>Total: ${d.total} letters</p>
              <p class='color-correct my-0'>Correct: ${d.correct} letters (${(d.correct/d.total*100).toFixed(2)}%)</p>
              <p class='color-wrong-place my-0'>Wrong place: ${d.wrongPlace} letters (${(d.wrongPlace/d.total*100).toFixed(2)}%)</p>
              <p class='color-500 my-0'>Wrong letter: ${d.wrongLetter} letters (${(d.wrongLetter/d.total*100).toFixed(2)}%)</p>
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
        });

    // bars, from right to left: correct, wrong place, wrong letter

    bars.append('svg:rect')
      .attr('class', 'fill-correct')
      .attr('height', 60)
      .attr('width', d => d.correct / d.total * 130)
      .attr('x', d => 130 - d.correct / d.total * 130);

    bars.append('svg:rect')
      .attr('class', 'fill-wrong-place')
      .attr('height', 60)
      .attr('width', d => d.wrongPlace / d.total * 130)
      .attr('x', d => d.wrongLetter / d.total * 130);

    bars.append('svg:rect')
      .attr('class', 'fill-wrong-letter')
      .attr('height', 60)
      .attr('width', d => d.wrongLetter / d.total * 130)
      .attr('x', 0);

    // masking rectangles

    bars.append('svg:rect')
      .attr('class', 'fill-stats-background')
      .attr('height', 70)
      .attr('width', 140)
      .attr('x', -5)
      .attr('y', -5)
      .transition()
        .duration(750)
        .delay((_, i) => i*250)
        .attr('width', 0);

  }, [props.data]);

  return <svg ref={svgRef} />
}

export default ByRow;