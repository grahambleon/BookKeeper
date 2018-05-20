class AccountShowSerializer < ActiveModel::Serializer
  attributes :id, :company_name

  has_many :invoices, serializer: InvoiceListSerializer
end
