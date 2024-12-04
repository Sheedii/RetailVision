from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
import pandas as pd
import json
from django.db.models import Avg

from .models import (
    Article, EconomicsSMG, PrixP1, PrixP3, PrixMoyenHorsPromo, 
    PrixCible, ConcurrentsLeMoinsCher, CarrefourMarket, CarrefourHyper, Monoprix, Aziza
)
from .serializers import (
    ArticleSerializer, EconomicsSMGSerializer, PrixP1Serializer, 
    PrixP3Serializer, PrixMoyenHorsPromoSerializer, PrixCibleSerializer, ConcurrentsLeMoinsCherSerializer, 
    CarrefourMarketSerializer, CarrefourHyperSerializer, MonoprixSerializer, AzizaSerializer
)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class EconomicsSMGViewSet(viewsets.ModelViewSet):
    queryset = EconomicsSMG.objects.all()
    serializer_class = EconomicsSMGSerializer

class PrixP1ViewSet(viewsets.ModelViewSet):
    queryset = PrixP1.objects.all()
    serializer_class = PrixP1Serializer

class PrixP3ViewSet(viewsets.ModelViewSet):
    queryset = PrixP3.objects.all()
    serializer_class = PrixP3Serializer

class PrixMoyenHorsPromoViewSet(viewsets.ModelViewSet):
    queryset = PrixMoyenHorsPromo.objects.all()
    serializer_class = PrixMoyenHorsPromoSerializer

class PrixCibleViewSet(viewsets.ModelViewSet):
    queryset = PrixCible.objects.all()
    serializer_class = PrixCibleSerializer

class ConcurrentsLeMoinsCherViewSet(viewsets.ModelViewSet):
    queryset = ConcurrentsLeMoinsCher.objects.all()
    serializer_class = ConcurrentsLeMoinsCherSerializer

class CarrefourMarketViewSet(viewsets.ModelViewSet):
    queryset = CarrefourMarket.objects.all()
    serializer_class = CarrefourMarketSerializer

class CarrefourHyperViewSet(viewsets.ModelViewSet):
    queryset = CarrefourHyper.objects.all()
    serializer_class = CarrefourHyperSerializer

class MonoprixViewSet(viewsets.ModelViewSet):
    queryset = Monoprix.objects.all()
    serializer_class = MonoprixSerializer

class AzizaViewSet(viewsets.ModelViewSet):
    queryset = Aziza.objects.all()
    serializer_class = AzizaSerializer
@require_GET
def get_filters(request):
    # Get rayon from request parameters
    rayon_param = request.GET.get('rayon')

    # Get distinct rayons
    rayon_qs = Article.objects.filter(categorie__isnull=False).values_list('rayon', flat=True).distinct()

    # Filter categories based on the rayon parameter if provided
    if rayon_param:
        categories_qs = Article.objects.filter(rayon=rayon_param, categorie__isnull=False).values_list('categorie', flat=True).distinct()
    else:
        categories_qs = Article.objects.filter(categorie__isnull=False).values_list('categorie', flat=True).distinct()

    # Get distinct mdd and homologation values
    mdd_qs = Article.objects.filter(mdd__isnull=False).values_list('mdd', flat=True).distinct()
    homologation_qs = EconomicsSMG.objects.filter(homologation__isnull=False).values_list('homologation', flat=True).distinct()

    # Convert QuerySets to lists and clean up the data
    def clean_list(lst):
        return [item.strip() for item in lst if item and item.strip() and item.lower() != 'none']

    rayon = clean_list(list(rayon_qs))
    categories = clean_list(list(categories_qs))
    mdd = clean_list(list(mdd_qs))
    homologation = clean_list(list(homologation_qs))

    # Create a dictionary for response and only include non-empty values
    response_data = {}
    if rayon:
        response_data['rayon'] = rayon
    if categories:
        response_data['categories'] = categories
    if mdd:
        response_data['mdd'] = mdd
    if homologation:
        response_data['homologation'] = homologation

    # Return JSON response
    return JsonResponse(response_data)

