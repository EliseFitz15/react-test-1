ENV["RACK_ENV"] ||= "test"

require_relative "../app"
require "rspec"
require "capybara/rspec"
require "capybara/poltergeist"
require "pry"
require "sinatra/activerecord"
require "rack/test"
require "shoulda-matchers"

spec_support_files = File.join(App.settings.root, "spec", "support", "**", "*.rb")
Dir[spec_support_files].each { |file| require file }
Dir["./models/*.rb"].each { |file| require file }
Dir["./seeders/*.rb"].each { |file| require file }

include Rack::Test::Methods

Capybara.app = App
Capybara.javascript_driver = :poltergeist

def app
  Sinatra::Application
end

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.filter_run :focus
  config.run_all_when_everything_filtered = true
  config.order = :random
  Kernel.srand config.seed

  config.before(:each) do
    Book.destroy_all
    Review.destroy_all
  end
end
