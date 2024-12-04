import json
from django.core.management.base import BaseCommand
from affinitytesting.models import mgTickets

class Command(BaseCommand):
    help = 'Upload JSON data into the Mixingtickeyet table'

    def handle(self, *args, **kwargs):
        # Define the path to your JSON file
        file_path = 'affinitytesting_mixingticket.json'

        # Load the JSON data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)

        # Iterate through the JSON data and save each entry to the database
        for item in data:
            mgTickets.objects.create(
                NUM_TICKET=int(item['NUM_TICKET']),
                HEURE_VENTE=item['HEURE_VENTE'],
                FK_ARTICLE=item['FK_ARTICLE'],
                Lib_list=item['Lib_list'],
                CA_LIST=item['CA_LIST'],
                QT_LIST=item['QT_LIST'],
            )

        self.stdout.write(self.style.SUCCESS('Successfully uploaded the JSON data into the Mixingtickeyet table'))
