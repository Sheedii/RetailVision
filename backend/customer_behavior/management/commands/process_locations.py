import json
import numpy as np
from scipy.spatial import KDTree
from django.core.management.base import BaseCommand
from customer_behavior.models import BehaviorLog

class Command(BaseCommand):
    help = 'Process locations.json and insert the results into the MySQL database.'

    def handle(self, *args, **kwargs):
        # Load your input JSON file (locations.json)
        with open('locations.json') as f:
            locations_data = json.load(f)

        # Hexagonal grid generation
        def generate_hex_grid(width, height, radius):
            """Generate a list of hexagon centers within the given width and height."""
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

            return hex_centers

        # Map each smoothLocations coordinate to the nearest hexagon
        def assign_to_nearest_hex(smooth_locations, hex_centers_kd_tree, hex_centers):
            hex_mapping = []

            for obj_idx, obj in enumerate(smooth_locations):
                obj_coords = obj["smoothLocations"]["coordinates"]
                nearest_hex_cells = set()

                for coord in obj_coords:
                    # Find the nearest hex center using the KDTree query
                    _, nearest_hex_idx = hex_centers_kd_tree.query(coord)
                    nearest_hex_cells.add(int(nearest_hex_idx))

                # Add cell_numbers as a new attribute to the original object
                obj["cell_numbers"] = list(nearest_hex_cells)  # Unique hex cell numbers
                hex_mapping.append(obj)  # Add the modified object with cell_numbers

            return hex_mapping

        # Set your map dimensions and hexagon radius
        map_width = 1236
        map_height = 545
        hex_radius = 7

        # Generate hexagonal grid based on map dimensions
        hex_centers = generate_hex_grid(map_width, map_height, hex_radius)
        hex_centers_kd_tree = KDTree(hex_centers)

        # Assume input data is a list of smooth locations
        smooth_locations = []
        for entry in locations_data:
            smooth_locations.append(entry)

        # Assign each smooth location to the nearest hexagon
        hex_mapped_data = assign_to_nearest_hex(smooth_locations, hex_centers_kd_tree, hex_centers)

        # Insert the mapped data into the database
        for entry in hex_mapped_data:
            # Extract relevant fields for the model
            log = BehaviorLog(
                _index=entry["_index"],
                distance=entry["distance"],
                end=entry["end"],
                log_id=entry["id"],
                length=entry["length"],
                object_confidence=entry["object"]["confidence"],
                object_id=entry["object"]["id"],
                object_type=entry["object"]["type"],
                place_name=entry["place"]["name"],
                sensor_description=entry["sensor"]["description"],
                sensor_id=entry["sensor"]["id"],
                smooth_locations_type=entry["smoothLocations"]["type"],
                smooth_locations_coordinates=entry["smoothLocations"]["coordinates"],
                speed=entry["speed"],
                timestamp=entry["timestamp"],
                cell_numbers=entry["cell_numbers"]
            )
            log.save()

        print(f"Inserted {len(hex_mapped_data)} records into the database.")
