# Generated by Django 4.1.13 on 2024-08-19 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('retail_app', '0006_aziza_etat_aziza_liste_guerre_course_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='code_article',
            field=models.CharField(blank=True, db_column='Code article', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='aziza',
            name='code_article',
            field=models.CharField(blank=True, db_column='Code article', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='carrefourhyper',
            name='code_article',
            field=models.CharField(blank=True, db_column='Code article', max_length=255, null=True),
        ),
    ]
