from .models import TicketDeCaisse
from datetime import datetime, timedelta
from .models import Products, Mixingtickets, mgTickets
from django.db.models import Sum
from django.utils import timezone
from collections import defaultdict
from django.db.models import Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import Counter



'''
***hedhy calculate Percentages min ghyr date***
def calculate_percentages(selected_items):
    if len(selected_items) < 2 or len(selected_items) > 10:
        raise ValueError("Number of selected items must be between 2 and 10.")
    
    sales_tickets_list = TicketDeCaisse.objects.all()

    lib_to_fk_article = {}
    for ticket in sales_tickets_list:
        libs = ticket.LIB_LIST
        fk_articles = ticket.FK_ARTICLE
        if libs and fk_articles and len(libs) == len(fk_articles):
            for i in range(len(libs)):
                lib_to_fk_article.setdefault(libs[i], []).append(fk_articles[i])

    percentages = {}
    for i in range(len(selected_items)):
        for j in range(i + 1, len(selected_items)):
            item1 = selected_items[i]
            item2 = selected_items[j]
            total_tickets = 0
            has_item_counts = {item: 0 for item in selected_items}
            has_item_counts_a = {item: 0 for item in selected_items}

            for ticket in sales_tickets_list:
                ticket_items_list = ticket.FK_ARTICLE
                if ticket_items_list:
                    for item in selected_items:
                        fk_article = lib_to_fk_article.get(item, [""])[0]
                        if fk_article in ticket_items_list:
                            has_item_counts[item] += 1

                    fk_article1 = lib_to_fk_article.get(item1, [""])[0]
                    fk_article2 = lib_to_fk_article.get(item2, [""])[0]
                    if fk_article1 in ticket_items_list and fk_article2 in ticket_items_list:
                        has_item_counts_a[item1] += 1

                    total_tickets += 1

            if item1 != item2:
                percentage_b_from_a = (has_item_counts_a[item1] / has_item_counts[item1]) * 100 if has_item_counts[item1] else 0
                percentage_a_from_b = (has_item_counts_a[item1] / has_item_counts[item2]) * 100 if has_item_counts[item2] else 0
                key = f"{item1} / {item2}"
                percentages[key] = {
                    "percentage_a_from_b": percentage_a_from_b,
                    "percentage_b_from_a": percentage_b_from_a
                }

    return percentages
'''







def get_products_by_lib_and_fk_jour_between(lib: str, first_date: datetime, last_date: datetime):
    return Products.objects.filter(LIB=lib, FK_JOUR__range=[first_date, last_date])

def get_total_quantity_by_lib_and_fk_jour_between(lib: str, first_date: datetime, last_date: datetime):
    result = Products.objects.filter(LIB=lib, FK_JOUR__range=[first_date, last_date]).aggregate(total_qt=Sum('QT'))
    return result['total_qt'] if result['total_qt'] is not None else 0

def get_total_revenue_by_lib_and_fk_jour_between(lib: str, first_date: datetime, last_date: datetime):
    result = Products.objects.filter(LIB=lib, FK_JOUR__range=[first_date, last_date]).aggregate(total_revenue=Sum('revenue'))
    return result['total_revenue'] if result['total_revenue'] is not None else 0



#api that gives you top 10 products of the yesterday if p=1 ..
def get_top_ten_products_by_quantity_yesterday(p: int):
    # Calculate yesterday's date
    yesterday = timezone.now().date() - timedelta(days=p)
    
    # Query to get the top 10 products by QT where FK_JOUR is yesterday
    top_products = Products.objects.filter(FK_JOUR__date=yesterday) \
                                   .order_by('-QT')[:10]
    
    # Return only the LIB field of the top 10 products
    return top_products


#############

#Automatic correlation matrix
from collections import Counter

def calculate_top_products(selected_item, start_date, end_date):
    # Filter tickets within the date range that include the selected item
    tickets_with_selected_item = mgTickets.objects.filter(
        HEURE_VENTE__range=(start_date, end_date),
        Lib_list__contains=[selected_item]
    )
    
    if not tickets_with_selected_item.exists():
        return []

    # Flatten the list of all products sold with the selected item
    all_co_sold_products = []
    for ticket in tickets_with_selected_item:
        co_products = ticket.Lib_list
        all_co_sold_products.extend(co_products)

    # Count occurrences of each co-sold product
    product_counts = Counter(all_co_sold_products)
    
    # Exclude "TIMBRE 100 MILLIMES" and "SAC DE CAISSE 40 MI" from the counts
    excluded_items = ["TIMBRE 100 MILLIMES", "SAC DE CAISSE 40 MI"]
    for item in excluded_items:
        if item in product_counts:
            del product_counts[item]
    
    # Get total number of tickets with the selected item
    total_tickets = tickets_with_selected_item.count()
    print('total_tickets', total_tickets)

    # Get top products, excluding the 2 specified items
    top_ = product_counts.most_common(11)
    print('top_', top_)

    # Prepare the result
    result = []
    for product_name, joint_ticket_count in top_:
        # Count how many tickets contain both the selected_item and the current product_name
        joint_tickets_count = mgTickets.objects.filter(
            HEURE_VENTE__range=(start_date, end_date),
            Lib_list__contains=[selected_item, product_name]
        ).count()

        # Calculate percentage based on joint_tickets_count
        percentage = (joint_tickets_count / total_tickets) * 100 if len(tickets_with_selected_item) else 0
        result.append({
            "product_name": product_name,
            "joint_ticket_count": joint_tickets_count,
            "percentage": round(percentage, 2)
        })
    
    return result


