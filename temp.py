from coconuts.models import CoconutEco
import random
import datetime

for x in range(0, 100):
    CoconutEco(looking_to_buy=random.randint(0, 100), looking_to_sell=random.randint(0, 100), when=datetime.date.today()-datetime.timedelta(x)).save()