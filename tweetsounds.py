from flask import Flask, request, session, g, redirect, url_for, \
	abort, render_template, flash, Response
from TwitterAPI import TwitterAPI
import json

# gunicorn -k 'gevent' tweetsounds:app
# sudo ARCHFLAGS='-arch i386 -arch x86_64' pip install gevent


api = TwitterAPI("8FJb5ttJTD8XcvgIvbcujg", "Bg7y7axQMlnSR3T1kdvFWNWXKhKh49xAmLqXi32w", "893453616-rC7b04DMYgd5uXHrNbVbRJ3CwzSEqPwmOC36ox1Y", "DjDadLrOTihEN8VnquKtEPKgq2ftyue1MiIStP3F5DYMq")

# Create application
app = Flask(__name__)
r = None

def event_stream():
	if not r is None:
		for item in r.get_iterator():
			# print item['text']
			# retweeted = 'retweeted_status' in item
			# message = json.dumps({ \
			# 						"screen_name": item['user']['screen_name'], \
			# 						"text": item['text'], \
			# 						"retweet": retweeted \
			# 					 })
			# yield 'data: ' + message + '\n\n'
			yield 'data: ' + json.dumps(item) + '\n\n'

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/search', methods = ['GET', 'POST'])
def search():
	global r
	query = request.args.get('q')
	r = api.request('statuses/filter', {'track':query})
	return render_template('index.html', query=query)

@app.route('/stream')
def stream():
	return Response(event_stream(), mimetype="text/event-stream")

if __name__ == '__main__':
	# app.debug = True
	app.run()