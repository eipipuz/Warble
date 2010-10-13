get '/style.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :style
end

get '/' do
  haml :index
end

helpers do
  def dictionary
    dict = ''
    File.open('db.yaml', 'r') do |f|
      dict = JSON.parse(f.read)
    end
    dict
  end
end

post '/warble' do
  dict = dictionary()
  File.open('db.yaml', 'w') do |f|
    params.each do |word_symbol, value|
      dict[word_symbol.to_s] = value
    end
    f.write(dict.to_json)
  end
end

get '/warble' do
  dictionary.to_json
end

delete '/warble' do
  dict = dictionary()
  File.open('db.yaml', 'w') do |f|
    params.each do |word_symbol|
      dict.delete(word_symbol.to_s)
    end
    f.write(dict.to_json)
  end
end

get '/hi' do
  haml '%div.title Hello ' + (params[:name] || '')
end
