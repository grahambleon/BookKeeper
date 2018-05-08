class Purchase < ApplicationRecord
  validates :product_id, presence: true
  validates :product_name, presence: true
  validates :quantity, presence: true
  validates :unit_price, presence: true

  belongs_to :user
  belongs_to :account
  belongs_to :invoice
end
