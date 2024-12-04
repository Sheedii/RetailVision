import json
from django.core.management.base import BaseCommand
from customer_behavior.models import uniquePeople  # Replace 'your_app_name' with the name of your Django app
from datetime import datetime

class Command(BaseCommand):
    help = 'Import data from customerBehavior.json into uniquePeople model'

    def handle(self, *args, **options):
        # Load data from JSON file
        with open('customerBehavior.json', 'r') as file:
            data = json.load(file)

        for entry in data:
            try:
                # Parse datetime fields with the new format
                end_time = datetime.strptime(entry["end"], "%b %d, %Y @ %H:%M:%S.%f")
                timestamp_time = datetime.strptime(entry["timestamp"], "%b %d, %Y @ %H:%M:%S.%f")
                
                # Create a new uniquePeople object with data from the JSON entry
                unique_person = uniquePeople(
                    id=entry["_id"],
                    index=entry["_index"],
                    log_type=entry["_type"],
                    batch_id=entry["batchId"],
                    end=end_time,
                    global_id=entry["globalId"],
                    object_type=entry["objectType"],
                    timestamp=timestamp_time,
                    matched=entry["matched"]
                )

                # Save the new uniquePeople entry to the database
                unique_person.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully added Log {unique_person.id}'))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Failed to add entry with ID {entry["_id"]}: {e}'))
