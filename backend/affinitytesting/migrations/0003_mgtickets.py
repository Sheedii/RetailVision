# Generated by Django 5.0.8 on 2024-09-05 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('affinitytesting', '0002_mixingtickets_nomenclature_ticketsdecaisse'),
    ]

    operations = [
        migrations.CreateModel(
            name='mgTickets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NUM_TICKET', models.IntegerField()),
                ('HEURE_VENTE', models.DateTimeField()),
                ('FK_ARTICLE', models.JSONField()),
                ('Lib_list', models.JSONField()),
                ('CA_LIST', models.JSONField()),
                ('QT_LIST', models.JSONField()),
            ],
        ),
    ]
