from rest_framework import serializers
from .models import (
    Article, EconomicsSMG, PrixP1, PrixP3, PrixMoyenHorsPromo, 
    PrixCible, ConcurrentsLeMoinsCher, CarrefourMarket, CarrefourHyper, Monoprix, Aziza
)

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class EconomicsSMGSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicsSMG
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class PrixP1Serializer(serializers.ModelSerializer):
    class Meta:
        model = PrixP1
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class PrixP3Serializer(serializers.ModelSerializer):
    class Meta:
        model = PrixP3
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class PrixMoyenHorsPromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrixMoyenHorsPromo
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class PrixCibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrixCible
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class ConcurrentsLeMoinsCherSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcurrentsLeMoinsCher
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

class CarrefourMarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarrefourMarket
        fields = '__all__'


class CarrefourHyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarrefourHyper
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation
        
class MonoprixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monoprix
        fields = '__all__'


from rest_framework import serializers

class AzizaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aziza
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for key, value in representation.items():
            if isinstance(value, float):
                if value == float('inf') or value == float('-inf') or value != value:  # NaN check
                    representation[key] = None  # Replace with a default value
        return representation

