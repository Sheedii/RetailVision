from django.db import models

# 1. ProductName model
class ProductName(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incremented integer field
    LIB = models.CharField(max_length=255)  # String (varchar 255)

    def __str__(self):
        return self.LIB

# 2. Products model
class Products(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incremented integer field
    FK_JOUR = models.DateTimeField()  # Date field (from the JSON example)
    QT = models.IntegerField()  # Integer field for quantity
    LIB = models.CharField(max_length=255)  # String (varchar 255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)  # Decimal field for price
    revenue = models.DecimalField(max_digits=10, decimal_places=2)  # Decimal field for revenue

    def __str__(self):
        return self.LIB

# 3. TicketDeCaisse model
class TicketDeCaisse(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incremented integer field
    NUM_TICKET = models.IntegerField()  # Integer field for ticket number
    HEURE_VENTE = models.DateTimeField()  # DateTime field for sale time
    FK_ARTICLE = models.JSONField()  # JSON field for article references (array of integers)
    LIB_LIST = models.JSONField()  # JSON field for list of article names (array of strings)

    def __str__(self):
        return str(self.NUM_TICKET)

class TicketsDeCaisse(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incremented integer field
    HEURE_VENTE = models.DateTimeField(null=True, blank=True)  # DateTime field for sale time
    LIB = models.CharField(max_length=255)
    CODE_MAGASIN= models.IntegerField(null=True, blank=True)  # Integer field for magasin number
    NUM_TICKET = models.IntegerField(null=True, blank=True)  # Integer field for ticket number
    NUM_TPV= models.IntegerField(null=True, blank=True)  # Integer field for ticket number
    FK_ARTICLE = models.JSONField(null=True, blank=True)  # JSON field for article references (array of integers)
    QTE = models.FloatField(null=True, blank=True) # Float field for ticket number
    CA_TTC = models.FloatField(null=True, blank=True)  # JSON field for list of article names (array of strings)

    
    def str(self):
        return str(self.NUM_TICKET)



class Nomenclature(models.Model):
     # Primary key
    pk_article = models.IntegerField(null=True, unique=True)

    # Columns with various data types
    code = models.CharField(max_length=255, unique=True)
    lib = models.CharField(max_length=255)
    lib_commercial = models.CharField(max_length=255)
    ean = models.CharField(max_length=13, blank=True, null=True)  # EAN can be optional
    unite_mesure = models.CharField(max_length=50)
    
    code_ray = models.CharField(max_length=50)
    rayon = models.CharField(max_length=100)
    code_marche = models.CharField(max_length=50)
    marche = models.CharField(max_length=100)
    
    code_famille = models.CharField(max_length=50)
    famille = models.CharField(max_length=100)
    sous_famille = models.CharField(max_length=100, blank=True, null=True)
    code_sfa = models.CharField(max_length=50, blank=True, null=True)
    
    code_depart = models.CharField(max_length=50)
    departement = models.CharField(max_length=100)
    ubs = models.CharField(max_length=50, blank=True, null=True)
    code_ubs = models.CharField(max_length=50, blank=True, null=True)
    
    code_segment = models.CharField(max_length=50)
    segment = models.CharField(max_length=100)
    mode_appro = models.CharField(max_length=50)
    groupe = models.CharField(max_length=100, blank=True, null=True)
    
    commandable = models.BooleanField(default=True)
    lib_mdd = models.CharField(max_length=100, blank=True, null=True)
    marque = models.CharField(max_length=100, blank=True, null=True)
    niveau_marque = models.CharField(max_length=50, blank=True, null=True)
    type_marque = models.CharField(max_length=50, blank=True, null=True)
    etat = models.CharField(max_length=50)

    def _str_(self):
        return self.lib_commercial
    
class Mixingtickets(models.Model):
    NUM_TICKET = models.IntegerField()  # Integer field for ticket number
    HEURE_VENTE = models.DateTimeField()  # DateTime field for sale time
    FK_ARTICLE = models.JSONField()  # JSON field for article references (array of integers)
    Lib_list = models.JSONField()  # JSON field for article names (array of strings)
    CA_LIST = models.JSONField()  # JSON field for CA_TTC values (dictionary {Lib:CA_TTC})
    QT_LIST = models.JSONField()  # JSON field for QTE values (dictionary {Lib:QTE})

    def __str__(self):
        return str(self.NUM_TICKET)
    
class mgTickets(models.Model):
    NUM_TICKET = models.IntegerField()  # Integer field for ticket number
    HEURE_VENTE = models.DateTimeField()  # DateTime field for sale time
    FK_ARTICLE = models.JSONField()  # JSON field for article references (array of integers)
    Lib_list = models.JSONField()  # JSON field for article names (array of strings)
    CA_LIST = models.JSONField()  # JSON field for CA_TTC values (dictionary {Lib:CA_TTC})
    QT_LIST = models.JSONField()  # JSON field for QTE values (dictionary {Lib:QTE})

    def __str__(self):
        return str(self.NUM_TICKET)
    