from rest_framework import serializers
from .models import ProductName, Products, TicketDeCaisse, TicketsDeCaisse, Nomenclature

# 1. ProductNameSerializer
class ProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductName
        fields = ['id', 'LIB']  # Fields to be serialized

# 2. ProductsSerializer
class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = [
            'id', 
            'FK_JOUR', 
            'QT', 
            'LIB', 
            'unit_price', 
            'revenue'
        ]  # Fields to be serialized

# 3. TicketDeCaisseSerializer
class TicketDeCaisseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketDeCaisse
        fields = [
            'id', 
            'NUM_TICKET', 
            'HEURE_VENTE', 
            'FK_ARTICLE', 
            'LIB_LIST'
        ]  # Fields to be serialized

class ProductLibSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['LIB']  # Only serialize the LIB field

class TicketsDeCaisseSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = TicketsDeCaisse
        fields = [
            'id', 
            'HEURE_VENTE',
            'LIB', 
            'CODE_MAGASIN', 
            'NUM_TICKET', 
            'NUM_TPV', 
            'FK_ARTICLE', 
            'QTE', 
            'CA_TTC',
            'formatted_date'
        ]

    def get_formatted_date(self, obj):
        # Example of custom field: format date in a specific way
        if obj.HEURE_VENTE:
            return obj.HEURE_VENTE.strftime('%Y-%m-%d %H:%M:%S')
        return None

class NomenclatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = [
            'id',
            'code',
            'lib',
            'lib_commercial',
            'ean',
            'unite_mesure',
            'code_ray',
            'rayon',
            'code_marche',
            'marche',
            'code_famille',
            'famille',
            'sous_famille',
            'code_sfa',
            'code_depart',
            'departement',
            'ubs',
            'code_ubs',
            'code_segment',
            'segment',
            'mode_appro',
            'groupe',
            'commandable',
            'lib_mdd',
            'marque',
            'niveau_marque',
            'type_marque',
            'etat'
        ]

class NomenclatureLibSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ['lib']