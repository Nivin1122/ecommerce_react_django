from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    is_blocked = models.BooleanField(default=False)

    def __str__(self):
        return self.username