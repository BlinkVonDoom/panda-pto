FactoryBot.define do
  factory :calendar do
    date { 10.days.from_now }
    base_value { 0 }
    signed_up_total { 0 }
    signed_up_agents { [] }
    current_price { 0.5 }
  end
end
