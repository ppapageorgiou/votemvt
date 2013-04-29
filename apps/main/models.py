from django.db import models

class Player(models.Model):
	"""
	This is the model for a Player.
	"""

	POSITIONS = (
		('GOAL', 'Goalkeeper'),
		('DEFE', 'Defender'),
		('MIDF', 'Midfielder'),
		('ATTA', 'Attacker'),
	)

	name       = models.CharField(max_length=200)
	position   = models.CharField(max_length=200, choices=POSITIONS)
	votes	   = models.IntegerField(default=0)
	image	   = models.ImageField(upload_to='players')
	
	def __unicode__(self):
		return self.name