couverture_columns = {
    'prix_p1': 'prix_p1_ref_couverte',
    'prix_p3': 'prix_p3_ref_couverte',
    'prix_moyen_hors_promo': 'prix_moyen_hors_promo_ref_couverte',
    'prix_cible': 'prix_cible_ref_couverte',
    'prix_min': 'prix_min_ref_couverte',
    'carrefour_market': 'carrefour_market_ref_couverture',
    'carrefour_hyper': 'carrefour_hyper_ref_couverte',
    'monoprix': 'monoprix_ref_couverte',
    'aziza': 'aziza_ref_couverte',
    'concurrents': 'prix_min_ref_couverte',
}
indice_prix_columns = {
    'aziza': 'aziza_indice_prix',
    'carrefour_hyper': 'carrefour_hyper_indice_prix',
    'carrefour_market': 'carrefour_market_indice_prix',
    'concurrents': 'prix_min_indice_prix',
    'monoprix': 'monoprix_indice_prix',
    'prix_p3': 'prix_p3_indice_prix',
    'smg': None  # No Indice prix column for SMG
}
ca_columns = {
    'aziza': 'aziza_ca_ttc_ref',
    'carrefour_hyper': 'carrefour_hyper_ca_ttc_ref',
    'carrefour_market': 'carrefour_market_ca_ttc_ref',
    'concurrents': 'prix_min_ca_ttc_ref',
    'monoprix': 'monoprix_ca_ttc_ref',
    'prix_p3': 'prix_p3_ca_ttc_ref',
    'smg': 'ca_ttc'  # Assuming this column exists in EconomicsSMG
}
price_columns = {
    'aziza': 'aziza_prix',
    'carrefour_hyper': 'carrefour_hyper_prix',
    'carrefour_market': 'carrefour_market_prix',
    'concurrents': 'prix_min',
    'monoprix': 'monoprix_prix',
    'prix_p3': 'prix_p3',
}
@csrf_exempt
def get_filtered_data(request):
    filters = json.loads(request.body.decode('utf-8'))

    def filter_df(df):     
        filtered_df = df.copy()
        if 'category' in filters:
            filtered_df = filtered_df[filtered_df['categorie'] == filters['category']]
        if 'MDD' in filters:
            filtered_df = filtered_df[filtered_df['mdd'] == filters['MDD']]
        
        return filtered_df

    def fill_na(df):
        for column in df.columns:
            if df[column].dtype == 'object':  # For string columns
                df[column] = df[column].fillna('')
            else:  # For numeric columns
                df[column] = df[column].fillna(0)
        return df

    def debug_duplicates(df):
        df_dropped = df.drop_duplicates(subset='code_article')
        return df_dropped

    # Convert Django QuerySets to DataFrames and fill NaNs
    aziza = fill_na(pd.DataFrame.from_records(Aziza.objects.all().values()))
    monoprix = fill_na(pd.DataFrame.from_records(Monoprix.objects.all().values()))
    carrefour_hyper = fill_na(pd.DataFrame.from_records(CarrefourHyper.objects.all().values()))
    carrefour_market = fill_na(pd.DataFrame.from_records(CarrefourMarket.objects.all().values()))
    concurrents_moins_cher = fill_na(pd.DataFrame.from_records(ConcurrentsLeMoinsCher.objects.all().values()))
    prix_p3 = fill_na(pd.DataFrame.from_records(PrixP3.objects.all().values()))
    smg = fill_na(pd.DataFrame.from_records(EconomicsSMG.objects.all().values()))
    prix_p1 = fill_na(pd.DataFrame.from_records(PrixP1.objects.all().values()))

    # Filter each dataset
    filtered_aziza = filter_df(aziza)
    filtered_monoprix = filter_df(monoprix)
    filtered_carrefour_hyper = filter_df(carrefour_hyper)
    filtered_carrefour_market = filter_df(carrefour_market)
    filtered_concurrents_moins_cher = filter_df(concurrents_moins_cher)
    filtered_prix_p3 = filter_df(prix_p3)
    filtered_smg = filter_df(smg)

    # Define metric calculation functions
    def calculate_metrics(df, dataset_name):
        if len(df) == 0:
            return {
                'Couverture(# refs)': 0,
                'Couverture(% CA)': 0,
                'Indice prix': 0,
                'Q1': 0,
                'Q2': 0,
                'Q3': 0,
                'Q4': 0
            }

        column_name = indice_prix_columns[dataset_name]
        couverture_column = couverture_columns[dataset_name]
        price_column = price_columns[dataset_name]

        def calc_indice_prix_par_quartile(df, bucket):
            print("Unique buckets in df:", df['bucket_de_ca'].unique())

            # Convert necessary columns to string type
            df['code_article'] = df['code_article'].astype(str)
            filtered_smg['code_article'] = filtered_smg['code_article'].astype(str)
            prix_p1['code_article'] = prix_p1['code_article'].astype(str)

            # Filter the bucket
            filtered_bucket = df[df['bucket_de_ca'] == bucket]
            print("Filtered bucket:", filtered_bucket)
            filtered_bucket = filtered_bucket[filtered_bucket[price_column].notnull() & (filtered_bucket[price_column] != '') & (filtered_bucket[price_column] != 0)]

            # Merge dataframes
            merged_df = filtered_bucket.merge(filtered_smg[['code_article', 'qte']], on='code_article', how='left')
            merged_df = merged_df.merge(prix_p1[['code_article', 'prix_p1']], on='code_article', how='left')
            print("Merged DataFrame columns:", merged_df.columns)
            # Filter out rows where price_column is empty or null

            merged_df = debug_duplicates(merged_df)
            print("Merged DataFrame after filtering null or empty price_column:", merged_df)

            # Calculate sum of price * quantity
            sum_price_qte = (merged_df[price_column] * merged_df['qte']).sum()
            print(sum_price_qte)
            sum_prix_p1_qte = (merged_df['prix_p1'] * merged_df['qte']).sum()
            print(sum_prix_p1_qte)

            return sum_price_qte / sum_prix_p1_qte if sum_prix_p1_qte != 0 else 0


        def calc_indice_prix(df):
            df = df[df[price_column].notnull() & (df[price_column] != '') & (df[price_column] != 0)]
            filtered_indices = filtered_smg.index.intersection(df.index)
            sum_price_qte = (df.loc[filtered_indices, price_column] * filtered_smg.loc[filtered_indices, 'qte']).sum()
            sum_prix_p1_qte = (prix_p1.loc[filtered_indices, 'prix_p1'] * filtered_smg.loc[filtered_indices, 'qte']).sum()

            return sum_price_qte / sum_prix_p1_qte if sum_prix_p1_qte != 0 else 0

        def calc_couverture_ca(df):
            sum_product = (df[column_name] * filtered_smg["ca_ttc"]).sum()
            sum_ca_ttc = filtered_smg["ca_ttc"].sum()
            return sum_product / sum_ca_ttc if sum_ca_ttc != 0 else 0

        def calc_couverture(df):
            filtered_df = debug_duplicates(df)
            print(filtered_df)
            return int(filtered_df[couverture_column].sum())

        metrics = {
            'Couverture(# refs)': calc_couverture(df),
            'Couverture(% CA)': round(calc_couverture_ca(df) * 100, 3),
            'Indice prix': round(calc_indice_prix(df), 3),
            'Q1': round(calc_indice_prix_par_quartile(df, 'Q1'), 3),
            'Q2': round(calc_indice_prix_par_quartile(df, 'Q2'), 3),
            'Q3': round(calc_indice_prix_par_quartile(df, 'Q3'), 3),
            'Q4': round(calc_indice_prix_par_quartile(df, 'Q4'), 3)
        }
        print("Couverture :",calc_couverture(df))
        return metrics

    def calculate_smg_metrics(df):
        if len(df) == 0:
            return {
                'Couverture(# refs)': 0,
                'Couverture(% CA)': 0,
                'Indice prix': 0,
                'Q1': 0,
                'Q2': 0,
                'Q3': 0,
                'Q4': 0
            }
        df=debug_duplicates(df)
        q1_count = df[df['bucket_de_ca'] == 'Q1'].shape[0]
        q2_count = df[df['bucket_de_ca'] == 'Q2'].shape[0]
        q3_count = df[df['bucket_de_ca'] == 'Q3'].shape[0]
        q4_count = df[df['bucket_de_ca'] == 'Q4'].shape[0]
        return {
            'Couverture(# refs)': int(len(debug_duplicates(df))),
            'Couverture(% CA)': "-",
            'Indice prix': "-",
            'Q1': int(q1_count),
            'Q2': int(q2_count),
            'Q3': int(q3_count),
            'Q4': int(q4_count)
        }

    data = {
        'aziza': calculate_metrics(filtered_aziza, 'aziza'),
        'monoprix': calculate_metrics(filtered_monoprix, 'monoprix'),
        'carrefour_hyper': calculate_metrics(filtered_carrefour_hyper, 'carrefour_hyper'),
        'carrefour_market': calculate_metrics(filtered_carrefour_market, 'carrefour_market'),
        'concurrents': calculate_metrics(filtered_concurrents_moins_cher, 'concurrents'),
        'prix_p3': calculate_metrics(filtered_prix_p3, 'prix_p3'),
        'smg': calculate_smg_metrics(filtered_smg)
    }

    return JsonResponse(data)

