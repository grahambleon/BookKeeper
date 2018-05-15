class AddImageToInvoice < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :invoice_image, :string
  end
end
