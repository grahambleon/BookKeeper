class InvoiceListSerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :amount, :date_received, :account_id
end
