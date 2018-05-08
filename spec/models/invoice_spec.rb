require 'rails_helper'

RSpec.describe Invoice, type: :model do
    let(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
    let(:account) { Account.create!(company_name: "Russo's", user: user) }
    subject { described_class.create!(invoice_number: "1337", amount: 200.00, date_received: "2/4/2017", account: account, user: user) }

    describe "Validations" do
      it "is valid when provided valid attributes" do
        expect(subject).to be_valid
      end

      it "is not valid without an invoice_number" do
        subject.invoice_number = nil
        expect(subject).to_not be_valid
      end

      it "is not valid without an amount" do
        subject.amount = nil
        expect(subject).to_not be_valid
      end

      it "is not valid without a date_received" do
        subject.date_received = nil
        expect(subject).to_not be_valid
      end
    end

    describe "Associations" do
      it { should belong_to(:user) }
      it { should belong_to(:account) }
      it { should have_many(:purchases) }
    end

end
