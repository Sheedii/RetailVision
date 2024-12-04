import pandas as pd
from datetime import datetime
import re
from django.core.management.base import BaseCommand
from retail_app.models import (
    Article, EconomicsSMG, PrixP1, PrixP3,
    PrixMoyenHorsPromo, PrixCible, ConcurrentsLeMoinsCher,
    CarrefourMarket, CarrefourHyper, Monoprix, Aziza
)
class Command(BaseCommand):
    help = 'Import data from CSV/XLS files'

    def handle(self, *args, **kwargs):
        self.import_prix_p1()
        self.import_prix_p3()
        self.import_articles()
        self.import_aziza()
        self.import_carrefour_hyper()
        self.import_carrefour_market()
        self.import_economics_smg()
        self.import_concurrents_le_moins_cher()
        self.import_prix_moyen_hors_promo()
        self.import_monoprix()


    def handle_missing_values(self, data, columns):
        # Replace NaN with default values for specified columns
        fill_values = {col: 0 if data[col].dtype in ['int64', 'float64'] else '' for col in columns}
        data.fillna(fill_values, inplace=True)

    def import_articles(self):
        file_path = 'article.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, ['Code article', 'ARTICLE', 'CATEGORIE', 'FOURNISSEUR', 'MDD','RAYON', 'Liste de guerre / course'])
        for index, row in data.iterrows():
            Article.objects.create(
                code_article=row['Code article'],
                article=row['ARTICLE'],
                categorie=row['CATEGORIE'],
                fournisseur=row['FOURNISSEUR'],
                mdd=row['MDD'],
                rayon=row['RAYON'],
                liste_guerre_course=row['Liste de guerre / course'],
                secteur=row.get('SECTEUR', None),
                etat=row.get('ETAT', None),
                bucket_de_ca=row.get('Bucket de CA', None),
                homologation=row.get('Homologation', None)
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported Articles'))

    def import_economics_smg(self):
        file_path = 'smg.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article', 'Coût DPR', 'QTE', 'PRO QTE', 'CA TTC', 'PRO CA TTC', "Nombre d'articles", 'FREQUENTATION'
        ])
        print(data.head())
        # Replace NaN values
        data.fillna({
            'Code article': '',
            'CATEGORIE': '',
            'MDD': '',
            'Coût DPR': 0.0,
            'QTE': 0,
            'PRO QTE': 0,
            'CA TTC': 0.0,
            'PRO CA TTC': 0.0,
            "Nombre d'articles": 0,
            'FREQUENTATION': 0,
            '% promo': 0.0,
            'Liste de guerre / course': '',
            'Bucket de CA': '',
            'Homologation': ''
        }, inplace=True)
        for index, row in data.iterrows():
            try:
                EconomicsSMG.objects.create(
                    code_article=row['Code article'],
                    categorie=row['CATEGORIE'],
                    rayon=row['RAYON'],
                    mdd=row['MDD'],
                    cout_dpr=row['Coût DPR'],
                    qte=row['QTE'],
                    pro_qte=row['PRO QTE'],
                    ca_ttc=row['CA TTC'],
                    pro_ca_ttc=row['PRO CA TTC'],
                    nombre_darticles=row["Nombre d'articles"],
                    frequentation=row['FREQUENTATION'],
                    liste_de_guerre_course=row['Liste de guerre / course'],
                    etat=row.get('ETAT', None),
                    bucket_de_ca=row['Bucket de CA'],
                    homologation=row['Homologation']
                )
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error importing row {index}: {e}"))

                # Save the problematic row to a CSV file
                row.to_frame().T.to_csv(f'problematic_row_{index}.csv', index=False)
                # Alternatively, you can use the row's code_article for a unique file name
                # row.to_frame().T.to_csv(f'problematic_row_{row["Code article"]}.csv', index=False)


        self.stdout.write(self.style.SUCCESS('Successfully imported EconomicsSMG'))


    def import_prix_p1(self):
        file_path = 'prix_p1.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, ['Code article','Prix P1', 'Prix P1 - CA TTC', 'Prix P1 - MArge'])

        for index, row in data.iterrows():
            PrixP1.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],
                prix_p1=row['Prix P1'],
                prix_p1_ca_ttc=row['Prix P1 - CA TTC'],
                prix_p1_marge=row['Prix P1 - MArge'],
                bucket_de_ca=row['Bucket de CA'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported PrixP1'))

    def import_prix_p3(self):
        file_path = 'prix_p3.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Prix P3', 'Prix P3 - Ref couverte', 'Prix P3 - CA TTC Ref', 'Prix P3 - CA TTC',
            'Prix P3 - Indice prix', 'Prix P3 - Indice prix (bucket)', 'Prix P3 - Marge'
        ])

        for index, row in data.iterrows():
            PrixP3.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],
                prix_p3=row['Prix P3'],
                prix_p3_ref_couverte=row['Prix P3 - Ref couverte'],
                prix_p3_ca_ttc_ref=row['Prix P3 - CA TTC Ref'],
                prix_p3_ca_ttc=row['Prix P3 - CA TTC'],
                prix_p3_indice_prix=row['Prix P3 - Indice prix'],
                prix_p3_indice_prix_bucket=row['Prix P3 - Indice prix (bucket)'],
                prix_p3_marge=row['Prix P3 - Marge'],
                bucket_de_ca=row['Bucket de CA'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']

            )

        self.stdout.write(self.style.SUCCESS('Successfully imported PrixP3'))

    def import_prix_moyen_hors_promo(self):
        file_path = 'prix_moyen_hors_promo.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Prix moyen hors promo', 'Prix moyen hors promo - ref couverte', 'Prix moyen hors promo - CA TTC Ref',
            'Prix moyen hors promo - CA TTC', 'Prix moyen hors promo - Indice prix', 'Prix moyen hors promo - Indice prix (bucket)',
            'Prix moyen hors promo - Marge'
        ])

        for index, row in data.iterrows():
            PrixMoyenHorsPromo.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],                
                prix_moyen_hors_promo=row['Prix moyen hors promo'],
                prix_moyen_hors_promo_ref_couverte=row['Prix moyen hors promo - ref couverte'],
                prix_moyen_hors_promo_ca_ttc_ref=row['Prix moyen hors promo - CA TTC Ref'],
                prix_moyen_hors_promo_ca_ttc=row['Prix moyen hors promo - CA TTC'],
                prix_moyen_hors_promo_indice_prix=row['Prix moyen hors promo - Indice prix'],
                prix_moyen_hors_promo_indice_prix_bucket=row['Prix moyen hors promo - Indice prix (bucket)'],
                etat=row.get('ETAT', None),
                prix_moyen_hors_promo_marge=row['Prix moyen hors promo - Marge'],
                bucket_de_ca=row['Bucket de CA'],
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']    
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported PrixMoyenHorsPromo'))

    def import_prix_cible(self):
        file_path = 'prix_cible.csv'
        data = pd.read_csv(file_path)

        # Print the column names for verification
        print("Column names in CSV:", data.columns.tolist())

        # Update this list based on the actual column names in your CSV
        columns_to_handle = [
            'Code article', 'Prix cible', 'Prix cible - Ref couverte', 'Prix cible - CA TTC Ref', 'Prix cible - CA TTC', 'Prix cible - Indice prix',
            'Prix cible - Indice prix (bucket)', 'Prix cible - Marge', 'Prix cible - % impact vol', 'Prix cible - % impact CA %',
            'Prix cible - % impact marge', 'Prix cible - impact CA', 'Prix cible - impact marge'
        ]
        
        self.handle_missing_values(data, columns_to_handle)

        for index, row in data.iterrows():
            try:
                PrixCible.objects.create(
                    code_article=row['Code article'],
                    categorie=row['CATEGORIE'],
                    rayon=row['RAYON'],
                    mdd=row['MDD'],                    
                    prix_cible=float(row['Prix cible']) ,
                    prix_cible_ref_couverte=int(row['Prix cible - Ref couverte']),
                    prix_cible_ca_ttc_ref=float(row['Prix cible - CA TTC Ref']),
                    prix_cible_ca_ttc=float(row['Prix cible - CA TTC']),
                    prix_cible_indice_prix=float(row['Prix cible - Indice prix']),
                    prix_cible_indice_prix_bucket=row['Prix cible - Indice prix (bucket)'],
                    prix_cible_marge=float(row['Prix cible - Marge']),
                    prix_cible_percent_impact_vol=float(row['Prix cible - % impact vol']),
                    prix_cible_percent_impact_ca=float(row['Prix cible - % impact CA %']),
                    prix_cible_percent_impact_marge=float(row['Prix cible - % impact marge']),
                    prix_cible_impact_ca=float(row['Prix cible - impact CA']),
                    prix_cible_impact_marge=float(row['Prix cible - impact marge']),
                    bucket_de_ca=row['Bucket de CA'],
                    liste_guerre_course=row['Liste de guerre / course'],
                    homologation=row['Homologation']
                )
            except Exception as e:
                # Print the error for debugging
                print(f"Error processing row {index}: {row}")
                print(f"Exception: {e}")

        self.stdout.write(self.style.SUCCESS('Successfully imported PrixCible'))

    def import_concurrents_le_moins_cher(self):
        file_path = 'concurrent_moins_cher.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Prix Min', 'Concurrent', 'Prix Min - Ref couverte', 'Prix Min - CA TTC Ref',
            'Prix Min - CA TTC', 'Prix Min - Indice prix', 'Prix Min - Indice prix (bucket)', 'Prix Min - Marge'
        ])

        for index, row in data.iterrows():
            ConcurrentsLeMoinsCher.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],                
                prix_min=row['Prix Min'],
                concurrent=row['Concurrent'],
                prix_min_ref_couverte=row['Prix Min - Ref couverte'],
                prix_min_ca_ttc_ref=row['Prix Min - CA TTC Ref'],
                prix_min_ca_ttc=row['Prix Min - CA TTC'],
                prix_min_indice_prix=row['Prix Min - Indice prix'],
                prix_min_indice_prix_bucket=row['Prix Min - Indice prix (bucket)'],
                prix_min_marge=row['Prix Min - Marge'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                bucket_de_ca=row['Bucket de CA'],
                homologation=row['Homologation']
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported ConcurrentsLeMoinsCher'))

    def import_carrefour_market(self):
        file_path = 'carrefour_market.csv'
        data = pd.read_csv(file_path)

        # Handle missing values
        self.handle_missing_values(data, [
            'Code article','Carrefour Market Prix', 'Carrefour Market Date de relevé', 'Carrefour Market - ID Relevé',
            'Carrefour Market - Prix manuel', 'Carrefour Market - Ref couverte', 'Carrefour Market - CA TTC Ref',
            'Carrefour Market - CA TTC', 'Carrefour Market - Indice prix', 'Carrefour Market - Indice prix (bucket)',
            'Carrefour Market - Marge'
        ])

        # Convert 'Carrefour Market Date de relevé' to datetime, handle empty values
        data['Carrefour Market Date de relevé'] = pd.to_datetime(data['Carrefour Market Date de relevé'], errors='coerce')

        for index, row in data.iterrows():        
                CarrefourMarket.objects.create(
                    code_article=row['Code article'],
                    categorie=row['CATEGORIE'],
                    rayon=row['RAYON'],
                    mdd=row['MDD'],                    
                    carrefour_market_prix=row['Carrefour Market Prix'],
                    carrefour_market_date_de_releve=row['Carrefour Market Date de relevé'] if pd.notna(row['Carrefour Market Date de relevé']) else None,
                    carrefour_market_id_releve=row['Carrefour Market - ID Relevé'],
                    carrefour_market_prix_manuel=row['Carrefour Market - Prix manuel'],
                    carrefour_market_ref_couverture=row['Carrefour Market - Ref couverte'],
                    carrefour_market_ca_ttc_ref=row['Carrefour Market - CA TTC Ref'],
                    carrefour_market_ca_ttc=row['Carrefour Market - CA TTC'],
                    carrefour_market_indice_prix=row['Carrefour Market - Indice prix'],
                    carrefour_market_indice_prix_bucket=row['Carrefour Market - Indice prix (bucket)'],
                    carrefour_market_marge=row['Carrefour Market - Marge'],
                    etat=row.get('ETAT', None),
                    liste_guerre_course=row['Liste de guerre / course'],
                    bucket_de_ca=row['Bucket de CA'],
                    homologation=row['Homologation']
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported CarrefourMarket'))

    def import_carrefour_hyper(self):
        file_path = 'carrefour_hyper.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Carrefour Hyper Prix', 'Carrefour Hyper Date de relevé', 'Carrefour Hyper - ID Relevé',
            'Carrefour Hyper - Prix manuel', 'Carrefour Hyper - Ref couverte', 'Carrefour Hyper - CA TTC Ref',
            'Carrefour Hyper - CA TTC', 'Carrefour Hyper - Indice prix', 'Carrefour Hyper - Indice prix (bucket)',
            'Carrefour Hyper - Marge'
        ])
        data['Carrefour Hyper Date de relevé'] = pd.to_datetime(data['Carrefour Hyper Date de relevé'], errors='coerce')

        for index, row in data.iterrows():
            CarrefourHyper.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],                
                carrefour_hyper_prix=row['Carrefour Hyper Prix'],
                carrefour_hyper_date_de_releve=row['Carrefour Hyper Date de relevé'] if pd.notna(row['Carrefour Hyper Date de relevé']) else None,
                carrefour_hyper_id_releve=row['Carrefour Hyper - ID Relevé'],
                carrefour_hyper_prix_manuel=row['Carrefour Hyper - Prix manuel'],
                carrefour_hyper_ref_couverte=row['Carrefour Hyper - Ref couverte'],
                carrefour_hyper_ca_ttc_ref=row['Carrefour Hyper - CA TTC Ref'],
                carrefour_hyper_ca_ttc=row['Carrefour Hyper - CA TTC'],
                carrefour_hyper_indice_prix=row['Carrefour Hyper - Indice prix'],
                carrefour_hyper_indice_prix_bucket=row['Carrefour Hyper - Indice prix (bucket)'],
                carrefour_hyper_marge=row['Carrefour Hyper - Marge'],
                bucket_de_ca=row['Bucket de CA'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported CarrefourHyper'))

    def import_monoprix(self):
        file_path = 'monoprix.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Monoprix Prix', 'Monoprix Date de relevé', 'Monoprix - ID Relevé',
            'Monoprix - Prix manuel', 'Monoprix - Ref couverte', 'Monoprix - CA TTC Ref',
            'Monoprix - CA TTC', 'Monoprix - Indice prix', 'Monoprix - Indice prix (bucket)',
            'Monoprix - Marge'
        ])
        data['Monoprix Date de relevé'] = pd.to_datetime(data['Monoprix Date de relevé'], errors='coerce')

        for index, row in data.iterrows():
            Monoprix.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],                
                monoprix_prix=row['Monoprix Prix'],
                monoprix_date_de_releve=row['Monoprix Date de relevé'] if pd.notna(row['Monoprix Date de relevé']) else None,
                monoprix_id_releve=row['Monoprix - ID Relevé'],
                monoprix_prix_manuel=row['Monoprix - Prix manuel'],
                monoprix_ref_couverte=row['Monoprix - Ref couverte'],
                monoprix_ca_ttc_ref=row['Monoprix - CA TTC Ref'],
                monoprix_ca_ttc=row['Monoprix - CA TTC'],
                monoprix_indice_prix=row['Monoprix - Indice prix'],
                monoprix_indice_prix_bucket=row['Monoprix - Indice prix (bucket)'],
                monoprix_marge=row['Monoprix - Marge'],
                bucket_de_ca=row['Bucket de CA'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported Monoprix'))

    def import_aziza(self):
        file_path = 'aziza.csv'
        data = pd.read_csv(file_path)
        self.handle_missing_values(data, [
            'Code article','Aziza Prix', 'Aziza Date de relevé', 'Aziza - ID Relevé',
            'Aziza - Prix manuel', 'Aziza - Ref couverte', 'Aziza - CA TTC Ref',
            'Aziza - CA TTC', 'Aziza - Indice prix', 'Aziza - Indice prix (bucket)',
            'Aziza - Marge'
        ])
        data['Aziza Date de relevé'] = pd.to_datetime(data['Aziza Date de relevé'], errors='coerce')

        for index, row in data.iterrows():
            Aziza.objects.create(
                code_article=row['Code article'],
                categorie=row['CATEGORIE'],
                rayon=row['RAYON'],
                mdd=row['MDD'],                
                aziza_prix=row['Aziza Prix'],
                aziza_date_de_releve=row['Aziza Date de relevé'] if pd.notna(row['Aziza Date de relevé']) else None,
                aziza_id_releve=row['Aziza - ID Relevé'],
                aziza_prix_manuel=row['Aziza - Prix manuel'],
                aziza_ref_couverte=row['Aziza - Ref couverte'],
                aziza_ca_ttc_ref=row['Aziza - CA TTC Ref'],
                aziza_ca_ttc=row['Aziza - CA TTC'],
                aziza_indice_prix=row['Aziza - Indice prix'],
                aziza_indice_prix_bucket=row['Aziza - Indice prix (bucket)'],
                aziza_marge=row['Aziza - Marge'],
                bucket_de_ca=row['Bucket de CA'],
                etat=row.get('ETAT', None),
                liste_guerre_course=row['Liste de guerre / course'],
                homologation=row['Homologation']
            )

        self.stdout.write(self.style.SUCCESS('Successfully imported Aziza'))
