from django.db import models
import json

class ObjectDetails(models.Model):
    confidence = models.FloatField()
    object_id = models.IntegerField()  # Renamed 'id' to 'object_id' to avoid conflict with default id
    object_type = models.CharField(max_length=50)

    def __str__(self):
        return f"Object {self.object_id} - {self.object_type}"

class Place(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Sensor(models.Model):
    description = models.CharField(max_length=255)
    sensor_id = models.CharField(max_length=255)  # Renamed 'id' to 'sensor_id' to avoid conflict

    def __str__(self):
        return self.description

class SmoothLocations(models.Model):
    location_type = models.CharField(max_length=50)  # For the "type" field
    coordinates = models.JSONField()  # Using JSONField to store array of coordinates

    def __str__(self):
        return f"SmoothLocations {self.id}"

class BehaviorLog(models.Model):
    _index = models.CharField(max_length=255)
    distance = models.FloatField()
    end = models.CharField(max_length=50)
    log_id = models.CharField(max_length=255)
    length = models.IntegerField()

    # Nested attributes
    object_confidence = models.FloatField()
    object_id = models.IntegerField()
    object_type = models.CharField(max_length=50)

    place_name = models.CharField(max_length=255)

    sensor_description = models.CharField(max_length=255)
    sensor_id = models.CharField(max_length=255)

    smooth_locations_type = models.CharField(max_length=50)
    smooth_locations_coordinates = models.JSONField()

    speed = models.FloatField()
    timestamp = models.CharField(max_length=50)

    # Storing cell_numbers as a list of integers using JSONField
    cell_numbers = models.JSONField()

    def __str__(self):
        return f"Log {self.log_id}"


class BehaviorMDX(models.Model):
    id = models.AutoField(primary_key=True)  # Assuming the Id field is a unique identifier
    _id = models.CharField(max_length=255, blank=True, null=True)
    _index = models.CharField(max_length=255, blank=True, null=True)
    _score = models.FloatField(blank=True, null=True)
    _type = models.CharField(max_length=255, blank=True, null=True)
    
    analytics_module_description = models.CharField(max_length=255, blank=True, null=True)
    analytics_module_id = models.CharField(max_length=255, blank=True, null=True)
    analytics_module_source = models.CharField(max_length=255, blank=True, null=True)
    analytics_module_version = models.CharField(max_length=255, blank=True, null=True)
    
    bearing = models.FloatField(blank=True, null=True)
    direction = models.CharField(max_length=255, blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)
    edges = models.CharField(max_length=255, blank=True, null=True)  # Adjust if this should be another type
    end = models.CharField(max_length=255, blank=True, null=True)
    gazes = models.TextField(blank=True, null=True)  # Assuming this could be a list or text
    length = models.FloatField(blank=True, null=True)
    lip_activities = models.TextField(blank=True, null=True)  # Assuming this could be a list or text
    locations = models.TextField(blank=True, null=True)  # Assuming this could be a list or text

    object_bbox_bottomY = models.FloatField(blank=True, null=True)
    object_bbox_leftX = models.FloatField(blank=True, null=True)
    object_bbox_rightX = models.FloatField(blank=True, null=True)
    object_bbox_topY = models.FloatField(blank=True, null=True)
    object_confidence = models.FloatField(blank=True, null=True)
    object_coordinate_x = models.FloatField(blank=True, null=True)
    object_coordinate_y = models.FloatField(blank=True, null=True)
    object_coordinate_z = models.FloatField(blank=True, null=True)
    object_dir = models.CharField(max_length=255, blank=True, null=True)
    object_id = models.CharField(max_length=255, blank=True, null=True)
    object_location_alt = models.FloatField(blank=True, null=True)
    object_location_lat = models.FloatField(blank=True, null=True)
    object_location_lon = models.FloatField(blank=True, null=True)
    object_speed = models.FloatField(blank=True, null=True)
    object_type = models.CharField(max_length=255, blank=True, null=True)

    place_id = models.CharField(max_length=255, blank=True, null=True)
    place_name = models.CharField(max_length=255, blank=True, null=True)
    place_type = models.CharField(max_length=255, blank=True, null=True)

    poses = models.TextField(blank=True, null=True)  # Assuming this could be a list or text
    sensor_description = models.CharField(max_length=255, blank=True, null=True)
    sensor_id = models.CharField(max_length=255, blank=True, null=True)
    sensor_type = models.CharField(max_length=255, blank=True, null=True)

    smooth_locations = models.TextField(blank=True, null=True)  # Assuming this could be a list or text
    speed = models.FloatField(blank=True, null=True)
    speed_over_time = models.TextField(blank=True, null=True)  # Assuming this could be a list or text
    time_interval = models.CharField(max_length=255, blank=True, null=True)  # Adjust if this is a different type
    timestamp = models.DateTimeField(blank=True, null=True)  # Assuming timestamp is in a datetime format
    type = models.CharField(max_length=255, blank=True, null=True)
    video_path = models.CharField(max_length=255, blank=True, null=True)

    def _str_(self):
        return f"BehaviorMDX {self.id}"

class MTMCMDX(models.Model):
    id = models.AutoField(primary_key=True)  # Assuming the Id field is a unique identifier
    _id = models.CharField(max_length=255, blank=True, null=True)
    _index = models.CharField(max_length=255, blank=True, null=True)
    _score = models.FloatField(blank=True, null=True)
    _type = models.CharField(max_length=255, blank=True, null=True)

    batch_id = models.CharField(max_length=255, blank=True, null=True)
    end = models.CharField(max_length=255, blank=True, null=True)
    global_id = models.CharField(max_length=255, blank=True, null=True)
    matched = models.CharField(max_length=255, blank=True, null=True)  # Adjust type if needed
    object_type = models.CharField(max_length=255, blank=True, null=True)
    
    timestamp = models.DateTimeField(blank=True, null=True)  # Assuming timestamp is in a datetime format
    type = models.CharField(max_length=255, blank=True, null=True)

    def _str_(self):
        return f"MTMCMDX {self.id}"

class uniquePeople(models.Model):

    id = models.CharField(max_length=255, primary_key=True)  # Corresponds to the "_id" and "Id"
    index = models.CharField(max_length=255)  # Corresponds to "_index"
    log_type = models.CharField(max_length=50)  # Corresponds to "_type"
    batch_id = models.IntegerField()  # Corresponds to "batchId"
    end = models.DateTimeField()  # Corresponds to "end"
    global_id = models.IntegerField()  # Corresponds to "globalId"
    object_type = models.CharField(max_length=50)  # Corresponds to "objectType"
    timestamp = models.DateTimeField()  # Corresponds to "timestamp"

    # To store matched entries as JSON
    matched = models.JSONField()  # This will store the matched array

    def __str__(self):
        return f"{self.id} - {self.object_type}"

    class Meta:
        db_table = 'log_entries'
