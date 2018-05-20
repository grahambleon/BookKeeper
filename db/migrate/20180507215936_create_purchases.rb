class CreatePurchases < ActiveRecord::Migration[5.2]
  def change
    create_table :purchases do |t|
      t.string :product_id, null: false
      t.string :product_name, null: false
      t.string :quantity, null: false
      t.string :unit_price, null: false
      t.decimal :total_price, null: false

      t.belongs_to :user
      t.belongs_to :account
      t.belongs_to :invoice

      t.timestamps
    end
  end
end
