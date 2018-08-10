class Todo < ApplicationRecord

  belongs_to :project

  belongs_to :created_by, foreign_key: 'created_by', class_name: 'User'
  belongs_to :updated_by, foreign_key: 'updated_by', class_name: 'User'

end
