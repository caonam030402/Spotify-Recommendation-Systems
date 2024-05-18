from django.db import models


class Track(models.Model):
    name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
