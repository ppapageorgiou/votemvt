from json import dumps
from main.models import Player
from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
	votes = list()
	players = Player.objects.all()
	for player in players:
		if request.session.get(player.pk, False):
			votes.append(player.pk) 
	goalkeepers = list()
	defenders = list()
	midfielders = list()
	attackers = list()
	try:
		goalkeepers = players.filter(position='GOAL')
		defenders   = players.filter(position='DEFE')
		midfielders = players.filter(position='MIDF')
		attackers   = players.filter(position='ATTA')
	except Player.DoesNotExist, e:
		raise e	
	ctx = dict (
		goalkeepers = goalkeepers,
		defenders = defenders,
		midfielders = midfielders,
		attackers = attackers,
		votes = votes,
	)
	return render(request, 'main/index.html', ctx, context_instance=RequestContext(request))

def vote(request):
	if request.method == 'POST':
		try:
			player_id = int(request.POST['player_id'])
			vote = int(request.POST['vote'])
			if request.session.get(player_id, False):
				raise Exception('Already Voted!')
			if abs(vote) > 1:
				response = {'response':'NC'}
			else:
				player = Player.objects.get(pk=player_id)
				player.votes += vote
				player.save()
				request.session[player_id] = True
				request.session['votes'] = ['1', '2', '3']
				request.session['votes'] = request.session.get('votes', []).append(str(len(request.session.get('votes', []))+1))
				response = {'response':'OK', 'pid':player_id, 'votes':player.votes}
		except Exception, e:
			response = {'response':'NC'}
		finally:
			return HttpResponse(dumps(response), content_type="application/json")
	else:
		return HttpResponse(dumps({'response':'NC'}), content_type="application/json")