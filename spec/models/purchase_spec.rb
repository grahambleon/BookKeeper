require 'rails_helper'

RSpec.describe Purchase, type: :model do
  let(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  let(:account) { Account.create!(company_name: "Russo's", user: user) }
  let(:invoice) { Invoice.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }
  subject { described_class.create!(product_id: "0293874", product_name: "Taters", quantity: "30 lbs",  unit_price: 3.00, account: account, user: user, invoice: invoice) }

  describe "Validations" do
    it "is valid when provided valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a product_id" do
      subject.product_id = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a product_name" do
      subject.product_name = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a quantity" do
      subject.quantity = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a unit_price" do
      subject.unit_price = nil
      expect(subject).to_not be_valid
    end
  end

  describe "Associations" do
    it { should belong_to(:user) }
    it { should belong_to(:account) }
    it { should belong_to(:invoice) }
  end
end
