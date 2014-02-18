from TwitterAPI import TwitterAPI

api = TwitterAPI("8FJb5ttJTD8XcvgIvbcujg", "Bg7y7axQMlnSR3T1kdvFWNWXKhKh49xAmLqXi32w", "893453616-rC7b04DMYgd5uXHrNbVbRJ3CwzSEqPwmOC36ox1Y", "DjDadLrOTihEN8VnquKtEPKgq2ftyue1MiIStP3F5DYMq")

# REST
# r = api.request('search/tweets', {'q':'pizza'})
# for item in r.get_iterator():
# 	print item

# Stream
r = api.request('statuses/filter', {'track':'pizza'})
for item in r.get_iterator():
	print item