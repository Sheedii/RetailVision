from rest_framework import viewsets
from .models import ProductName, Products, TicketDeCaisse, TicketsDeCaisse, Nomenclature, mgTickets
from .serializer import ProductNameSerializer, ProductsSerializer, TicketDeCaisseSerializer, ProductLibSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import calculate_top_products, get_top_ten_products_by_quantity_yesterday, get_total_quantity_by_lib_and_fk_jour_between, get_total_revenue_by_lib_and_fk_jour_between
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Sum, F, FloatField, ExpressionWrapper, Value
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from django.db.models.functions import Coalesce
from django.http import JsonResponse
from django.utils.timezone import make_aware
from collections import defaultdict


# ViewSet for ProductName
class ProductNameViewSet(viewsets.ModelViewSet):
    queryset = ProductName.objects.all()
    serializer_class = ProductNameSerializer

class ProductNameListView(APIView):

    def get(self, request):
        product_names = ProductName.objects.values_list('LIB', flat=True).distinct()
        return Response(product_names, status=status.HTTP_200_OK)


# ViewSet for Products
class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

# ViewSet for TicketDeCaisse
class TicketDeCaisseViewSet(viewsets.ModelViewSet):
    queryset = TicketDeCaisse.objects.all()
    serializer_class = TicketDeCaisseSerializer

class UniqueLibListView(APIView):

    def get(self, request):
        unique_libs = set()
        tickets = TicketDeCaisse.objects.all()
        for ticket in tickets:
            unique_libs.update(ticket.LIB_LIST)
        return Response(sorted(unique_libs), status=status.HTTP_200_OK)





