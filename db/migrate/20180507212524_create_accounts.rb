class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :company_name, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
