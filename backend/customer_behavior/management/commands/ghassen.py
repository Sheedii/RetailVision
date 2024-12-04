import pandas as pd
from django.core.management.base import BaseCommand
from customer_behavior.models import BehaviorMDX, MTMCMDX
from django.utils import timezone
import pytz
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Upload MTMC and Behavior MDX data to MySQL'

    def handle(self, *args, **kwargs):
        # Load CSV files with quotechar set to handle double quotes
        logger.info("Loading MTMC data from 'mtmc-mdx.csv'...")
        mtmc_df = pd.read_csv('mtmc-mdx.csv', quotechar='"')

        logger.info("Loading Behavior MDX data from 'behavior-mdx.csv'...")
        behavior_df = pd.read_csv('behavior-mdx.csv', quotechar='"')

        # Clear existing data
        self.clear_tables()

        # Insert MTMC data
        self.stdout.write(self.style.SUCCESS("Uploading MTMC data..."))
        self.upload_mtmc_data(mtmc_df)

        # Insert Behavior MDX data
        self.stdout.write(self.style.SUCCESS("Uploading Behavior MDX data..."))
        self.upload_behavior_data(behavior_df)

        self.stdout.write(self.style.SUCCESS("Data upload completed successfully."))

    def clear_tables(self):
        # Clear all records from the tables
        BehaviorMDX.objects.all().delete()
        MTMCMDX.objects.all().delete()
        logger.info("Cleared existing data from BehaviorMDX and MTMCMDX tables.")

    def upload_mtmc_data(self, df):
        numeric_fields = ['_score']  # Adjusted to actual numeric fields
        uploaded_count = 0  # Count of successfully uploaded records

        for index, row in df.iterrows():
            document = row.to_dict()

            # Convert numeric fields if necessary
            document = self.convert_numeric(document, numeric_fields)

            # Parse timestamp if applicable
            if 'timestamp' in document:
                document['timestamp'] = self.parse_timestamp(document['timestamp'])

            # Handle NaN values for non-critical fields by setting them to None
            document = self.handle_nan_values(document)

            # Check for NaN values in critical fields
            if pd.isna(document.get('_id')) or pd.isna(document.get('timestamp')):
                logger.warning(f"Skipping MTMC document {index} due to NaN values in critical fields.")
                continue  # Skip this document

            try:
                # Create the MTMCMDX object using the correct fields
                MTMCMDX.objects.create(
                    _id=document.get('_id'),
                    _index=document.get('_index'),
                    _score=document.get('_score'),
                    _type=document.get('_type'),
                    batch_id=document.get('batch.id'),  # Ensure 'batch.id' exists in your DataFrame
                    end=document.get('end'),
                    global_id=document.get('global.id'),  # Ensure 'global.id' exists in your DataFrame
                    matched=document.get('matched'),
                    object_type=document.get('object.type'),
                    timestamp=document.get('timestamp'),
                    type=document.get('type')
                )
                uploaded_count += 1  # Increment uploaded count
            except Exception as e:
                logger.error(f"Failed to insert MTMC document {index}: {e}")

        logger.info(f"Uploaded {uploaded_count} MTMC documents successfully.")

    def upload_behavior_data(self, df):
        numeric_fields = [
            '_score', 'bearing', 'distance', 'length', 
            'object.bbox.bottomY', 'object.bbox.leftX', 'object.bbox.rightX',
            'object.bbox.topY', 'object.confidence', 'object.coordinate.x',
            'object.coordinate.y', 'object.coordinate.z', 'object.location.alt',
            'object.location.lat', 'object.location.lon', 'object.speed', 'speed'
        ]
        uploaded_count = 0  # Count of successfully uploaded records

        for index, row in df.iterrows():
            document = row.to_dict()

            # Convert numeric fields
            document = self.convert_numeric(document, numeric_fields)

            # Handle NaN values for non-critical fields by setting them to None
            document = self.handle_nan_values(document)

            # Check for NaN values in critical fields
            critical_fields = ['_id', 'timestamp', 'object.id']  # Add other critical fields here
            if any(pd.isna(document.get(field)) for field in critical_fields):
                logger.warning(f"Skipping document {index} due to NaN in critical fields: {critical_fields}")
                logger.info(f"Document data: {document}")  # Log the document data for debugging
                continue  # Skip this document

            # Parse timestamp
            if 'timestamp' in document:
                document['timestamp'] = self.parse_timestamp(document['timestamp'])

            # Check again for NaN values after parsing the timestamp
            if pd.isna(document['timestamp']):
                logger.warning(f"Skipping document {index} due to invalid timestamp.")
                logger.info(f"Document data: {document}")  # Log the document data for debugging
                continue  # Skip this document

            try:
                # Create the BehaviorMDX object using the cleaned data
                BehaviorMDX.objects.create(
                    _id=document.get('_id'),
                    _index=document.get('_index'),
                    _score=document.get('_score'),
                    _type=document.get('_type'),
                    analytics_module_description=document.get('analyticsModule.description'),
                    analytics_module_id=document.get('analyticsModule.id'),
                    analytics_module_source=document.get('analyticsModule.source'),
                    analytics_module_version=document.get('analyticsModule.version'),
                    bearing=document.get('bearing'),
                    direction=document.get('direction'),
                    distance=document.get('distance'),
                    edges=document.get('edges'),
                    end=document.get('end'),
                    gazes=document.get('gazes'),
                    length=document.get('length'),
                    lip_activities=document.get('lipActivities'),
                    locations=document.get('locations'),
                    object_bbox_bottomY=document.get('object.bbox.bottomY'),
                    object_bbox_leftX=document.get('object.bbox.leftX'),
                    object_bbox_rightX=document.get('object.bbox.rightX'),
                    object_bbox_topY=document.get('object.bbox.topY'),
                    object_confidence=document.get('object.confidence'),
                    object_coordinate_x=document.get('object.coordinate.x'),
                    object_coordinate_y=document.get('object.coordinate.y'),
                    object_coordinate_z=document.get('object.coordinate.z'),
                    object_dir=document.get('object.dir'),
                    object_id=document.get('object.id'),
                    object_location_alt=document.get('object.location.alt'),
                    object_location_lat=document.get('object.location.lat'),
                    object_location_lon=document.get('object.location.lon'),
                    object_speed=document.get('object.speed'),
                    object_type=document.get('object.type'),
                    place_id=document.get('place.id'),
                    place_name=document.get('place.name'),
                    place_type=document.get('place.type'),
                    poses=document.get('poses'),
                    sensor_description=document.get('sensor.description'),
                    sensor_id=document.get('sensor.id'),
                    sensor_type=document.get('sensor.type'),
                    smooth_locations=document.get('smoothLocations'),
                    speed=document.get('speed'),
                    speed_over_time=document.get('speedOverTime'),
                    time_interval=document.get('timeInterval'),
                    timestamp=document.get('timestamp'),
                    type=document.get('type'),
                    video_path=document.get('videoPath')
                )
                uploaded_count += 1  # Increment uploaded count
            except Exception as e:
                logger.error(f"Failed to insert document {index}: {e}")

        logger.info(f"Uploaded {uploaded_count} BehaviorMDX documents successfully.")

    def parse_timestamp(self, timestamp_str):
        try:
            # Check for the "@" symbol and remove if present
            if '@' in timestamp_str:
                timestamp_str = timestamp_str.split('@')[0].strip()

            # Try parsing with time
            try:
                naive_timestamp = pd.to_datetime(timestamp_str, format='%b %d, %Y %H:%M:%S.%f', errors='coerce')
                if naive_timestamp is pd.NaT:  # Check if parsing failed
                    naive_timestamp = pd.to_datetime(timestamp_str, format='%b %d, %Y', errors='coerce')
            except ValueError:
                naive_timestamp = pd.to_datetime(timestamp_str, errors='coerce')

            # If timezone support is enabled, convert to aware datetime
            if pd.isna(naive_timestamp):
                logger.error(f"Invalid timestamp '{timestamp_str}': unable to parse.")
                return None  # Handle invalid timestamps gracefully

            if timezone.is_naive(naive_timestamp):
                aware_timestamp = pytz.utc.localize(naive_timestamp)
                return aware_timestamp
            return naive_timestamp
        except Exception as e:
            logger.error(f"Invalid timestamp '{timestamp_str}': {e}")
            return None  # Handle invalid timestamps gracefully

    def convert_numeric(self, document, numeric_fields):
        for field in numeric_fields:
            # Check if the field exists in the document
            if field in document:
                value = document[field]
                if isinstance(value, str):
                    # Remove commas from the string and check if it's a digit or can be converted to float
                    value = value.replace(',', '')  # Remove commas
                    if value.isdigit():  # Check if it's a digit in string form
                        document[field] = int(value)  # Convert to integer
                    elif self.is_float(value):
                        document[field] = float(value)  # Convert to float
                    else:
                        document[field] = None  # Set to None for non-convertible values
                elif pd.isna(value):
                    document[field] = None  # Set to None for NaN
        return document


    def handle_nan_values(self, document):
        # Replace NaN values with None for non-critical fields
        for key in document:
            if pd.isna(document[key]):
                document[key] = None  # Or set a default value if appropriate
        return document

    @staticmethod
    def is_float(value):
        try:
            float(value)
            return True
        except ValueError:
            return False