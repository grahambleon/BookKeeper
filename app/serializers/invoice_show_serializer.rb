class InvoiceShowSerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :amount, :date_received, :account_id, :invoice_image

  has_many :purchases, serializer: PurchasesSerializer
end
