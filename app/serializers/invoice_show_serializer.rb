class InvoiceShowSerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :amount, :date_received, :account_id

  has_many :purchases
end
