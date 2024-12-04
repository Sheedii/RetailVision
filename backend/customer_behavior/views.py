from django.db.models import F
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from collections import defaultdict
from .models import BehaviorLog, uniquePeople
from datetime import datetime, timedelta


class CellNumberCountView(APIView):
    def get(self, request, *args, **kwargs):
        # Get start_time and end_time from query parameters
        start_time_str = request.query_params.get('start_time')
        end_time_str = request.query_params.get('end_time')

        # Define the expected timestamp format in the API request and database
        timestamp_format = "%b %d, %Y @ %H:%M:%S.%f"  # e.g., Oct 10, 2024 @ 09:43:57.824

        # Parse start and end times if provided, otherwise set to None
        try:
            start_time = datetime.strptime(start_time_str, timestamp_format) if start_time_str else None
            end_time = datetime.strptime(end_time_str, timestamp_format) if end_time_str else None
            print(start_time)
            print(start_time)
        except ValueError:
            return Response(
                {"error": "Invalid date format. Please use 'MMM DD, YYYY @ HH:MM:SS.sss'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch all BehaviorLog records
        logs = BehaviorLog.objects.all()

        # Filter logs within the specified time range
        if start_time and end_time:
            logs = [
                log for log in logs
                if start_time <= datetime.strptime(log.timestamp, timestamp_format) <= end_time
            ]

        # Create a dictionary to store the cell count
        cell_count = defaultdict(int)

        # Loop through each log entry and count cell numbers
        for log in logs:
            cell_numbers = log.cell_numbers  # Assumed to be a list of integers
            for cell_number in cell_numbers:
                cell_count[cell_number] += 1  # Increment count for each cell number
        
        # Only include cells with a count greater than 0
        result = {f'{cell}': count for cell, count in cell_count.items() if count > 0}

        # Return the result as a JSON response
        return Response(result, status=status.HTTP_200_OK)



class CellNumberCountViewTrackedPeople(APIView):
    def get(self, request, *args, **kwargs):
        # Step 1: Get all uniquePeople records and compile a set of matching log_ids
        matched_log_ids = set()
        
        # Loop through each uniquePeople record to get all 'matched' log_ids
        unique_people_records = uniquePeople.objects.all()
        for person in unique_people_records:
            matched_log_ids.update(entry['id'] for entry in person.matched)

        # Step 2: Filter BehaviorLog records that have a log_id in matched_log_ids
        logs = BehaviorLog.objects.filter(log_id__in=matched_log_ids)

        # Step 3: Initialize the cell count dictionary
        cell_count = defaultdict(int)

        # Step 4: Count cell numbers from the filtered BehaviorLog entries
        for log in logs:
            cell_numbers = log.cell_numbers  # Assume this is a list of integers
            for cell_number in cell_numbers:
                cell_count[cell_number] += 1  # Increment count for each cell number

        # Step 5: Prepare the result, only including cells with a count greater than 0
        result = {f'cell_{cell}': count for cell, count in cell_count.items() if count > 0}

        # Return the result as a JSON response
        return Response(result, status=status.HTTP_200_OK)

######################################################

                   #GHASSEN footprint

######################################################

class UniquePeoplePerHourView(APIView):
    def get(self, request, *args, **kwargs):
        # Get start and end date for the week
        start_date = datetime.now().replace(hour=9, minute=0, second=0, microsecond=0)  # Today at 9 AM
        
        # Initialize an empty dictionary to store unique people count
        data = []

        # Loop through each day of the week (9 AM to 9 PM)
        for day in range(7):
            day_start = start_date + timedelta(days=day)
            day_end = day_start + timedelta(hours=12)  # End at 9 PM

            # Get all logs between 9 AM and 9 PM for the current day
            logs = BehaviorLog.objects.filter(
                timestamp__gte=day_start.strftime("%Y-%m-%d %H:%M:%S"),
                timestamp__lt=day_end.strftime("%Y-%m-%d %H:%M:%S")
            )

            # Initialize a list to store unique people per hour
            unique_people_count = []

            # Loop through each hour from 9 AM to 9 PM
            for hour in range(9, 21):  # From 9 AM to 9 PM
                hour_start = day_start.replace(hour=hour, minute=0, second=0, microsecond=0)
                hour_end = hour_start + timedelta(hours=1)

                # Get the logs for the current hour
                hour_logs = logs.filter(
                    timestamp__gte=hour_start.strftime("%Y-%m-%d %H:%M:%S"),
                    timestamp__lt=hour_end.strftime("%Y-%m-%d %H:%M:%S")
                )

                # Get the unique people (object_id) for this hour
                unique_people = hour_logs.values('object_id').distinct()
                count_unique_people = unique_people.count()

                # Add the result to the list
                unique_people_count.append({
                    "hour": hour,
                    "unique_count": count_unique_people
                })
            
            # Append the results for this day
            data.append({
                "day": day_start.strftime("%A, %Y-%m-%d"),  # Day name and date
                "hours": unique_people_count
            })

        return Response(data, status=status.HTTP_200_OK)
        

######################################################

                   #GHASSEN

######################################################

import os
from django.http import JsonResponse, HttpResponse
from PIL import Image
import numpy as np
from PIL import ImageDraw
from django.conf import settings
import heapq  # For priority queue in A*
from .models import BehaviorMDX

def get_heatmap_data(request):
    try:
        print("Fetching behavior data from MySQL database...")

        # Fetch data from MySQL
        behavior_queryset = BehaviorMDX.objects.values('object_coordinate_x', 'object_coordinate_y', 'sensor_id')
        behavior_list = list(behavior_queryset)
        print('behavior_list',behavior_list)
        # Filter and validate the behavior coordinates
        filtered_behavior_list = []
        for doc in behavior_list:
            x = doc.get('object_coordinate_x')
            y = doc.get('object_coordinate_y')
            sensor_id = doc.get('sensor_id')  # Fetch sensor_id

            if x is not None and y is not None and sensor_id is not None:
                try:
                    x = float(x)
                    y = float(y)
                    filtered_behavior_list.append({'object_coordinate_x': x, 'object_coordinate_y': y, 'sensor_id': sensor_id})
                except ValueError:
                    print(f"Skipping invalid coordinates: x={x}, y={y}")

        print(f"Filtered to {len(filtered_behavior_list)} valid documents with coordinates.")

        # Specify the image path correctly
        image_path = os.path.join(settings.BASE_DIR, 'Plan-olympique.png')
        print(f"Checking for background image at: {os.path.abspath(image_path)}")

        if not os.path.exists(image_path):
            return JsonResponse({'error': 'Background image not found'}, status=404)

        # Create hexagon counts
        hexagon_counts = create_hexagon_counts(filtered_behavior_list, image_path)

        if hexagon_counts is None:
            return JsonResponse({'error': 'Heatmap processing failed'}, status=500)

        # Return hexagon cell IDs and their corresponding object counts
        return JsonResponse({'hexagon_counts': hexagon_counts})

    except Exception as e:
        print(f"Error in fetching and processing data: {e}")
        return JsonResponse({'error': str(e)}, status=500)

def create_hexagon_counts(filtered_behavior_list, image_path):
    try:
        base_image = Image.open(image_path)
        base_image = base_image.transpose(Image.FLIP_TOP_BOTTOM)  # Flip the image upside down
        width, height = base_image.size
        print(f"Base image size: width={width}, height={height}")

        # Hexagon size and dimensions
        hexagon_size = 6  # Ensure this matches front-end grid size
        hex_width = 2 * hexagon_size * np.cos(np.pi / 6)
        hex_height = 1.5 * hexagon_size

        # Total hexagons needed
        total_hexagons = 5330

        # Calculate the number of rows and columns needed
        cols = int(np.ceil(np.sqrt(total_hexagons)))  # Approximation to determine cols
        rows = int(np.ceil(total_hexagons / cols))   # Calculate rows from total hexagons

        # Adjust to ensure we can fit the required number of hexagons
        while cols * rows < total_hexagons:
            cols += 1

        print(f"Creating a grid of hexagons: rows={rows}, cols={cols}")

        # Initialize hexagon grid and count dictionary
        hexagons = np.zeros((rows, cols))
        hexagon_counts = {}

        # Example color mapping for sensors
        color_map = {
            'NVR_ch1_main_20240901095800_20240901100000': '#FFD700', 
            'NVR_ch2_main_20240901095800_20240901100001': '#FFA500', 
            'NVR_ch4_main_20240901095800_20240901100002': '#FF4500',
            'NVR_ch5_main_20240901095800_20240901100003': '#0749ed', 
            'NVR_ch6_main_20240901095800_20240901100004': '#32CD32', 
            'NVR_ch7_main_20240901095800_20240901100005': '#8A2BE2', 
        }

        def get_hexagon_id(row, col, cols):
            """ Generate a unique ID for each hexagon cell. """
            cell_id = row * cols + col
            return cell_id if cell_id < total_hexagons else None

        for behavior in filtered_behavior_list:
            x = int(behavior['object_coordinate_x'])  # Use raw coordinates without scaling
            y = int(behavior['object_coordinate_y'])  # Use raw coordinates without scaling
            sensor_id = behavior['sensor_id']  # Get sensor_id

            # Check bounds before hexagon calculation
            if 0 <= x < width and 0 <= y < height:
                # Calculate hexagon row and column based on y position
                row = int(y // hex_height)
                # Calculate column based on x position, considering staggered rows
                col = int((x - (row % 2) * (hex_width / 2)) // hex_width)

                # Validate row and column indices
                if 0 <= col < cols and 0 <= row < rows:
                    hexagon_id = get_hexagon_id(row, col, cols)

                    # Proceed only if the hexagon_id is within valid range
                    if hexagon_id is not None:
                        hexagons[row, col] += 1

                        # Update the count for each hexagon cell
                        if hexagon_id not in hexagon_counts:
                            hexagon_counts[hexagon_id] = {'count': 0, 'sensor_ids': []}

                        hexagon_counts[hexagon_id]['count'] += 1
                        hexagon_counts[hexagon_id]['sensor_ids'].append(sensor_id)

        # Color hexagons based on sensor ids
        colored_hexagons = {}
        for hexagon_id, data in hexagon_counts.items():
            if data['count'] > 0:  # Ensure there's at least one count
                unique_sensor_ids = set(data['sensor_ids'])
                print(f"Hexagon {hexagon_id} unique sensors: {unique_sensor_ids}")
                color = color_map.get(next(iter(unique_sensor_ids)), 'grey')
                colored_hexagons[hexagon_id] = {'count': data['count'], 'color': color}

        print(f"Generated colored hexagon counts for {len(colored_hexagons)} cells.")

        # Create a new image for the heatmap
        heatmap_image = base_image

        # Draw the hexagons on the heatmap image
        for hexagon_id, data in colored_hexagons.items():
            # Calculate hexagon position
            row = hexagon_id // cols
            col = hexagon_id % cols
            x_pos = int(col * hex_width + (row % 2) * (hex_width / 2))
            y_pos = int(row * hex_height)

            # Draw hexagon (this example uses rectangles, you may want to use a hexagon shape)
            color = data['color']
            hexagon_shape = [(x_pos, y_pos), (x_pos + hex_width, y_pos), (x_pos + hex_width * 1.5, y_pos + hex_height / 2), (x_pos + hex_width, y_pos + hex_height), (x_pos, y_pos + hex_height), (x_pos - hex_width / 2, y_pos + hex_height / 2)]
            ImageDraw.Draw(heatmap_image).polygon(hexagon_shape, fill=color)

        # Save the heatmap image
        heatmap_path = os.path.join(settings.MEDIA_ROOT, 'heatmap.png')
        heatmap_image.save(heatmap_path)

        print(f"Heatmap saved at: {heatmap_path}")
        return colored_hexagons

    except Exception as e:
        print(f"Error in creating hexagon counts: {e}")
        return None