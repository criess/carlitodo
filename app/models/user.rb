class User < ApplicationRecord
  has_secure_password

  has_many :created_todo, foreign_key: 'created_by', class_name: 'Todo'
  has_many :updated_todo, foreign_key: 'updated_by', class_name: 'Todo'

  has_many :created_project, foreign_key: 'created_by', class_name: 'Project'
  has_many :updated_project, foreign_key: 'updated_by', class_name: 'Project'

  validate do
    errors.add(:email, "login taken") if (User.where(email: email).map(&:id) - Array.wrap(self.id)).size > 0
  end

  before_validation do
    self.email = email.downcase if self.email
  end

end
