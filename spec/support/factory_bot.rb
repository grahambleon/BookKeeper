require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    business_name 'testaurant'
    address '123 fake street'
  end
end

# FactoryBot.define do
#   factory :attachment do
#     photo Rack::Test::UploadedFile.new(File.open(File.join(Rails.root, '/spec/fixtures/myfiles/myfile.jpg')))
#   end
# end
