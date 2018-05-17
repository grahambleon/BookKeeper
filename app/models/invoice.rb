class Invoice < ApplicationRecord
  default_scope { order(:date_received, :invoice_number) }
  mount_uploader :invoice_image, InvoiceImageUploader

  validates :invoice_number, presence: true
  validates :amount, presence: true
  validates :date_received, presence: true

  belongs_to :account
  belongs_to :user
  has_many :purchases
end
