from django.urls import path
from .views import CellNumberCountView, get_heatmap_data, create_hexagon_counts, CellNumberCountViewTrackedPeople, UniquePeoplePerHourView

urlpatterns = [
    #Shedi
    path('cell-number-count/', CellNumberCountView.as_view(), name='cell-number-count'),
    path('number-count/', CellNumberCountViewTrackedPeople.as_view(), name='number-count'),


    #Ghassen
    path('heatmap/', get_heatmap_data, name='number-count'),
    path('PerHourView/', UniquePeoplePerHourView.as_view(), name='PerHourView'),

]
