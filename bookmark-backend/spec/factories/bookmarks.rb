FactoryBot.define do
  factory :bookmark do
    title { Faker::Internet.domain_word }
    url { Faker::Internet.url }
  end
end
