get '/style.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :style
end

get '/' do
  #'lalal'
  haml :index
end

post '/warble' do
  '[1,2,3,45]'
end

delete '/warble' do
end

get '/hi' do
  haml '%div.title Hello ' + (params[:name] || '')
end
