class InvoiceGraphSerializer < ActiveModel::Serializer
  attributes :amount, :date_received
end
