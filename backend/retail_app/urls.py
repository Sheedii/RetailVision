from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArticleViewSet, EconomicsSMGViewSet, PrixP1ViewSet, calculate_indice_prix,
    PrixP3ViewSet, PrixMoyenHorsPromoViewSet, PrixCibleViewSet, ConcurrentsLeMoinsCherViewSet, 
    CarrefourMarketViewSet, CarrefourHyperViewSet, MonoprixViewSet, AzizaViewSet,get_filters, get_filtered_data,get_filtered_data_list,get_pivot_filters,get_filtered_pivot_data
)

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'economics_smg', EconomicsSMGViewSet)
router.register(r'prix_p1', PrixP1ViewSet)
router.register(r'prix_p3', PrixP3ViewSet)
router.register(r'prix_moyen_hors_promo', PrixMoyenHorsPromoViewSet)
router.register(r'prix_cible', PrixCibleViewSet)
router.register(r'concurrents_le_moins_cher', ConcurrentsLeMoinsCherViewSet)
router.register(r'carrefour_market', CarrefourMarketViewSet)
router.register(r'carrefour_hyper', CarrefourHyperViewSet)
router.register(r'monoprix', MonoprixViewSet)
router.register(r'aziza', AzizaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('filters/', get_filters),
    path('get-pivot-filters/', get_pivot_filters),
    path('filtered-data/', get_filtered_data),
    path('filtered-data-list/', get_filtered_data_list),
    path('pivot-filtered-data/', get_filtered_pivot_data),
    path('Indice_prix/', calculate_indice_prix),
]
