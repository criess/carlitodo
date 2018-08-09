class User < ApplicationRecord
  has_secure_password

  has_many :created_todo, foreign_key: 'created_by', class_name: 'Todo'
  has_many :updated_todo, foreign_key: 'updated_by', class_name: 'Todo'

  has_many :created_project, foreign_key: 'created_by', class_name: 'Project'
  has_many :updated_project, foreign_key: 'updated_by', class_name: 'Project'

end
