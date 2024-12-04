import json
import numpy as np
from django.core.management.base import BaseCommand
from customer_behavior.models import BehaviorLog

class Command(BaseCommand):
    help = 'Process locations.json and insert the results into the MySQL database.'

    def handle(self, *args, **kwargs):
        print("Starting handle method...")

        # Load your input JSON file (locations.json)
        try:
            print("Opening locations.json...")
            with open('locations.json') as f:
                locations_data = json.load(f)
            print("Successfully loaded locations.json with", len(locations_data), "entries.")
        except Exception as e:
            print("Error loading locations.json:", e)
            return

        # Hexagonal grid generation
        def generate_hex_grid(width, height, radius):
            """Generate a list of hexagon centers within the given width and height."""
            print(f"Generating hex grid with width={width}, height={height}, radius={radius}...")
            hex_height = np.sqrt(3) * radius
            hex_width = 2 * radius
            hex_centers = []

            for x in np.arange(0, width, 3/2 * radius):
                for y in np.arange(0, height, hex_height):
                    # Offset every other column
                    if int(x / (3/2 * radius)) % 2 == 0:
                        hex_centers.append((x, y))
                    else:
                        hex_centers.append((x, y + hex_height / 2))
            
            print(f"Generated {len(hex_centers)} hex centers.")
            return hex_centers

        # Function to calculate Euclidean distance between two points
        def euclidean_distance(point1, point2):
            distance = np.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)
            return distance

        # Function to find the nearest hex center for a given coordinate
        def find_nearest_hex(coord, hex_centers):
            nearest_hex = None
            min_distance = float('inf')

            for hex_center in hex_centers:
                distance = euclidean_distance(coord, hex_center)
                if distance < min_distance:
                    min_distance = distance
                    nearest_hex = hex_center

            return nearest_hex

        # Map each smoothLocations coordinate to the nearest hexagon
        def assign_to_nearest_hex(smooth_locations, hex_centers):
            print("Assigning locations to nearest hexagons...")
            hex_mapping = []

            for idx, obj in enumerate(smooth_locations):
                print(f"Processing smooth location {idx + 1}/{len(smooth_locations)}")
                obj_coords = obj["smoothLocations"]["coordinates"]
                nearest_hex_cells = set()

                for coord_idx, coord in enumerate(obj_coords):
                    # Find the nearest hex center manually
                    nearest_hex_center = find_nearest_hex(coord, hex_centers)
                    nearest_hex_idx = hex_centers.index(nearest_hex_center)
                    nearest_hex_cells.add(int(nearest_hex_idx))

                # Add cell_numbers as a new attribute to the original object
                obj["cell_numbers"] = list(nearest_hex_cells)  # Unique hex cell numbers
                hex_mapping.append(obj)  # Add the modified object with cell_numbers

            print(f"Completed assigning {len(smooth_locations)} smooth locations.")
            return hex_mapping

        # Set your map dimensions and hexagon radius
        map_width = 1236
        map_height = 545
        hex_radius = 7
        print(f"Map dimensions: width={map_width}, height={map_height}, hex radius={hex_radius}")

        # Generate hexagonal grid based on map dimensions
        hex_centers = generate_hex_grid(map_width, map_height, hex_radius)

        # Assume input data is a list of smooth locations
        smooth_locations = []
        print("Loading smooth locations from input data...")
        for idx, entry in enumerate(locations_data):
            print(f"Loading entry {idx + 1}/{len(locations_data)}")
            smooth_locations.append(entry)

        # Assign each smooth location to the nearest hexagon
        print("Assigning smooth locations to hexagons...")
        hex_mapped_data = assign_to_nearest_hex(smooth_locations, hex_centers)

        # Insert the mapped data into the database
        print("Inserting mapped data into the database...")
        for entry_idx, entry in enumerate(hex_mapped_data):
            print(f"Processing entry {entry_idx + 1}/{len(hex_mapped_data)}:", entry)

            # Extract nested fields for 'object', 'place', and 'sensor'
            object_confidence = entry.get("object", {}).get("confidence", None)
            object_id = entry.get("object", {}).get("id", None)
            object_type = entry.get("object", {}).get("type", None)
            
            place_name = entry.get("place", {}).get("name", None)
            
            sensor_description = entry.get("sensor", {}).get("description", None)
            sensor_id = entry.get("sensor", {}).get("id", None)

            # Print extracted fields to inspect them
            print(f"Extracted object details: confidence={object_confidence}, id={object_id}, type={object_type}")
            print(f"Extracted place name: {place_name}")
            print(f"Extracted sensor details: description={sensor_description}, id={sensor_id}")

            # Print the fields that will be passed to the BehaviorLog model
            print("Fields to be inserted into BehaviorLog:")
            print({
                "_index": entry["_index"],
                "distance": entry["distance"],
                "end": entry["end"],
                "log_id": entry["id"],
                "length": entry["length"],
                "object_confidence": object_confidence,
                "object_id": object_id,
                "object_type": object_type,
                "place_name": place_name,
                "sensor_description": sensor_description,
                "sensor_id": sensor_id,
                "smooth_locations_type": entry["smoothLocations"]["type"],
                "smooth_locations_coordinates": entry["smoothLocations"]["coordinates"],
                "speed": entry["speed"],
                "timestamp": entry["timestamp"],
                "cell_numbers": entry["cell_numbers"]
            })

            try:
                # Insert the extracted fields into the BehaviorLog model
                log = BehaviorLog(
                    _index=entry["_index"],
                    distance=entry["distance"],
                    end=entry["end"],
                    log_id=entry["id"],
                    length=entry["length"],
                    object_confidence=object_confidence,
                    object_id=object_id,
                    object_type=object_type,
                    place_name=place_name,
                    sensor_description=sensor_description,
                    sensor_id=sensor_id,
                    smooth_locations_type=entry["smoothLocations"]["type"],
                    smooth_locations_coordinates=entry["smoothLocations"]["coordinates"],
                    speed=entry["speed"],
                    timestamp=entry["timestamp"],
                    cell_numbers=entry["cell_numbers"]
                )
                log.save()
                print(f"Successfully inserted log with log_id: {entry['id']}")
            except Exception as e:
                print(f"Error inserting log with log_id {entry['id']}: {e}")

        print(f"Inserted {len(hex_mapped_data)} records into the database.")
