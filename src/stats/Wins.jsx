import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Wins(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0 || props.totalData.length === 0) return;

    const maxCurrent = Math.max(...props.data);
    const maxTotal = Math.max(...props.totalData);
    const maxProp = Math.max(...props.data.map(d => d / maxCurrent), ...props.totalData.map(d => d / maxTotal));
    const total = props.data.reduce((prev, current) => prev + current);
    const globalTotal = props.totalData.reduce((prev, current) => prev + current);
    const maxBar = Math.max(...props.data.map(d => d / total), ...props.totalData.map(d => d / globalTotal));

    props.data.map((d, i) => (props.data[i] = ({ 
      wins: d,
      row: i,
      totalWins: props.totalData[i]
    })));

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('viewBox', [-10, -30, 150, 520]);

    const tickG = svg.append('svg:g')
      .attr('transform', 'translate(0, -5)');

    const ticks = tickG.selectAll('.tick')
      .data([0, maxBar])
      .enter()
      .append('svg:g')
        .attr('class', 'tick')
        .attr('transform', (_, i) => `translate(${i*130}, 0)`);
      
    ticks.append('svg:line')
      .attr('y2', -7);

    ticks.append('svg:text')
      .attr('y', -10)
      .attr('text-anchor', (_, i) => i === 0 ? 'start' : 'end')
      .text(d => (d * 100).toFixed(1) + '%');

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
              <p class='my-0' style='font-weight: 700'>Row ${d.row+1}</p>
              <p class='color-correct my-0'>${d.wins} ${d.row !== 6 ? 'wins' : 'losses'} (${(d.wins/total*100).toFixed(2)}%)</p>
              <p class='color-500 my-0'>Global average: ${(d.totalWins/globalTotal*100).toFixed(2)}%</p>
            `);
        })
        .on('mousemove', function(e) {
          d3.select(props.tooltipRef.current)
            .style('left', e.clientX + 10 + 'px')
            .style('top', e.clientY + 10 + 'px');
        })
        .on('mouseleave', function() {
          d3.select(this)
            .attr('opacity', 1);
          d3.select(props.tooltipRef.current)
            .style('visibility', 'hidden');
        });

    bars.append('svg:rect')
      .attr('class', 'fill-stats-background')
      .attr('width', 130)
      .attr('height', 60);
      
    bars.append('svg:rect')
      .attr('class', d => d.row === 6 ? 'fill-wrong' : 'fill-correct')
      .attr('height', 60)
      .attr('width', 0)
      .transition()
        .duration(750)
        .delay((_, i) => i*250)
        .attr('width', d => d.wins / maxCurrent / maxProp * 130)

    bars.append('svg:line')
      .attr('class', 'avg-line')
      .attr('y2', 60)
      .attr('x1', 0)
      .attr('x2', 0)
      .transition()
        .duration(750)
        .delay((_, i) => i*250)
        .attr('x1', d => d.totalWins / maxTotal / maxProp * 130)
        .attr('x2', d => d.totalWins / maxTotal / maxProp * 130);

  }, [props.data, props.totalData])

  return <svg ref={svgRef} />

}

export default Wins;