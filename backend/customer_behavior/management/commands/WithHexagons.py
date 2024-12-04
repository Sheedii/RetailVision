import json
from django.core.management.base import BaseCommand
from customer_behavior.models import BehaviorLog  # Replace 'your_app' with the name of your Django app


class Command(BaseCommand):
    help = 'Import hex_mapped_data.json data into BehaviorLog model'

    def handle(self, *args, **options):
        # Load data from JSON file
        with open('hex_mapped_data.json', 'r') as file:
            data = json.load(file)

        for entry in data:
            try:
                # Create a new BehaviorLog object with data from the JSON entry
                behavior_log = BehaviorLog(
                    _index=entry["_index"],
                    distance=entry["distance"],
                    end=entry["end"],
                    log_id=entry["id"],
                    length=entry["length"],

                    # Object details
                    object_confidence=entry["object"]["confidence"],
                    object_id=entry["object"]["id"],
                    object_type=entry["object"]["type"],

                    # Place details
                    place_name=entry["place"]["name"],

                    # Sensor details
                    sensor_description=entry["sensor"]["description"],
                    sensor_id=entry["sensor"]["id"],

                    # SmoothLocations details
                    smooth_locations_type=entry["smoothLocations"]["type"],
                    smooth_locations_coordinates=entry["smoothLocations"]["coordinates"],

                    # Additional fields
                    speed=entry["speed"],
                    timestamp=entry["timestamp"],

                    # Cell numbers from JSON field
                    cell_numbers=entry["cell_numbers"]
                )

                # Save the new BehaviorLog entry to the database
                behavior_log.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully added Log {behavior_log.log_id}'))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Failed to add entry: {e}'))