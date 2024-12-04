'''
    def import_ticket_de_caisse_data(self, excel_file_path):
        df = pd.read_excel(excel_file_path, sheet_name='tickets de caisse du magasin', engine='openpyxl')
        records = []

        for index, row in df.iterrows():
            record = TicketsDeCaisse(
                HEURE_VENTE=row['HEURE_VENTE'],
                CODE_MAGASIN=row['CODE_MAGASIN'],
                NUM_TICKET=row['NUM_TICKET'],
                NUM_TPV=row['NUM_TPV'],
                FK_ARTICLE=row['FK_ARTICLE'],
                QTE=row['QTE'],
                CA_TTC=row['CA_TTC']
            )
            records.append(record)

            if len(records) == BATCH_SIZE:
                TicketsDeCaisse.objects.bulk_create(records)
                records = []
                connection.close()  # Close and reopen connection to prevent timeouts

        if records:
            TicketsDeCaisse.objects.bulk_create(records)
            connection.close()

        self.stdout.write(self.style.SUCCESS('Successfully loaded tickets de caisse data'))

        def import_nomenclature_data(self, excel_file_path):
        df = pd.read_excel(excel_file_path, sheet_name='nomenclature article', engine='openpyxl')
        
        for index, row in df.iterrows():
            if pd.isna(row['PK']):
                self.stdout.write(self.style.WARNING(f'Skipping row {index+1}: PK is NaN'))
                continue  # Skip rows where PK is NaN
            product_data = {
                'pk_article': row['PK'],
                'code': row['CODE'],
                'lib': row['LIB'],
                'lib_commercial': row['LIB_COMMERCIAL'],
                'ean': row['EAN'],
                'unite_mesure': row['UNITE_MESURE'],
                'code_ray': row['CODE_RAY'],
                'rayon': row['RAYON'],
                'code_marche': row['CODE_MARCHE'],
                'marche': row['MARCHE'],
                'code_famille': row['CODE_FAMILLE'],
                'famille': row['FAMILLE'],
                'sous_famille': row['SOUS_FAMILLE'],
                'code_sfa': row['CODE_SFA'],
                'code_depart': row['CODE_DEPART'],
                'departement': row['DEPARTEMENT'],
                'ubs': row['UBS'],
                'code_ubs': row['CODE_UBS'],
                'code_segment': row['CODE_SEGMENT'],
                'segment': row['SEGMENT'],
                'mode_appro': row['MODE_APPRO'],
                'groupe': row['GROUPE'],
                'commandable': row['COMMANDABLE'] if pd.notna(row['COMMANDABLE']) else False,
                'lib_mdd': row['LIB_MDD'],
                'marque': row['MARQUE'],
                'niveau_marque': row['NIVEAU_MARQUE'],
                'type_marque': row['TYPE_MARQUE'],
                'etat': row['ETAT'] if pd.notna(row['ETAT']) else False
            }

            # Use update_or_create instead of bulk_create
            Nomenclature.objects.update_or_create(
                code=row['CODE'],
                defaults=product_data
            )

        self.stdout.write(self.style.SUCCESS('Successfully loaded nomenclature article data'))
'''

import pandas as pd
from django.core.management.base import BaseCommand
from affinitytesting.models import TicketsDeCaisse, Nomenclature
from django.db import connection
from django.db.utils import IntegrityError

BATCH_SIZE = 3000  # Reduced batch size for stability

class Command(BaseCommand):
    help = 'Load data from CSV and Excel files into the database'

    def handle(self, *args, **kwargs):
        excel_file_path = 'ticket de caisse magasin cité olymique.xlsx'
        
        #self.import_nomenclature_data(excel_file_path)
        self.import_ticket_de_caisse_data(excel_file_path)

        self.stdout.write(self.style.SUCCESS('Successfully loaded data from the Excel file'))
    def import_ticket_de_caisse_data(self, excel_file_path):
        df = pd.read_excel(excel_file_path, sheet_name='tickets de caisse du magasin', engine='openpyxl')
        records = []

        for index, row in df.iterrows():
            record = TicketsDeCaisse(
                HEURE_VENTE=row['HEURE_VENTE'],
                LIB=row['LIGNE_LIBELLE'],
                CODE_MAGASIN=row['CODE_MAGASIN'],
                NUM_TICKET=row['NUM_TICKET'],
                NUM_TPV=row['NUM_TPV'],
                FK_ARTICLE=row['FK_ARTICLE'],
                QTE=row['QTE'],
                CA_TTC=row['CA_TTC']
            )
            records.append(record)

            if len(records) == BATCH_SIZE:
                TicketsDeCaisse.objects.bulk_create(records)
                records = []
                connection.close()  # Close and reopen connection to prevent timeouts

        if records:
            TicketsDeCaisse.objects.bulk_create(records)
            connection.close()

        self.stdout.write(self.style.SUCCESS('Successfully loaded tickets de caisse data'))

    