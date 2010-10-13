get '/style.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :style
end

get '/' do
  #'lalal'
  haml :index
end

post '/warble' do
end

delete '/warble' do
end

get '/hi' do
  haml '%div.title Hello'
end
