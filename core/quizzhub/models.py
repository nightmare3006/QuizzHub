from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Quiz(models.Model):
    title = models.CharField(max_length=150, verbose_name='Title')
    description = models.TextField(max_length=1000, verbose_name= 'Description')
    post_date = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Owner')

    def __str__(self) -> str:
        return self.title

class Solution(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete= models.CASCADE, verbose_name='Quiz')
    owner = models.ForeignKey(User, on_delete= models.CASCADE, verbose_name='Owner')
    content = models.TextField(max_length=500,verbose_name='Content')
    posted_at = models.DateTimeField(default=timezone.now)
    deleted = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if self.deleted:
            Winner.objects.filter(solution=self).delete()
        super(Solution, self).save(*args, **kwargs)



class Winner(models.Model):
    quiz = models.OneToOneField(Quiz, on_delete=models.CASCADE, related_name='winner')
    solution = models.OneToOneField(Solution, on_delete=models.CASCADE)

    def __str__(self):
        return f'Winner for {self.quiz}'