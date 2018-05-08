class Account < ApplicationRecord
  validates :company_name, presence: true

  belongs_to :user
  has_many :invoices
  has_many :purchases, through: :invoices
end
