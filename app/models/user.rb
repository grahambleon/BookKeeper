class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: :true, uniqueness: { case_sensitive: false }
  validates :business_name, presence: :true
  validates :address, presence: :true

  has_many :accounts
  has_many :invoices, through: :accounts
  has_many :purchases, through: :invoices
end
