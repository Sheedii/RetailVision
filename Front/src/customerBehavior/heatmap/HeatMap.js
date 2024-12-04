import React, { useEffect, useRef, useState } from 'react';
import './heatmap.css';
import * as d4 from 'd3'; // Import D3 library
import * as d3 from 'd3-hexbin'; // Import D3 library
import Map from '../../assets/PlanAjuste.png';
import HeatmapInfo from '../heatmapInfo/HeatmapInfo'

const HeatMap = ({mapId, Date1, Date2, applyClicked, setApplyClicked }) => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const svgRef = useRef(null);
    const imgRef = useRef(null);

    const originalMapSize = { width: 1591, height: 823 }; // Define original map dimensions for scaling reference
    const maxHexagons = 11808; // Set a limit to the number of hexagons to avoid memory overload


    // State to hold API data
    const [cellCounts, setCellCounts] = useState({});

    useEffect(() => {
        const fetchCellCounts = async () => {
            console.log('fhemtnnyyy', Date1)
            if (!Date1 || !Date2) {
                console.error("Start and end dates must be provided");
                return;
            }
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/behavior/cell-number-count/?start_time=${Date1}&end_time=${Date2}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCellCounts(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching cell count data:', error);

            } finally {
                setApplyClicked(false);
            }
        };

        // Call the function to fetch data

        fetchCellCounts();

    }, [applyClicked]);

    // Function to get image size once it's loaded
    useEffect(() => {
        const img = imgRef.current;
        const updateSize = () => {
            setImageSize({ width: img.width, height: img.height });
        };

        if (img.complete) {
            updateSize(); // If the image is already loaded
        } else {
            img.addEventListener('load', updateSize); // Wait for image to load
        }

        return () => img.removeEventListener('load', updateSize);
    }, [applyClicked]);

    // Generate data points dynamically based on the image size
    function generateData() {
        const data = [];
        const scaleFactor = imageSize.width / originalMapSize.width; // Calculate scale factor based on image width
        console.log(imageSize.width , originalMapSize.width);
        console.log(imageSize.height, originalMapSize.height);
        const pointSpacing = 10.5 * scaleFactor; // Adjust the spacing proportionally to the image size
        console.log('scaleFactor', scaleFactor);
        const columns = Math.floor(imageSize.width / pointSpacing);
        const rows = Math.floor(imageSize.height / pointSpacing);

        const totalHexagons = columns * rows;

        // Reduce the number of points to stay under the maxHexagons limit
        const spacingFactor = Math.sqrt(totalHexagons / maxHexagons);

        for (let i = 0; i <= imageSize.width; i += pointSpacing * spacingFactor) {
            for (let j = 0; j <= imageSize.height; j += pointSpacing * spacingFactor) {
                data.push([i, j]);
            }
        }
        return data;
    }

    const data = generateData();

    // Function to scale hexagon size based on image size
    const calculateHexRadius = () => {
        const scaleFactor = imageSize.width / originalMapSize.width;
        return 10.5 * scaleFactor; // Adjust this factor (7) to control hexagon scaling
    };

    // Update the hexbin and svg when data and imageSize are available
    useEffect(() => {
        if (imageSize.width === 0 || imageSize.height === 0) return;

        const hexRadius = calculateHexRadius(); // Get scaled hex radius

        const hexbin = d3.hexbin()
            .radius(hexRadius) // Use dynamic radius based on image size
            .extent([[0, 0], [imageSize.width, imageSize.height]]); // Set the extent to match image size

        // Generate hexbin data and log the number of hexagons created
        const hexbinData = hexbin(data);
        console.log('Number of hexagons generated:', hexbinData.length);

        // Log the center of each hexagon
        hexbinData.forEach((d, i) => {
            console.log(`Hexagon ${i} Center: x=${d.x}, y=${d.y}`);

        });

        const svg = d4.select(svgRef.current);
        const hexagons = svg.append('g')
            .selectAll('.hexagon')
            .data(hexbinData)
            .enter().append('path')
            .attr('class', 'hexagon')
            .attr('d', hexbin.hexagon())
            .attr('transform', d => `translate(${d.x},${imageSize.height - d.y})`) // Adjust y for bottom-left origin
            .style('fill', '#D9DFEE')
            .style('fill-opacity', '0.3')
            .attr('id', (d, i) => `cell_${mapId}_${i}`)
            .style('stroke', '#ffffff')
            .style('stroke-width', '0.5px')
            .on('mouseover', function (event, d) {
                const tooltip = document.querySelector('.heatmapTooltip');
                const hexagonId = d4.select(this).attr('id');
                tooltip.innerHTML = `ID: ${hexagonId}`;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            })
            .on('mouseout', function () {
                const tooltip = document.querySelector('.heatmapTooltip');
                tooltip.style.display = 'none';
            });

        return () => {
            svg.selectAll('.hexagon').remove(); // Cleanup hexagons
        };
    }, [imageSize, applyClicked]); // Add imageSize as dependency



    // Function to change hexagon color and opacity based on ID
    const changeHexagonColor = (hexagonId, color) => {
        const hexagon = d4.select(`#${hexagonId}`);
        hexagon.style('fill', color).style('fill-opacity', 1);
    };

    //Change color of hexagon with cell_ID
    useEffect(() => {
        // Create a delay to ensure the hexagons are rendered
        const timer = setTimeout(() => {
            // Iterate over the cellCounts object and dynamically call changeHexagonColor
            Object.entries(cellCounts).forEach(([cellId, count]) => {
                let color = '#000000'; // Default color

                // Determine the color based on the count
                if (count > 11) {
                    color = 'red';
                } else if (count > 8) {
                    color = '#FF6B00';
                } else if (count > 4) {
                    color = '#FEB700';
                } else if (count > 0) {
                    color = '#AAD696';
                }
                // Call the function to change the hexagon's color, using template literals correctly
                changeHexagonColor(`cell_${mapId}_${cellId}`, color);
            });
        }, 100); // Delay to allow for rendering (adjust if necessary)
        console.log(imageSize.width);
        console.log(imageSize.height);
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [cellCounts, applyClicked]); // Re-run when cellCounts changes


    return (
        <div className='heatmap'>
            <svg ref={svgRef} id="heatmapPicture" className="heat" width={imageSize.width} height={imageSize.height}></svg>
            <div className="heatmapTooltip"></div>
            <img ref={imgRef} className="heatmapbackground" src={Map} alt="mg Map" />
            <HeatmapInfo Date1={Date1} Date2={Date2} />
        </div>
    );
};

export default HeatMap;