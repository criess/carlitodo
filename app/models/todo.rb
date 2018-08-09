class Todo < ApplicationRecord

  belongs_to :project

  has_one :created_by, foreign_key: 'created_by', class_name: 'User'
  has_one :updated_by, foreign_key: 'updated_by', class_name: 'User'

end
