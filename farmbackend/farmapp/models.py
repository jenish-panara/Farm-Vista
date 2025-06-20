from django.db import models


class USER(models.Model):
    name=models.CharField(max_length=100)
    ph_number=models.CharField(max_length=10)
    email=models.CharField(max_length=50)
    passward=models.CharField(max_length=15)

class ADMIN(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=50)
    passward=models.CharField(max_length=15)

class PRODUCT(models.Model):
    name=models.CharField(max_length=100)   
    price=models.CharField(max_length=50)
    image = models.ImageField(upload_to='media/')  
    categorie = models.CharField(max_length=100)

class APPOINTMENT(models.Model):
    admin_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    appointment_date = models.DateTimeField()
    address = models.CharField(max_length=100)

class APPOINTMENT_DETAILS(models.Model):
    admin_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    appointment_date = models.DateTimeField()
    soil_condition = models.CharField(max_length=200)
    soil_fertility = models.IntegerField()
    recommended_crop = models.CharField(max_length=200)
    nutrients_needed = models.CharField(max_length=1000)
    other_suggestions = models.CharField(max_length=1000)
    
class Buy(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    buy_method = models.CharField(max_length=10)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    pincode = models.CharField(max_length=6, null=True, blank=True) 
    card_number = models.CharField(max_length=16, null=True, blank=True)