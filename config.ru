require 'rubygems'
require 'json'
require 'sinatra'
require 'haml'
require 'warble.rb'

Sinatra::Application.default_options.merge!(
  :run => false,
  :environment => :production,
  :raise_errors => true
)
root_dir = File.dirname(__FILE__)
set :root,        root_dir
set :app_file,    File.join(root_dir, 'warble.rb')

log = File.new('sinatra.log', 'a')
STDOUT.reopen(log)
#STDERR.reopen(log)

run Sinatra::Application
