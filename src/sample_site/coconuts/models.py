from django.db import models

class CoconutEco(models.Model):
    looking_to_buy = models.IntegerField()
    looking_to_sell = models.IntegerField()

    when = models.DateField()
