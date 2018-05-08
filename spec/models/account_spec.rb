require 'rails_helper'

RSpec.describe Account, type: :model do
  let(:user) { User.create!(email: "me@aol.com", business_name: "ehhh", password: "123456", address:"123 fake street") }
  subject { described_class.create!(company_name: "Russo's", user: user) }

  describe "Validations" do
    it "is valid when provided valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a company name" do
      subject.company_name = nil
      expect(subject).to_not be_valid
    end
  end

  describe "Associations" do
    it { should belong_to(:user) }
    it { should have_many(:invoices) }
    it { should have_many(:purchases).through(:invoices) }
  end
end
