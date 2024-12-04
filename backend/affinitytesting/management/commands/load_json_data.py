'''
         # Load ticketsDeCaisse.json and insert into affinity_ticketdecaisse
        with open('ticketsDeCaisse.json') as f:
            tickets_data = json.load(f)
            for item in tickets_data:
                TicketDeCaisse.objects.create(
                    NUM_TICKET=item['NUM_TICKET'],
                    HEURE_VENTE=parse_datetime(item['HEURE_VENTE']),
                    FK_ARTICLE=item['FK_ARTICLE'],
                    LIB_LIST=item['LIB_LIST']
                )
            self.stdout.write(self.style.SUCCESS('Successfully loaded ticketsDeCaisse data'))

        with open('produtNames.json') as f:
            product_names_data = json.load(f)
            for item in product_names_data:
                ProductName.objects.create(LIB=item['LIB'])
            self.stdout.write(self.style.SUCCESS('Successfully loaded productNames data'))

        # Load and insert products.json data in batches
        with open('products.json') as f:
            products_data = json.load(f)
            products_objects = []
            for item in products_data:
                unit_price = item.get('unit_price')
                QT = item['QT']
                
                # Skip this item if QT or unit_price is 0 or if unit_price is missing
                if QT == 0 or not unit_price or unit_price == 0:
                    continue
                
                # Calculate revenue if it is missing
                revenue = item.get('revenue', QT * unit_price)
                
                products_objects.append(
                    Products(
                        FK_JOUR=parse_datetime(item['FK_JOUR']['$date']),
                        QT=QT,
                        LIB=item['LIB'],
                        unit_price=unit_price,
                        revenue=revenue
                    )
                )
                
                if len(products_objects) >= BATCH_SIZE:
                    Products.objects.bulk_create(products_objects)
                    products_objects = []
            if products_objects:
                Products.objects.bulk_create(products_objects)
            self.stdout.write(self.style.SUCCESS('Successfully loaded products data'))
'''

import json
from django.core.management.base import BaseCommand
from affinitytesting.models import Products,TicketDeCaisse,ProductName
from django.utils.dateparse import parse_datetime

BATCH_SIZE = 12000  # Adjust this size based on your database's capability

class Command(BaseCommand):
    help = 'Load data from JSON files into the database'

    def handle(self, *args, **kwargs):
        # Load and insert ticketsDeCaisse.json data in batches
        # (continue with the rest of your code)

        with open('augmented_data.json') as f:
            tickets_data = json.load(f)
            for item in tickets_data:
                TicketDeCaisse.objects.create(
                    NUM_TICKET=item['NUM_TICKET'],
                    HEURE_VENTE=parse_datetime(item['HEURE_VENTE']),
                    FK_ARTICLE=item['FK_ARTICLE'],
                    LIB_LIST=item['LIB_LIST']
                )
            self.stdout.write(self.style.SUCCESS('Successfully loaded ticketsDeCaisse data'))