# Vue par categorie et par liste  

@csrf_exempt
def get_filtered_data_list(request):
    filters = json.loads(request.body.decode('utf-8'))

    def filter_df(df):     
        filtered_df = df.copy()
        if 'category' in filters:
            filtered_df = filtered_df[filtered_df['categorie'] == filters['category']]
        if 'MDD' in filters:
            filtered_df = filtered_df[filtered_df['mdd'] == filters['MDD']]
        
        return filtered_df

    def fill_na(df):
        for column in df.columns:
            if df[column].dtype == 'object':  # For string columns
                df[column] = df[column].fillna('')
            else:  # For numeric columns
                df[column] = df[column].fillna(0)
        return df

    def debug_duplicates(df):
        df_dropped = df.drop_duplicates(subset='code_article')
        return df_dropped

    # Convert Django QuerySets to DataFrames and fill NaNs
    article=fill_na(pd.DataFrame.from_records(Article.objects.all().values()))
    aziza = fill_na(pd.DataFrame.from_records(Aziza.objects.all().values()))
    monoprix = fill_na(pd.DataFrame.from_records(Monoprix.objects.all().values()))
    carrefour_hyper = fill_na(pd.DataFrame.from_records(CarrefourHyper.objects.all().values()))
    carrefour_market = fill_na(pd.DataFrame.from_records(CarrefourMarket.objects.all().values()))
    concurrents_moins_cher = fill_na(pd.DataFrame.from_records(ConcurrentsLeMoinsCher.objects.all().values()))
    prix_p3 = fill_na(pd.DataFrame.from_records(PrixP3.objects.all().values()))
    smg = fill_na(pd.DataFrame.from_records(EconomicsSMG.objects.all().values()))
    prix_p1 = fill_na(pd.DataFrame.from_records(PrixP1.objects.all().values()))

    # Filter each dataset
    filtered_article = filter_df(article)
    filtered_aziza = filter_df(aziza)
    filtered_monoprix = filter_df(monoprix)
    filtered_carrefour_hyper = filter_df(carrefour_hyper)
    filtered_carrefour_market = filter_df(carrefour_market)
    filtered_concurrents_moins_cher = filter_df(concurrents_moins_cher)
    filtered_prix_p3 = filter_df(prix_p3)
    filtered_smg = filter_df(smg)

    # Define metric calculation functions
    def calculate_metrics(df, dataset_name):
        if len(df) == 0:
            return {
                'Couverture(# refs)': 0,
                'Couverture(% CA)': 0,
                'Indice prix': 0,
                'Q1': 0,
                'Q2': 0,
                'Q3': 0,
                'Q4': 0
            }

        column_name = indice_prix_columns[dataset_name]
        couverture_column = couverture_columns[dataset_name]
        price_column = price_columns[dataset_name]

        def calc_indice_prix_par_liste(df,list,filtered_smg):
            filtered_smg = filtered_smg[filtered_smg['liste_de_guerre_course'] == list]
            df = df[df[price_column].notnull() & (df[price_column] != '') & (df[price_column] != 0)]
            filtered_indices = filtered_smg.index.intersection(df.index)
            sum_price_qte = (df.loc[filtered_indices, price_column] * filtered_smg.loc[filtered_indices, 'qte']).sum()
            sum_prix_p1_qte = (prix_p1.loc[filtered_indices, 'prix_p1'] * filtered_smg.loc[filtered_indices, 'qte']).sum()

            return sum_price_qte / sum_prix_p1_qte if sum_prix_p1_qte != 0 else 0


        def calc_indice_prix(df):
            df = df[df[price_column].notnull() & (df[price_column] != '') & (df[price_column] != 0)]
            filtered_indices = filtered_smg.index.intersection(df.index)
            sum_price_qte = (df.loc[filtered_indices, price_column] * filtered_smg.loc[filtered_indices, 'qte']).sum()
            sum_prix_p1_qte = (prix_p1.loc[filtered_indices, 'prix_p1'] * filtered_smg.loc[filtered_indices, 'qte']).sum()

            return sum_price_qte / sum_prix_p1_qte if sum_prix_p1_qte != 0 else 0

        def calc_couverture_ca(df):
            sum_product = (df[column_name] * filtered_smg["ca_ttc"]).sum()
            sum_ca_ttc = filtered_smg["ca_ttc"].sum()
            return sum_product / sum_ca_ttc if sum_ca_ttc != 0 else 0

        def calc_couverture(df):
            filtered_df = debug_duplicates(df)
            return int(filtered_df[couverture_column].sum())

        metrics = {
            'Couverture(# refs)': calc_couverture(df),
            'Couverture(% CA)': round(calc_couverture_ca(df) * 100, 3),
            'Indice prix': round(calc_indice_prix(df), 3),
            'Liste de guerre': round(calc_indice_prix_par_liste(df,'LISTE DE GUERRE',filtered_smg), 3),
            'Liste de course': round(calc_indice_prix_par_liste(df,'LISTE DE COURSE',filtered_smg), 3),
            "Reste de l'assortiment": round(calc_indice_prix_par_liste(df,'',filtered_smg), 3),
        }
        print("Couverture :",calc_couverture(df))
        return metrics

    def calculate_smg_metrics(df):
        if len(df) == 0:
            return {
                'Couverture(# refs)': 0,
                'Couverture(% CA)': 0,
                'Indice prix': 0,
                'Q1': 0,
                'Q2': 0,
                'Q3': 0,
                'Q4': 0
            }       
        df=debug_duplicates(df)
        filtered_df1 = df[df['liste_de_guerre_course'] == 'LISTE DE GUERRE']
        q1_count = len(filtered_df1)
        
        filtered_df2 = df[df['liste_de_guerre_course'] == 'LISTE DE COURSE']
        q2_count = len(filtered_df2)
        
        filtered_df3 = df[df['liste_de_guerre_course'] == '']
        q3_count = len(filtered_df3)
        return {
            'Couverture(# refs)': int(len(debug_duplicates(df))),
            'Couverture(% CA)': "-",
            'Indice prix': "-",
            'Liste de guerre': int(q1_count),
            'Liste de course': int(q2_count),
            "Reste de l'assortiment": int(q3_count)
        }

    data = {
        'aziza': calculate_metrics(filtered_aziza, 'aziza'),
        'monoprix': calculate_metrics(filtered_monoprix, 'monoprix'),
        'carrefour_hyper': calculate_metrics(filtered_carrefour_hyper, 'carrefour_hyper'),
        'carrefour_market': calculate_metrics(filtered_carrefour_market, 'carrefour_market'),
        'concurrents': calculate_metrics(filtered_concurrents_moins_cher, 'concurrents'),
        'prix_p3': calculate_metrics(filtered_prix_p3, 'prix_p3'),
        'smg': calculate_smg_metrics(filtered_smg)
    }

    return JsonResponse(data)


