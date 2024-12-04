import React, { useEffect, useRef } from 'react';
import './customerFlow.css';
import FlowMap from '../../assets/CustomerFlowMap.jpg';

const CustomerFlow = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        // Get the image element
        const img = document.getElementsByClassName('image')[0];
    
        // Get the original width and height of the image
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;
    
        // Define the line coordinates as percentages of the original image dimensions
        const lineCoordinates = [
            { x: originalWidth * 0.35, y: originalHeight * 0.2 },
            { x: originalWidth * 0.35, y: originalHeight * 0.8 },
            { x: originalWidth * 0.56, y: originalHeight * 0.69 },
            { x: originalWidth * 0.58, y: originalHeight * 0.5 },
        ];
    
        // Function to draw the line with neon effect
        const drawLine = () => {
            // Draw the line with neon effect
            ctx.beginPath();
            ctx.setLineDash([1.5, 1.5]); // Set the line to be dotted (1.5px on, 1.5px off)
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'; // Neon color with opacity (green)
            ctx.lineWidth = 1.5; // Width of the line
            ctx.shadowBlur = 10; // Blur radius
            ctx.shadowColor = 'rgba(0, 255, 0, 0.8)'; // Shadow color (same as neon color)
            ctx.shadowOffsetX = 2; // Horizontal shadow offset
            ctx.shadowOffsetY = 2; // Vertical shadow offset
    
            // Move to the first point of the line
            ctx.moveTo(lineCoordinates[0].x, lineCoordinates[0].y);
    
            // Draw the line
            for (let i = 1; i < lineCoordinates.length; i++) {
                ctx.lineTo(lineCoordinates[i].x, lineCoordinates[i].y);
            }
    
            ctx.stroke(); // Draw the line
        };
    
        // Function to update canvas size to match the image size
        const updateCanvasSize = () => {
            canvas.width = img.width;
            canvas.height = img.height;
        };
    
        // Set the canvas size and draw the line immediately
        updateCanvasSize();
        drawLine();
    
        // Example: Update visitors count every 5 seconds
        setInterval(() => {
            // Simulate getting the number of visitors from a server or database
            const numVisitors = Math.floor(Math.random() * 1000); // Example: random number of visitors
            const visitorCountElement = document.getElementById("visitorCount");
            if (visitorCountElement) {
                visitorCountElement.innerText = numVisitors; // Update visitors count
            }
        }, 5000);
    }, []);
    
    return (
        <div className='CustomerFlow'>
            <div className="containerCustomerFlow">
                <img src={FlowMap} alt="Flow Map" className="image" />
                <div className="rectangleCustomerFlow">
                    <div id="datetime">25/04/2024</div>
                    <div id="visitors">Visitors: <span id="visitorCount">0</span></div>
                    <ul className="zone-listCustomerFlow">
                        <li>Total Visitors Zone 1</li>
                        <li>Total Visitors Zone 2</li>
                        <li>Total Visitors Zone 3</li>
                    </ul>
                </div>
                <div className="pixel-viewer"></div>
                <div className="sphere" style={{ left: '30%', top: '20%', backgroundColor: '#AAD696', width: '20px', height: '20px' }}></div>
                <div className="sphere" style={{ left: '48%', top: '50%', backgroundColor: '#62B5B5', width: '20px', height: '20px' }}></div>
                <div className="sphere" style={{ left: '48%', top: '70%', backgroundColor: '#FF6B00', width: '20px', height: '20px' }}></div>
                <div className="sphere" style={{ left: '30%', top: '80%', backgroundColor: '#FEB700', width: '20px', height: '20px' }}></div>

                <div className="large-sphere" style={{ left: 'calc(30% - 25px)', top: 'calc(20% - 25px)', backgroundColor: '#AAD696', width: '70px', height: '70px' }}></div>
                <div className="large-sphere" style={{ left: 'calc(48% - 25px)', top: 'calc(50% - 25px)', backgroundColor: '#62B5B5', width: '70px', height: '70px' }}></div>
                <div className="large-sphere" style={{ left: 'calc(48% - 25px)', top: 'calc(70% - 25px)', backgroundColor: '#FF6B00', width: '70px', height: '70px' }}></div>
                <div className="large-sphere" style={{ left: 'calc(30% - 25px)', top: 'calc(80% - 25px)', backgroundColor: '#FEB700', width: '70px', height: '70px' }}></div>

                <canvas ref={canvasRef} id="canvas"></canvas>
            </div>
        </div>
    )
}

export default CustomerFlow;
