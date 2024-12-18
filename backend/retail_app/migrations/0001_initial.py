# Generated by Django 4.1.13 on 2024-08-05 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.IntegerField(blank=True, db_column='Code article', null=True)),
                ('article', models.CharField(blank=True, db_column='ARTICLE', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('fournisseur', models.CharField(blank=True, db_column='FOURNISSEUR', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('secteur', models.CharField(blank=True, db_column='SECTEUR', max_length=255, null=True)),
                ('rayon', models.CharField(blank=True, db_column='RAYON', max_length=255, null=True)),
                ('etat', models.CharField(blank=True, db_column='ETAT', max_length=255, null=True)),
                ('homologation', models.CharField(blank=True, db_column='Homologation', max_length=255, null=True)),
                ('bucket_de_ca', models.CharField(blank=True, db_column='Bucket de CA', max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Aziza',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.IntegerField(blank=True, db_column='Code article', null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('aziza_prix', models.FloatField(blank=True, db_column='Aziza Prix', null=True)),
                ('aziza_date_de_releve', models.DateTimeField(blank=True, db_column='Aziza Date de relevé', null=True)),
                ('aziza_id_releve', models.FloatField(blank=True, db_column='Aziza - ID Relevé', null=True)),
                ('aziza_prix_manuel', models.CharField(blank=True, db_column='Aziza - Prix manuel', max_length=255, null=True)),
                ('aziza_ref_couverte', models.IntegerField(blank=True, db_column='Aziza - Ref couverte', null=True)),
                ('aziza_ca_ttc_ref', models.IntegerField(blank=True, db_column='Aziza - CA TTC Ref', null=True)),
                ('aziza_ca_ttc', models.IntegerField(blank=True, db_column='Aziza - CA TTC', null=True)),
                ('aziza_indice_prix', models.FloatField(blank=True, db_column='Aziza - Indice prix', null=True)),
                ('aziza_indice_prix_bucket', models.CharField(blank=True, db_column='Aziza - Indice prix (bucket)', max_length=255, null=True)),
                ('aziza_marge', models.FloatField(blank=True, db_column='Aziza - Marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CarrefourHyper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.IntegerField(blank=True, db_column='Code article', null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('carrefour_hyper_prix', models.FloatField(blank=True, db_column='Carrefour Hyper Prix', null=True)),
                ('carrefour_hyper_date_de_releve', models.DateTimeField(blank=True, db_column='Carrefour Hyper Date de relevé', null=True)),
                ('carrefour_hyper_id_releve', models.FloatField(blank=True, db_column='Carrefour Hyper - ID Relevé', null=True)),
                ('carrefour_hyper_prix_manuel', models.CharField(blank=True, db_column='Carrefour Hyper - Prix manuel', max_length=255, null=True)),
                ('carrefour_hyper_ref_couverte', models.IntegerField(blank=True, db_column='Carrefour Hyper - Ref couverte', null=True)),
                ('carrefour_hyper_ca_ttc_ref', models.IntegerField(blank=True, db_column='Carrefour Hyper - CA TTC Ref', null=True)),
                ('carrefour_hyper_ca_ttc', models.IntegerField(blank=True, db_column='Carrefour Hyper - CA TTC', null=True)),
                ('carrefour_hyper_indice_prix', models.FloatField(blank=True, db_column='Carrefour Hyper - Indice prix', null=True)),
                ('carrefour_hyper_indice_prix_bucket', models.CharField(blank=True, db_column='Carrefour Hyper - Indice prix (bucket)', max_length=255, null=True)),
                ('carrefour_hyper_marge', models.FloatField(blank=True, db_column='Carrefour Hyper - Marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CarrefourMarket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='code_article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('carrefour_market_prix', models.FloatField(blank=True, db_column='carrefour_market_prix', null=True)),
                ('carrefour_market_date_de_releve', models.DateTimeField(blank=True, db_column='carrefour_market_date_de_releve', null=True)),
                ('carrefour_market_id_releve', models.CharField(blank=True, db_column='carrefour_market_id_releve', max_length=255, null=True)),
                ('carrefour_market_prix_manuel', models.FloatField(blank=True, db_column='carrefour_market_prix_manuel', null=True)),
                ('carrefour_market_ref_couverture', models.IntegerField(blank=True, db_column='carrefour_market_ref_couverture', null=True)),
                ('carrefour_market_ca_ttc_ref', models.IntegerField(blank=True, db_column='carrefour_market_ca_ttc_ref', null=True)),
                ('carrefour_market_ca_ttc', models.IntegerField(blank=True, db_column='carrefour_market_ca_ttc', null=True)),
                ('carrefour_market_indice_prix', models.FloatField(blank=True, db_column='carrefour_market_indice_prix', null=True)),
                ('carrefour_market_indice_prix_bucket', models.CharField(blank=True, db_column='carrefour_market_indice_prix_bucket', max_length=255, null=True)),
                ('carrefour_market_marge', models.FloatField(blank=True, db_column='carrefour_market_marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ConcurrentsLeMoinsCher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('prix_min', models.FloatField(blank=True, db_column='Prix Min', null=True)),
                ('concurrent', models.CharField(blank=True, db_column='Concurrent', max_length=255, null=True)),
                ('prix_min_ref_couverte', models.IntegerField(blank=True, db_column='Prix Min - Ref couverte', null=True)),
                ('prix_min_ca_ttc_ref', models.IntegerField(blank=True, db_column='Prix Min - CA TTC Ref', null=True)),
                ('prix_min_ca_ttc', models.IntegerField(blank=True, db_column='Prix Min - CA TTC', null=True)),
                ('prix_min_indice_prix', models.FloatField(blank=True, db_column='Prix Min - Indice prix', null=True)),
                ('prix_min_indice_prix_bucket', models.CharField(blank=True, db_column='Prix Min - Indice prix (bucket)', max_length=255, null=True)),
                ('prix_min_marge', models.FloatField(blank=True, db_column='Prix Min - Marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EconomicsSMG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('cout_dpr', models.FloatField(blank=True, db_column='Coût DPR', null=True)),
                ('qte', models.IntegerField(blank=True, db_column='QTE', null=True)),
                ('pro_qte', models.IntegerField(blank=True, db_column='PRO QTE', null=True)),
                ('ca_ttc', models.FloatField(blank=True, db_column='CA TTC', null=True)),
                ('pro_ca_ttc', models.FloatField(blank=True, db_column='PRO CA TTC', null=True)),
                ('nombre_darticles', models.IntegerField(blank=True, db_column="Nombre d'articles", null=True)),
                ('frequentation', models.IntegerField(blank=True, db_column='FREQUENTATION', null=True)),
                ('liste_de_guerre_course', models.CharField(blank=True, db_column='Liste de guerre / course', max_length=255, null=True)),
                ('bucket_de_ca', models.CharField(blank=True, db_column='Bucket de CA', max_length=255, null=True)),
                ('homologation', models.CharField(blank=True, db_column='Homologation', max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Monoprix',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('monoprix_prix', models.FloatField(blank=True, db_column='Monoprix Prix', null=True)),
                ('monoprix_date_de_releve', models.DateTimeField(blank=True, db_column='Monoprix Date de relevé', null=True)),
                ('monoprix_id_releve', models.FloatField(blank=True, db_column='Monoprix - ID Relevé', null=True)),
                ('monoprix_prix_manuel', models.FloatField(blank=True, db_column='Monoprix - Prix manuel', null=True)),
                ('monoprix_ref_couverte', models.IntegerField(blank=True, db_column='Monoprix - Ref couverte', null=True)),
                ('monoprix_ca_ttc_ref', models.FloatField(blank=True, db_column='Monoprix - CA TTC Ref', null=True)),
                ('monoprix_ca_ttc', models.FloatField(blank=True, db_column='Monoprix - CA TTC', null=True)),
                ('monoprix_indice_prix', models.FloatField(blank=True, db_column='Monoprix - Indice prix', null=True)),
                ('monoprix_indice_prix_bucket', models.CharField(blank=True, db_column='Monoprix - Indice prix (bucket)', max_length=255, null=True)),
                ('monoprix_marge', models.FloatField(blank=True, db_column='Monoprix - Marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrixCible',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('prix_cible', models.FloatField(blank=True, db_column='Prix cible', null=True)),
                ('prix_cible_ref_couverte', models.IntegerField(blank=True, db_column='Prix cible - Ref couverte', null=True)),
                ('prix_cible_ca_ttc_ref', models.FloatField(blank=True, db_column='Prix cible - CA TTC Ref', null=True)),
                ('prix_cible_ca_ttc', models.FloatField(blank=True, db_column='Prix cible - CA TTC', null=True)),
                ('prix_cible_indice_prix', models.FloatField(blank=True, db_column='Prix cible - Indice prix', null=True)),
                ('prix_cible_indice_prix_bucket', models.CharField(blank=True, db_column='Prix cible - Indice prix (bucket)', max_length=255, null=True)),
                ('prix_cible_marge', models.FloatField(blank=True, db_column='Prix cible - Marge', null=True)),
                ('prix_cible_percent_impact_vol', models.FloatField(blank=True, db_column='Prix cible - % impact vol', null=True)),
                ('prix_cible_percent_impact_ca', models.FloatField(blank=True, db_column='Prix cible - % impact CA %', null=True)),
                ('prix_cible_percent_impact_marge', models.FloatField(blank=True, db_column='Prix cible - % impact marge', null=True)),
                ('prix_cible_impact_ca', models.FloatField(blank=True, db_column='Prix cible - impact CA', null=True)),
                ('prix_cible_impact_marge', models.FloatField(blank=True, db_column='Prix cible - impact marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrixMoyenHorsPromo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('prix_moyen_hors_promo', models.FloatField(blank=True, db_column='Prix moyen hors promo', null=True)),
                ('prix_moyen_hors_promo_ref_couverte', models.IntegerField(blank=True, db_column='Prix moyen hors promo - ref couverte', null=True)),
                ('prix_moyen_hors_promo_ca_ttc_ref', models.FloatField(blank=True, db_column='Prix moyen hors promo - CA TTC Ref', null=True)),
                ('prix_moyen_hors_promo_ca_ttc', models.FloatField(blank=True, db_column='Prix moyen hors promo - CA TTC', null=True)),
                ('prix_moyen_hors_promo_indice_prix', models.FloatField(blank=True, db_column='Prix moyen hors promo - Indice prix', null=True)),
                ('prix_moyen_hors_promo_indice_prix_bucket', models.CharField(blank=True, db_column='Prix moyen hors promo - Indice prix (bucket)', max_length=255, null=True)),
                ('prix_moyen_hors_promo_marge', models.FloatField(blank=True, db_column='Prix moyen hors promo - Marge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrixP1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('prix_p1', models.FloatField(blank=True, db_column='Prix P1', null=True)),
                ('prix_p1_ca_ttc', models.FloatField(blank=True, db_column='Prix P1 - CA TTC', null=True)),
                ('prix_p1_marge', models.FloatField(blank=True, db_column='Prix P1 - MArge', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrixP3',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code_article', models.CharField(blank=True, db_column='Code article', max_length=255, null=True)),
                ('categorie', models.CharField(blank=True, db_column='CATEGORIE', max_length=255, null=True)),
                ('mdd', models.CharField(blank=True, db_column='MDD', max_length=255, null=True)),
                ('prix_p3', models.FloatField(blank=True, db_column='Prix P3', null=True)),
                ('prix_p3_ref_couverte', models.IntegerField(blank=True, db_column='Prix P3 - Ref couverte', null=True)),
                ('prix_p3_ca_ttc_ref', models.FloatField(blank=True, db_column='Prix P3 - CA TTC Ref', null=True)),
                ('prix_p3_ca_ttc', models.FloatField(blank=True, db_column='Prix P3 - CA TTC', null=True)),
                ('prix_p3_indice_prix', models.FloatField(blank=True, db_column='Prix P3 - Indice prix', null=True)),
                ('prix_p3_indice_prix_bucket', models.CharField(blank=True, db_column='Prix P3 - Indice prix (bucket)', max_length=255, null=True)),
                ('prix_p3_marge', models.FloatField(blank=True, db_column='Prix P3 - Marge', null=True)),
            ],
        ),
    ]