# Pivot General


@require_GET
def get_pivot_filters(request):
    filters = {}

    # Get filter parameters from the request
    rayon = request.GET.get('rayon')
    mdd = request.GET.get('MDD')
    etat = request.GET.get('etat')
    specific_article = request.GET.get('article')
    liste_de_guerre_course = request.GET.get('liste_de_guerre_course')  # New filter for Liste de Guerre / Course
    bucket_de_ca = request.GET.get('bucket_de_ca')  # New filter for Bucket de CA

    # Clean and add filters only if they are valid (not empty, not whitespace, not 'None')
    def is_valid(value):
        return value and value.strip() and value.lower() != 'none' and value.strip() != 'nan '

    if is_valid(mdd):
        filters['mdd'] = mdd.strip()
        print(f"Applying filter on 'mdd' with value: {mdd}")
    if is_valid(etat):
        filters['etat'] = etat.strip()
        print(f"Applying filter on 'etat' with value: {etat}")
    if is_valid(specific_article):
        filters['article'] = specific_article.strip()
        print(f"Applying filter on 'article' with value: {specific_article}")
    if is_valid(liste_de_guerre_course):
        filters['liste_de_guerre_course'] = liste_de_guerre_course.strip()
        print(f"Applying filter on 'liste_de_guerre_course' with value: {liste_de_guerre_course}")
    if is_valid(bucket_de_ca):
        filters['bucket_de_ca'] = bucket_de_ca.strip()
        print(f"Applying filter on 'bucket_de_ca' with value: {bucket_de_ca}")

    print(f"Filters being applied (not including 'rayon'): {filters}")
    
    # Apply filters to each QuerySet except for article, which is filtered by rayon
    rayon_qs = Article.objects.values_list('rayon', flat=True).distinct()
    mdd_qs = Article.objects.filter(**filters).values_list('mdd', flat=True).distinct()
    etat_qs = Article.objects.filter(**filters).values_list('etat', flat=True).distinct()

    if is_valid(rayon):
        article_qs = Article.objects.filter(rayon=rayon.strip(), article__isnull=False).values_list('article', flat=True).distinct()
    else:
        article_qs = Article.objects.filter(article__isnull=False).values_list('article', flat=True).distinct()

    guerre_course_qs = Article.objects.filter(**filters).values_list('liste_guerre_course', flat=True).distinct()
    bucket_de_ca_qs = EconomicsSMG.objects.filter(**filters).values_list('bucket_de_ca', flat=True).distinct()

    # Convert QuerySets to lists and clean the data
    def clean_list(lst):
        return [item.strip() for item in lst if item and item.strip() and item.lower() != 'nan']

    rayon = clean_list(list(rayon_qs))
    mdd = clean_list(list(mdd_qs))
    etat = clean_list(list(etat_qs))
    article = clean_list(list(article_qs))
    liste_de_guerre_course = clean_list(list(guerre_course_qs))
    bucket_de_ca = clean_list(list(bucket_de_ca_qs))

    print(f"Distinct mdd values: {mdd}")
    print(f"Distinct etat values: {etat}")
    print(f"Distinct liste_de_guerre_course values: {liste_de_guerre_course}")
    print(f"Distinct bucket_de_ca values: {bucket_de_ca}")

    # Create a dictionary for response and only include non-empty values
    response_data = {}
    if rayon:
        response_data['rayon'] = rayon
    if mdd:
        response_data['mdd'] = mdd
    if etat:
        response_data['etat'] = etat
    if article:
        response_data['article'] = article
    if liste_de_guerre_course:
        response_data['liste_de_guerre_course'] = liste_de_guerre_course
    if bucket_de_ca:
        response_data['bucket_de_ca'] = bucket_de_ca

    return JsonResponse(response_data)

