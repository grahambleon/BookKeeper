class AccountGraphSerializer < ActiveModel::Serializer
  attributes :id, :company_name

  has_many :invoices, serializer: InvoiceGraphSerializer
end