#Manual correlation matrix
def calculate_percentages_new(selected_items, start_date, end_date):
    try:
        if len(selected_items) < 2 or len(selected_items) > 10:
            raise ValueError("Number of selected items must be between 2 and 10.")
        print('selected_items', selected_items)
        
        # Initialize counts
        has_item_counts = {item: 0 for item in selected_items}
        print('has_item_counts', has_item_counts)
        has_item_counts_a = defaultdict(int)
        print('has_item_counts_a', has_item_counts_a)
        
        # Query the database for tickets within the date range
        tickets = mgTickets.objects.filter(HEURE_VENTE__range=[start_date, end_date])
        print('tickets', tickets)

        for ticket in tickets:
            # Convert the ticket's Lib_list to a set for faster lookups
            ticket_items_set = set(ticket.Lib_list)
            print('ticket_items_set', ticket_items_set)
            selected_set = set(selected_items)
            print('selected_set', selected_set)
            
            relevant_items = ticket_items_set.intersection(selected_set)
            print('relevant_items', relevant_items)
            # Count the occurrences of each selected item
            for item in relevant_items:
                has_item_counts[item] += 1

            # Count co-occurrences of item pairs
            for i in range(len(selected_items)):
                for j in range(i + 1, len(selected_items)):
                    item1 = selected_items[i]
                    item2 = selected_items[j]
                    if item1 in ticket_items_set and item2 in ticket_items_set:
                        has_item_counts_a[(item1, item2)] += 1

        # Calculate percentages
        percentages = {}
        for i in range(len(selected_items)):
            for j in range(i + 1, len(selected_items)):
                item1 = selected_items[i]
                item2 = selected_items[j]

                occurrence_item1 = has_item_counts[item1]
                occurrence_item2 = has_item_counts[item2]
                co_occurrence = has_item_counts_a.get((item1, item2), 0)

                percentage_b_from_a = (co_occurrence / occurrence_item1 * 100) if occurrence_item1 > 0 else 0
                percentage_a_from_b = (co_occurrence / occurrence_item2 * 100) if occurrence_item2 > 0 else 0

                percentages[f"{item1} / {item2}"] = {
                    "percentage_a_from_b": round(percentage_a_from_b, 2),
                    "percentage_b_from_a": round(percentage_b_from_a, 2)
                }

        return percentages
    except Exception as e:
        print(f"Error in calculate_percentages: {e}")
        raise

#calculate the Revenue and quantity and number of tickets of a product in a date range 
def calculate_product_sum(selected_item, start_date, end_date):
    # Filter tickets within the date range
    tickets = mgTickets.objects.filter(
        HEURE_VENTE__range=[start_date, end_date],
        Lib_list__contains=selected_item  # Fixed this line
    )

    # Calculate the sum of CA_LIST[product_name]
    Revenue_sum = 0
    Quantity_sum = 0
    ticketsNumber = 0
    for ticket in tickets:
        if selected_item in ticket.CA_LIST:
            ticketsNumber+=1
            Revenue_sum += ticket.CA_LIST[selected_item]
        if selected_item in ticket.QT_LIST:
            Quantity_sum += ticket.QT_LIST[selected_item]
    product_sum = {}
    product_sum['Revenue_sum'] = round(Revenue_sum, 2)
    product_sum['Quantity_sum'] = round(Quantity_sum, 2)
    product_sum['ticketsNumber'] = round(ticketsNumber, 2)

    return product_sum


def calculate_daily(selected_item, start_date, end_date):
    # Filter tickets within the date range that contain the selected item
    tickets = mgTickets.objects.filter(
        HEURE_VENTE__date__range=[start_date, end_date],
        Lib_list__contains=selected_item
    )

    # Initialize dictionaries to store revenue, quantity, and ticket count for each day
    daily_revenue = defaultdict(float)
    daily_quantity = defaultdict(float)
    daily_ticketsNumber = defaultdict(int)  # Track ticket count per day

    # Calculate revenue, quantity, and ticket count per day
    for ticket in tickets:
        sale_date = ticket.HEURE_VENTE.date()  # Extract the date part from the DateTimeField

        if selected_item in ticket.CA_LIST:
            daily_revenue[sale_date] += ticket.CA_LIST[selected_item]
        if selected_item in ticket.QT_LIST:
            daily_quantity[sale_date] += ticket.QT_LIST[selected_item]

        # Increment the ticket count for the day
        daily_ticketsNumber[sale_date] += 1

    # Create a list of all dates in the range, initializing missing dates with 0 revenue, quantity, and tickets
    current_date = start_date
    Daily_list = []
    while current_date <= end_date:
        Daily_list.append({
            'date': current_date,
            'revenue': round(daily_revenue[current_date], 2),  # Round to 2 decimal places
            'quantity': round(daily_quantity[current_date], 2),  # Round to 2 decimal places
            'ticketsNumber': daily_ticketsNumber[current_date]  # Get the ticket count for the day
        })
        current_date += timedelta(days=1)

    return Daily_list