@csrf_exempt
def get_filtered_pivot_data(request):
    filters = json.loads(request.body.decode('utf-8'))
    print("Filters received:", filters)
    article = filters.get('article')  
    def filter_df(df):
        filtered_df = df.copy()
        
        print(f"Filters received: {filters}")
        
        for key, value in filters.items():
            if key in filtered_df.columns:
                if value:  # Only apply the filter if the value is not empty
                    print(f"Applying filter on column '{key}' with value '{value}'")
                    
                    filtered_df[key] = filtered_df[key].astype(str).str.strip()
                    
                    before_filtering = filtered_df.shape[0]
                    
                    filtered_df = filtered_df[filtered_df[key].str.contains(value, case=False, na=False)]
                    
                    after_filtering = filtered_df.shape[0]
                    print(f"Filtered {before_filtering - after_filtering} rows. Remaining rows: {after_filtering}")
                else:
                    print(f"Skipping filter on column '{key}' because the value is empty")
        
        print("Final filtered DataFrame:")
        print(filtered_df.head())
        
        return filtered_df


    def fill_na(df):
        for column in df.columns:
            if df[column].dtype == 'object':
                df[column] = df[column].fillna('')
            else:
                df[column] = df[column].fillna(0)
        return df

    # Define columns
    prix_columns = {
        'Aziza': 'aziza_prix',
        'Monoprix': 'monoprix_prix',
        'Carrefour Hyper': 'carrefour_hyper_prix',
        'Carrefour Market': 'carrefour_market_prix',
        'Concurrents Le Moins Cher': 'prix_min',
        'Prix P3': 'prix_p3',
        'Prix P1': 'prix_p1',
        'smg':'ca_ttc',
    }

    ca_columns = {
        'Aziza': 'ca_aziza',
        'Monoprix': 'ca_monoprix',
        'Carrefour Hyper': 'ca_carrefour_hyper',
        'Carrefour Market': 'ca_carrefour_market',
        'Concurrents Le Moins Cher': 'ca_concurrent_min',
        'Prix P3': 'ca_p3',
        'Prix P1': 'ca_p1',
    }

    # Load and fill NA for all datasets
    aziza = fill_na(pd.DataFrame.from_records(Aziza.objects.all().values()))
    monoprix = fill_na(pd.DataFrame.from_records(Monoprix.objects.all().values()))
    carrefour_hyper = fill_na(pd.DataFrame.from_records(CarrefourHyper.objects.all().values()))
    carrefour_market = fill_na(pd.DataFrame.from_records(CarrefourMarket.objects.all().values()))
    concurrents_moins_cher = fill_na(pd.DataFrame.from_records(ConcurrentsLeMoinsCher.objects.all().values()))
    prix_p3 = fill_na(pd.DataFrame.from_records(PrixP3.objects.all().values()))
    smg = fill_na(pd.DataFrame.from_records(EconomicsSMG.objects.all().values()))
    prix_p1 = fill_na(pd.DataFrame.from_records(PrixP1.objects.all().values()))
    articles = fill_na(pd.DataFrame.from_records(Article.objects.all().values()))

    # Apply filters to SMG (the main dataset being analyzed)
    print("Datasets filtered")
    filtered_smg = filter_df(smg)
    print(filtered_smg)
    filtered_aziza = filter_df(aziza)
    print(filtered_aziza)
    filtered_monoprix = filter_df(monoprix)
    print(filtered_monoprix)
    filtered_carrefour_hyper = filter_df(carrefour_hyper)
    print(filtered_carrefour_hyper)
    filtered_carrefour_market = filter_df(carrefour_market)
    print(filtered_carrefour_market)
    filtered_concurrents_moins_cher = filter_df(concurrents_moins_cher)
    print(filtered_concurrents_moins_cher)
    filtered_prix_p3 = filter_df(prix_p3)
    print(filtered_prix_p3)
    filtered_prix_p1 = filter_df(prix_p1)

    print('filtered_smg')
    print(filtered_smg)
    def calculate_metrics_for_group(group):
        if group.empty:
            return {
                '# articles': 0,
                'CA TTC': 0,
                'Ind PrixP3': 0,
                'Couverture P3': 0,
                'Ind Prix concurrent min': 0,
                'Couverture concurrent min': 0,
                'Ind Prix Carrefour Market': 0,
                'Couverture Carrefour Market': 0,
                'Ind Prix Carrefour Hyper': 0,
                'Couverture Carrefour Hyper': 0,
                'Ind Prix Monoprix': 0,
                'Couverture Monoprix': 0,
                'Ind Prix Aziza': 0,
                'Couverture Aziza': 0
            }

        def calc_indice_prix(df, dataset_name, group_smg, group_prix_p1):
            # Get the corresponding 'prix' column for the dataset
            prix_column = prix_columns.get(dataset_name, '')
            
            # Print the dataset name for debugging purposes
            print(dataset_name)
            print(df.head())
            
            if prix_column in df.columns:
                print(f"Calculating Indice Prix for {dataset_name}: {df.shape[0]} rows found")
                
                # Ensure 'code_article' is a string and stripped of whitespace
                df['code_article'] = df['code_article'].astype(str).str.strip()
                
                # Find common articles in both group_smg and group_prix_p1
                common_articles = set(group_smg['code_article']).intersection(group_prix_p1['code_article'])
                df_filtered = df[df['code_article'].isin(common_articles)]
                
                # Filter rows where the specified 'prix' column is not null
                df_filtered = df_filtered[df_filtered[prix_column].notnull() & (df_filtered[prix_column] != '') & (df_filtered[prix_column] != 0)]
                
                # Filter SMG and Prix P1 data to retain only common articles
                smg_filtered = group_smg[group_smg['code_article'].isin(common_articles)]
                p1_filtered = group_prix_p1[group_prix_p1['code_article'].isin(common_articles)]
                
                print(f"Filtered dataset has {df_filtered.shape[0]} rows after ensuring presence in SMG and Prix P1")

                if not df_filtered.empty:
                    # Merge the filtered dataset with SMG and Prix P1 data to get corresponding 'qte' and 'prix_p1' values
                    df_merged = df_filtered.merge(smg_filtered[['code_article', 'qte']], on='code_article', how='left')
                    df_merged = df_merged.merge(p1_filtered[['code_article', 'prix_p1']], on='code_article', how='left')
                    
                    # Calculate the sum of 'prix' times 'qte' for the dataset and for 'prix_p1'
                    sum_price_qte = (df_merged[prix_column] * df_merged['qte']).sum()
                    sum_prix_qte = (df_merged['prix_p1'] * df_merged['qte']).sum()

                    print(f"Sum of {prix_column} * qte: {sum_price_qte}")
                    print(f"Sum of prix_p1 * qte: {sum_prix_qte}")

                    # Calculate the Indice Prix
                    indice_prix = sum_price_qte / sum_prix_qte if sum_prix_qte != 0 else 0
                    print(f"Indice Prix for {dataset_name}: {indice_prix}")
                    
                    return indice_prix
                else:
                    print(f"No rows with available {prix_column} in {dataset_name} after filtering.")
                    return 0
            else:
                print(f"{prix_column} not found in {dataset_name}. Skipping Indice Prix calculation.")
                return 0



        def calc_couverture(df,dataset_name):
            prix_column = prix_columns.get(dataset_name, '')
            count_unique_articles = int(df[prix_column].nunique())
            print(f"Couverture for : {count_unique_articles} unique articles")
            return count_unique_articles

        def calc_ca_ttc(df):
            print('CA TTC :')
            print(df)
            total_ca_ttc = df['ca_ttc'].sum()
            print(f"Total CA TTC for group: {total_ca_ttc}")
            return total_ca_ttc

        # Filter datasets per category group


        metrics = {
            '# articles': calc_couverture(group_smg,'smg'),
            'CA TTC': round(calc_ca_ttc(group_smg),3),
            'Ind PrixP3': round(calc_indice_prix(group_prix_p3, 'Prix P3', group_smg, group_prix_p1), 3),
            'Couverture P3': calc_couverture(group_prix_p3, 'Prix P3'),
            'Ind Prix concurrent min': round(calc_indice_prix(group_concurrents, 'Concurrents Le Moins Cher', group_smg, group_prix_p1), 3),
            'Couverture concurrent min': calc_couverture(group_concurrents, 'Concurrents Le Moins Cher'),
            'Ind Prix Carrefour Market': round(calc_indice_prix(group_carrefour_market, 'Carrefour Market', group_smg, group_prix_p1), 3),
            'Couverture Carrefour Market': calc_couverture(group_carrefour_market, 'Carrefour Market'),
            'Ind Prix Carrefour Hyper': round(calc_indice_prix(group_carrefour_hyper, 'Carrefour Hyper', group_smg, group_prix_p1), 3),
            'Couverture Carrefour Hyper': calc_couverture(group_carrefour_hyper, 'Carrefour Hyper'),
            'Ind Prix Monoprix': round(calc_indice_prix(group_monoprix, 'Monoprix', group_smg, group_prix_p1), 3),
            'Couverture Monoprix': calc_couverture(group_monoprix, 'Monoprix'),
            'Ind Prix Aziza': round(calc_indice_prix(group_aziza, 'Aziza', group_smg, group_prix_p1), 3),
            'Couverture Aziza': calc_couverture(group_aziza, 'Aziza')
        }

        return metrics

    # Assuming 'filtered_smg' and other datasets are pandas DataFrames
    if 'categorie' in filtered_smg.columns:
        result = {}

        if article:  # Check if specific articles were selected
            # Ensure that 'code_article' in all datasets has no white spaces
            filtered_smg['code_article'] = filtered_smg['code_article'].str.strip()
            filtered_prix_p3['code_article'] = filtered_prix_p3['code_article'].str.strip()
            filtered_concurrents_moins_cher['code_article'] = filtered_concurrents_moins_cher['code_article'].str.strip()
            filtered_carrefour_market['code_article'] = filtered_carrefour_market['code_article'].str.strip()
            filtered_carrefour_hyper['code_article'] = filtered_carrefour_hyper['code_article'].str.strip()
            filtered_monoprix['code_article'] = filtered_monoprix['code_article'].str.strip()
            filtered_aziza['code_article'] = filtered_aziza['code_article'].str.strip()
            filtered_prix_p1['code_article'] = filtered_prix_p1['code_article'].str.strip()

            # Assuming `article` is a list of article names or IDs
            if isinstance(article, str):
                article = [article]  # Wrap it in a list

            # Now 'article' is guaranteed to be a list, even if it was a single string
            for a in article:
                print(f"Processing article: {a}")
                
                # Filter the 'articles' dataframe to find the matching 'code_article'
                matching_rows = articles[articles['article'] == a]

                if not matching_rows.empty:
                    # Get the 'code_article' and strip whitespace
                    code_article = matching_rows['code_article'].values[0].strip()
                    
                    # Filter the datasets based on the specific 'code_article'
                    group_smg = filtered_smg[filtered_smg['code_article'] == code_article]
                    group_prix_p3 = filtered_prix_p3[filtered_prix_p3['code_article'] == code_article]
                    group_concurrents = filtered_concurrents_moins_cher[filtered_concurrents_moins_cher['code_article'] == code_article]
                    group_carrefour_market = filtered_carrefour_market[filtered_carrefour_market['code_article'] == code_article]
                    group_carrefour_hyper = filtered_carrefour_hyper[filtered_carrefour_hyper['code_article'] == code_article]
                    group_monoprix = filtered_monoprix[filtered_monoprix['code_article'] == code_article]
                    group_aziza = filtered_aziza[filtered_aziza['code_article'] == code_article]
                    group_prix_p1 = filtered_prix_p1[filtered_prix_p1['code_article'] == code_article]

                    # Calculate metrics for the current article group
                    metrics = calculate_metrics_for_group(group_smg)
                    metrics['Article'] = a
                    result[a] = metrics
                    
                    print(f"Metrics for {a}: {metrics}")
                else:
                    print(f"No matching code_article found for article: {a}")
        else:  # If no specific articles are selected, group by 'categorie'
            grouped = filtered_smg.groupby('categorie')

            for category, group in grouped:
                print(f"Processing category: {category}")
                
                # Get the list of unique categories in the current group
                group_categories = group['categorie'].unique()
                
                # Filter related datasets based on the current 'categorie'
                group_smg = filtered_smg[filtered_smg['categorie'].isin(group_categories)]
                group_prix_p3 = filtered_prix_p3[filtered_prix_p3['categorie'].isin(group_categories)]
                group_concurrents = filtered_concurrents_moins_cher[filtered_concurrents_moins_cher['categorie'].isin(group_categories)]
                group_carrefour_market = filtered_carrefour_market[filtered_carrefour_market['categorie'].isin(group_categories)]
                group_carrefour_hyper = filtered_carrefour_hyper[filtered_carrefour_hyper['categorie'].isin(group_categories)]
                group_monoprix = filtered_monoprix[filtered_monoprix['categorie'].isin(group_categories)]
                group_aziza = filtered_aziza[filtered_aziza['categorie'].isin(group_categories)]
                group_prix_p1 = filtered_prix_p1[filtered_prix_p1['categorie'].isin(group_categories)]

                # Calculate metrics for the current category group
                metrics = calculate_metrics_for_group(group)
                metrics['Category'] = category
                result[category] = metrics
                
                print(f"Metrics for {category}: {metrics}")
    else:
        result = {'error': 'categorie column not found in the dataset'}

    return JsonResponse(result, safe=False)

