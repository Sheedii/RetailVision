from django.core.management.base import BaseCommand
from affinitytesting.models import TicketsDeCaisse, Mixingtickets

class Command(BaseCommand):
    help = 'Populate Mixingtickets table'

    def handle(self, *args, **options):
        # Group tickets by NUM_TICKET and iterate over them
        grouped_tickets = TicketsDeCaisse.objects.values('NUM_TICKET').distinct()

        for ticket_group in grouped_tickets:
            num_ticket = ticket_group['NUM_TICKET']
            tickets = TicketsDeCaisse.objects.filter(NUM_TICKET=num_ticket)

            # Extract common fields
            heure_vente = tickets.first().HEURE_VENTE
            fk_articles = []
            lib_list = []
            ca_list = {}
            qt_list = {}

            for ticket in tickets:
                # Ensure FK_ARTICLE is a list
                fk_article = ticket.FK_ARTICLE
                if isinstance(fk_article, int):
                    fk_article = [fk_article]
                elif isinstance(fk_article, list):
                    fk_article = fk_article
                else:
                    fk_article = []

                fk_articles.extend(fk_article)
                lib = ticket.LIB
                lib_list.append(lib)
                ca_list[lib] = ticket.CA_TTC
                qt_list[lib] = ticket.QTE

            # Create and save the Mixingtickets recordw
            mixed_ticket = Mixingtickets(
                NUM_TICKET=num_ticket,
                HEURE_VENTE=heure_vente,
                FK_ARTICLE=fk_articles,
                Lib_list=lib_list,
                CA_LIST=ca_list,
                QT_LIST=qt_list
            )
            mixed_ticket.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated Mixingtickets table'))
