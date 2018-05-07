require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new(email: "test@123.com", business_name: "testaurant", address: "123 fakse street", password: "123456") }

  describe "Validations" do
    it "is valid with valid attributes provided" do
      expect(subject).to be_valid
    end

    it "is not valid without and email" do
      subject.email = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without and business_name" do
      subject.business_name = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without and password" do
      subject.password = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without and address" do
      subject.address = nil
      expect(subject).to_not be_valid
    end

  end
end
