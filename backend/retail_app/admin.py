# retail_app/admin.py

from django.contrib import admin
from .models import Article, EconomicsSMG, PrixP1, PrixP3, PrixMoyenHorsPromo, PrixCible, ConcurrentsLeMoinsCher, CarrefourMarket, CarrefourHyper, Monoprix, Aziza

admin.site.register(Article)
admin.site.register(EconomicsSMG)
admin.site.register(PrixP1)
admin.site.register(PrixP3)
admin.site.register(PrixMoyenHorsPromo)
admin.site.register(PrixCible)
admin.site.register(ConcurrentsLeMoinsCher)
admin.site.register(CarrefourMarket)
admin.site.register(CarrefourHyper)
admin.site.register(Monoprix)
admin.site.register(Aziza)