@api_view(['GET'])
def get_products_by_lib_and_fk_jour_between(request):
    lib = request.GET.get('lib')
    first_date = request.GET.get('firstDate')
    last_date = request.GET.get('lastDate')

    try:
        # Convert string dates to datetime objects
        first_date = datetime.strptime(first_date, '%Y-%m-%d')
        last_date = datetime.strptime(last_date, '%Y-%m-%d')
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    
    products = Products.objects.filter(LIB=lib, FK_JOUR__range=[first_date, last_date])
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_total_quantity_by_lib_and_fk_jour_between_view(request):
    lib = request.GET.get('lib')
    first_date = request.GET.get('firstDate')
    last_date = request.GET.get('lastDate')

    try:
        # Convert string dates to datetime objects
        first_date = datetime.strptime(first_date, '%Y-%m-%d')
        last_date = datetime.strptime(last_date, '%Y-%m-%d')
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    
    total_quantity = get_total_quantity_by_lib_and_fk_jour_between(lib, first_date, last_date)
    return Response({"total_quantity": total_quantity}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_total_revenue_by_lib_and_fk_jour_between_view(request):
    lib = request.GET.get('lib')
    first_date = request.GET.get('firstDate')
    last_date = request.GET.get('lastDate')

    try:
        # Convert string dates to datetime objects
        first_date = datetime.strptime(first_date, '%Y-%m-%d')
        last_date = datetime.strptime(last_date, '%Y-%m-%d')
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    
    total_revenue = get_total_revenue_by_lib_and_fk_jour_between(lib, first_date, last_date)
    return Response({"total_revenue": total_revenue}, status=status.HTTP_200_OK)




class TopTenProductsView(APIView):
    def get(self, request):
        top_products = get_top_ten_products_by_quantity_yesterday(2)
        ranked_products = [
            {"LIB": product.LIB, "Rank": rank + 1}
            for rank, product in enumerate(top_products)
        ]
        return Response(ranked_products, status=status.HTTP_200_OK)
    





###############################################################"


@require_GET
def category_options_api(request):
    granularity = request.GET.get('granularity', 'RAYON').lower()

    if granularity in ['rayon', 'marche', 'famille', 'sous_famille', 'departement', 'ubs', 'segment']:
        options = Nomenclature.objects.values_list(granularity, flat=True).distinct()
        return JsonResponse(list(options), safe=False)
    else:
        return JsonResponse([], safe=False)

@csrf_exempt
def top_products_api(request):
    period = request.GET.get('period', '2024-08-21')
    category = request.GET.get('category', None)  # The value to filter by
    granularity = request.GET.get('granularity', 'RAYON').lower()  # The field to filter on
    sort_by = request.GET.get('sort_by', 'sales')

    today = datetime.strptime(period, '%Y-%m-%d').date()
    yesterday = today - timedelta(days=1)

    tickets_today = mgTickets.objects.filter(HEURE_VENTE__date=today)
    tickets_yesterday = mgTickets.objects.filter(HEURE_VENTE__date=yesterday)

    excluded_products = ['SAC DE CAISSE 40 MI ', 'TIMBRE 100 MILLIMES ']

    sales_today = {}
    sales_yesterday = {}

    if category and granularity in ['rayon', 'marche', 'famille', 'sous_famille', 'departement', 'ubs', 'segment']:
        filter_kwargs = {granularity: category.strip()}
        filtered_products = Nomenclature.objects.filter(**filter_kwargs).exclude(lib__in=excluded_products)
        product_names = set(filtered_products.values_list('lib', flat=True))

        # Eliminate trailing white spaces only from product names
        product_names = {name.rstrip() for name in product_names}

        # Helper function for fuzzy matching libs (prefix match)
        def is_similar_lib(ticket_lib, product_lib):
            return ticket_lib.startswith(product_lib) or product_lib.startswith(ticket_lib)

        # Filter each product in the ticket separately, with fuzzy matching
        def filter_relevant_products(ticket):
            relevant_ca = {lib.rstrip(): ca for lib, ca in ticket.CA_LIST.items()
                           if any(is_similar_lib(lib.rstrip(), pname) for pname in product_names)}
            relevant_qt = {lib.rstrip(): qt for lib, qt in ticket.QT_LIST.items()
                           if any(is_similar_lib(lib.rstrip(), pname) for pname in product_names)}
            return relevant_ca, relevant_qt

        # Process tickets for today
        for ticket in tickets_today:
            relevant_ca, relevant_qt = filter_relevant_products(ticket)

            for lib, ca_value in relevant_ca.items():
                if lib in sales_today:
                    sales_today[lib]['total_sales'] += relevant_qt.get(lib, 0)
                    sales_today[lib]['total_revenue'] += ca_value
                else:
                    sales_today[lib] = {
                        'total_sales': relevant_qt.get(lib, 0),
                        'total_revenue': ca_value
                    }

        # Process tickets for yesterday
        for ticket in tickets_yesterday:
            relevant_ca, relevant_qt = filter_relevant_products(ticket)

            for lib, ca_value in relevant_ca.items():
                if lib in sales_yesterday:
                    sales_yesterday[lib]['total_sales'] += relevant_qt.get(lib, 0)
                    sales_yesterday[lib]['total_revenue'] += ca_value
                else:
                    sales_yesterday[lib] = {
                        'total_sales': relevant_qt.get(lib, 0),
                        'total_revenue': ca_value
                    }

    # Combine data for today and yesterday
    products_with_details = []
    processed_product_names = set()

    for product_name, data in sales_today.items():
        sales_yesterday_value = sales_yesterday.get(product_name, {}).get('total_sales', 0)
        growth = ((data['total_sales'] - sales_yesterday_value) / (sales_yesterday_value or 1)) * 100

        if product_name not in processed_product_names:
            products_with_details.append({
                'lib': product_name,
                'total_sales': data['total_sales'],
                'total_revenue': data['total_revenue'],
                'growth': round(growth, 2)
            })
            processed_product_names.add(product_name)

    # Sort the products by the selected sorting criterion
    if sort_by == 'sales':
        products_with_details.sort(key=lambda x: x['total_sales'], reverse=True)
    elif sort_by == 'revenue':
        products_with_details.sort(key=lambda x: x['total_revenue'], reverse=True)
    elif sort_by == 'growth':
        products_with_details.sort(key=lambda x: x['growth'], reverse=True)

    top_products = products_with_details[:10]

    return JsonResponse(top_products, safe=False)



######################################################################################################

##############################################################

from .serializer import NomenclatureLibSerializer
from .services import calculate_percentages_new, calculate_product_sum, calculate_daily

#return the different product names from the nomenclature : 
class DistinctLibView(APIView):
    def get(self, request):
        distinct_libs = Nomenclature.objects.values_list('lib', flat=True).distinct()
        distinct_libs_list = list(distinct_libs)
        return Response({"items": distinct_libs_list}, status=status.HTTP_200_OK)
    
#products LIB from tickets table, it takes too much time loading specially when the data base is too large
@require_GET
def get_libs_api(request):
    try:
        # Fetch all unique lib values from the Mixingtickets table
        libs_list = list(mgTickets.objects.values_list('Lib_list', flat=True))
        # Flatten the list of lists
        libs_list = [lib for sublist in libs_list for lib in sublist]
        # Get unique values
        libs_list = list(set(libs_list))
        print("Unique libs list:", libs_list)  # Debug print
        return JsonResponse({'items': libs_list})
    except Exception as e:
        print(f"Error fetching libs: {e}")
        return JsonResponse({'error': 'Error fetching libs'}, status=500)



#Automatic correlation matrix
class TopProductsView(APIView):
    def post(self, request):
        selected_item = request.data.get("selected_item")
        start_date_str = request.data.get("start_date")
        end_date_str = request.data.get("end_date")

        if not selected_item or not start_date_str or not end_date_str:
            return Response({"error": "Missing required parameters."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert date strings to datetime objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')

            # Calculate top 7 products sold with the selected item
            top_products = calculate_top_products(selected_item, start_date, end_date)
            return Response(top_products, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occurred: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


#manual correlation 
class calculate_percentages_apii(APIView):
    def post(self, request):    
        try:
            selected_items = request.data.get("selected_items")
            start_date_str = request.data.get("start_date")
            end_date_str = request.data.get("end_date")

            if not selected_items or not start_date_str or not end_date_str:
                return JsonResponse({"error": "Missing required parameters."}, status=400)

            try:
                start_date = make_aware(datetime.strptime(start_date_str, '%Y-%m-%d'))
                end_date = make_aware(datetime.strptime(end_date_str, '%Y-%m-%d'))
            except ValueError:
                return JsonResponse({"error": "Invalid date format."}, status=400)

            # Calculate percentages
            percentages = calculate_percentages_new(selected_items, start_date, end_date)
            return JsonResponse(percentages, safe=False, status=200)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An error occurred: " + str(e)}, status=500)
        
#API for the Revenue and quantity and number of tickets of a product in a date range 
class CalculateSumAPIView(APIView):
    def post(self, request):
        selected_item = request.data.get("selected_item")
        start_date_str = request.data.get("start_date")
        end_date_str = request.data.get("end_date")

        if not selected_item or not start_date_str or not end_date_str:
            return Response({"error": "Missing required parameters."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert date strings to datetime objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
            
            #add the last date
            end_date+= timedelta(days=1)
            # Calculate top products sold with the selected item
            total_sum = calculate_product_sum(selected_item, start_date, end_date)
            return Response(total_sum, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occurred: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DailyRevenueAPIView(APIView):
    def post(self, request):
        selected_item = request.data.get("selected_item")
        start_date_str = request.data.get("start_date")
        end_date_str = request.data.get("end_date")

        if not selected_item or not start_date_str or not end_date_str:
            return Response({"error": "Missing required parameters."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Convert date strings to date objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

            # Calculate daily revenue
            revenue_data = calculate_daily(selected_item, start_date, end_date)
            return Response(revenue_data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occurred: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



