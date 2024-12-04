from django.urls import path
from . import views


urlpatterns = [
    path('productNames/', views.ProductNameListView.as_view(), name='product_names_list'),
    path('uniqueLibs/', views.UniqueLibListView.as_view(), name='unique_libs_list'),
    path('products/', views.get_products_by_lib_and_fk_jour_between, name='get_products_by_lib_and_fk_jour_between'),
    path('quantity/', views.get_total_quantity_by_lib_and_fk_jour_between_view, name='get_total_quantity_by_lib_and_fk_jour_between'),
    path('allRevenue/', views.get_total_revenue_by_lib_and_fk_jour_between_view, name='get_total_revenue_by_lib_and_fk_jour_between'),
    path('10products/', views.TopTenProductsView.as_view(), name='top-ten-products'),
    path('category-options/', views.category_options_api, name='category-options'),
    path('top-products/', views.top_products_api, name='top-products'),

############
    path('distinct-libs/', views.DistinctLibView.as_view(), name='distinct-libs'),
    path('topProducts/', views.TopProductsView.as_view(), name='top_products'),
    path('calculatePercentagess/', views.calculate_percentages_apii.as_view(), name='calculate-percentages'),
    path('product_sum/', views.CalculateSumAPIView.as_view(), name='product_sum'),
    path('daily_sum/', views.DailyRevenueAPIView.as_view(), name='daily_sum'),
    path('uniqueLib/', views.get_libs_api, name='get_libs_api'), #libs from tickets database
    

]
