import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { isMobile } from 'react-device-detect';

function ByLetter(props) {

  const svgRef = useRef();

  useEffect(() => {
    if(props.data.length === 0 || props.totalData.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('viewBox', [-30, -30, 400, 520]);

    for(let i = 0; i < props.data.length; ++i) {
      for(let j = 0; j < props.data[0].length; ++j) {
        props.data[i][j].row = i;
        props.data[i][j].col = j;
        props.data[i][j].totalData = props.totalData[i][j];
      }
    }

    const data = new Array().concat(...props.data);

    const tickG = svg.append('svg:g')
      .attr('class', 'tick');

    tickG.selectAll('.left-text')
      .data([1, 2, 3, 4, 5, 6])
      .enter()
      .append('svg:text')
        .attr('class', 'left-text')
        .attr('y', (_, i) => i*70+30)
        .attr('x', -20)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .text(d => d)

    if(!isMobile) {
      tickG.selectAll('.right-text')
        .data([1, 2, 3, 4, 5, 6, 'X'])
        .enter()
        .append('svg:text')
          .attr('class', 'right-text')
          .attr('y', (_, i) => i*70+30)
          .attr('x', 5*70+10)
          .attr('dominant-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(d => d);
    }

    tickG.selectAll('.mid-text')
      .data([1, 2, 3, 4, 5])
      .enter()
      .append('svg:text')
        .attr('class', 'mid-text')
        .attr('y', -15)
        .attr('x', (_, i) => i * 70 + 30)
        .attr('text-anchor', 'middle')
        .text(d => d);
    
    const squares = svg.selectAll('.by-letter-square')
      .data(data)
      .enter()
      .append('svg:g')
        .attr('class', 'by-letter-square')
        .attr('transform', d => `translate(${d.col*70}, ${d.row*70})`)
        .on('mouseenter', function(_, d) {
          d3.select(this)
            .attr('opacity', 0.8);
          d3.select(props.tooltipRef.current)
            .style('visibility', 'visible')
            .html(`
              <p class='my-0' style='font-weight: 700'>Row ${d.row+1}, position ${d.col+1}</p>
              <p class='color-200 my-0'>Total: ${d.total} letters</p>
              <p class='color-correct my-0'>Correct: ${d.correct} letters (${(d.correct/d.total*100).toFixed(2)}%)</p>
              <p class='color-wrong-place my-0'>Wrong place: ${d.wrongPlace} letters (${(d.wrongPlace/d.total*100).toFixed(2)}%)</p>
              <p class='color-500 my-0'>Wrong letter: ${d.wrongLetter} letters (${(d.wrongLetter/d.total*100).toFixed(2)}%)</p>
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
        });;

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
    
    squares.append('svg:line')
      .attr('class', 'avg-line hide-avg-line')
      .style('visibility', 'hidden')
      .attr('x1', 50)
      .attr('x2', 60)
      .attr('y1', d => 60 - d.totalData.correct / d.totalData.total * 60)
      .attr('y2', d => 60 - d.totalData.correct / d.totalData.total * 60);

    squares.append('svg:line')
      .attr('class', 'avg-line hide-avg-line')
      .style('visibility', 'hidden')
      .attr('x1', 50)
      .attr('x2', 60)
      .attr('y1', d => d.totalData.wrongLetter / d.totalData.total * 60)
      .attr('y2', d => d.totalData.wrongLetter / d.totalData.total * 60);

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

  }, [props.data, props.totalData])

  return <svg ref={svgRef} />
}

export default ByLetter;