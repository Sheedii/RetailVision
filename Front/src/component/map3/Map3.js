import React, { useEffect } from 'react';
import './map3.css'
import * as d4 from 'd3'; // Import D3 library
import * as d3 from 'd3-hexbin'; // Import D3 library
import MapInfo2 from '../mapinfo2/MapInfo2';



const Map3 = () => {

  function generateData() {
    const data = [];

    for (let i = 0; i <= 700; i += 1) {
      for (let j = 0; j <= 435; j += 1) {
        data.push([i, j]);
      }
    }

    return data;
  }

  const data = generateData();

  const fillRegionDicts = (range, color, opacities) => {
    regionDicts.push({ range, color, opacities });
    return regionDicts; // Return the updated array
  };

  // Function to change hexagon color and opacity based on ID
  const changeHexagonColor = (hexagonId, color) => {
    const hexagon = d4.select(`#${hexagonId}`);
    const currentOpacity = +hexagon.style('opacity'); // Get current opacity as a number
    const newOpacity = color === 'D9DFEE' ? 0.5 : 1; // Determine new opacity based on color
    hexagon
        .style('fill', color)
        .style('opacity', newOpacity); // Update both color and opacity
  };


  const opacitiesArray = Array.from({ length: 7500 }, (_, index) => index + 1);

  var regionDicts = []; // Initialize the regionDicts array

  regionDicts = fillRegionDicts('region22', 'D9DFEE', opacitiesArray);


  useEffect(() => {
    // Use hexbin from d3-array
    const hexbin = d3.hexbin()
        .radius(5) // Adjust the hexagon size as needed
        .extent([[0, 0], [446, 695]]); // Set the extent to match your container size

    // Append SVG for the heatmap
    const svg = d4.select('#heatmapSVG');

    const hexagons = svg.append('g')
        .selectAll('.hexagon')
        .data(hexbin(data))
        .enter().append('path')
        .attr('class', 'hexagon')
        .attr('d', hexbin.hexagon())
        .attr('transform', d => `translate(${d.x},${d.y})`) // Use d.x and d.y directly
        .style('fill', (d, i) => {
          // Find the corresponding region for this opacity index
          const region = regionDicts.find(region => region.opacities.includes(i));
          return region ? `#${region.color}` : '#000000'; // Default color if not found
        })
        .style('opacity', (d, i) => {
          // Find the corresponding region for this opacity index
          const region = regionDicts.find(region => region.opacities.includes(i));
          return region && region.color === 'D9DFEE' ? 0.5 : 1; // If color is D9DFEE, set opacity to 0.5, else 1
        })
        .attr('id', (d, i) => `cell_${i}`) // Use the hexagon's index directly for the ID
        .style('stroke', '#ffffff') // Add white stroke
        .style('stroke-width', '0.5px') // Set stroke width to 0.5px
        .on('mouseover', function (event, d, i) {
          // Show tooltip with ID when hovering
          const tooltip = document.querySelector('.tooltip2');
          tooltip.innerHTML = `ID: ${d4.select(this).attr('id')}`;
          tooltip.style.display = 'block';
          tooltip.style.left = event.pageX + 'px';
          tooltip.style.top = event.pageY + 'px';
        })
        .on('mouseout', function (event) {
          // Hide tooltip when mouseout
          document.querySelector('.tooltip2').style.display = 'none';
        });

    // Cleanup function
    return () => {
      svg.selectAll('.hexagon').remove(); // Remove hexagons when component unmounts
    };
  }, [data, regionDicts]); // Dependency array ensures re-render when data or regionDicts change

  // Example: Change color of hexagon with ID 'cell_10'
  useEffect(() => {
    //changeHexagonColor('cell_1807', 'red');
  }, []); // Call only once on component mount

  return (
      <div className='map3'>
        <div className="mapContainer22">
          <div className="background22">
            <svg id="heatmapSVG" className="heatmapSVG22" width="330" height="223"></svg></div>
        </div>
        <div className="tooltip2"></div>
        <MapInfo2 />
      </div>
  )
}


export default Map3