# Indice de cherité
@csrf_exempt
def calculate_indice_prix(request):
    avg_monoprix_indice_prix = Monoprix.objects.filter(
        monoprix_indice_prix__isnull=False, 
        monoprix_indice_prix__gt=0
    ).aggregate(Avg('monoprix_indice_prix'))['monoprix_indice_prix__avg'] or 0

    avg_aziza_indice_prix = Aziza.objects.filter(
        aziza_indice_prix__isnull=False, 
        aziza_indice_prix__gt=0
    ).aggregate(Avg('aziza_indice_prix'))['aziza_indice_prix__avg'] or 0

    avg_carrefour_market_indice_prix = CarrefourMarket.objects.filter(
        carrefour_market_indice_prix__isnull=False, 
        carrefour_market_indice_prix__gt=0
    ).aggregate(Avg('carrefour_market_indice_prix'))['carrefour_market_indice_prix__avg'] or 0

    avg_carrefour_hyper_indice_prix = CarrefourHyper.objects.filter(
        carrefour_hyper_indice_prix__isnull=False, 
        carrefour_hyper_indice_prix__gt=0
    ).aggregate(Avg('carrefour_hyper_indice_prix'))['carrefour_hyper_indice_prix__avg'] or 0

    data = {
        'monoprix': avg_monoprix_indice_prix,
        'aziza': avg_aziza_indice_prix,
        'carrefourMarket': avg_carrefour_market_indice_prix,
        'carrefourHyper': avg_carrefour_hyper_indice_prix,
    }
    
    return JsonResponse(data)