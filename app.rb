require 'rubygems'
require 'sinatra'
require 'haml'
require 'json'
require 'rspec'

# Helpers
require './lib/render_partial'

# Set Sinatra variables
set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, 'views'
set :public_folder, 'public'

# Application routes
get '/' do
  haml :index, :layout => :'layouts/application'
end

get '/about' do
  haml :about, :layout => :'layouts/application'
end

post '/command' do 
	response['Access-Control-Allow-Origin'] = '*'
	data = JSON.parse(request.body.read)
	command = data["command"]
	tests = data["tests"]
	contents = command + "\n" + tests
	File.open('tmp/test.rb', 'w') { |f| f.write contents}
	output = output = `rspec tmp/test.rb -f json`
	`rm tmp/test.rb`
	return output
end




