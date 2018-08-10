class Project < ApplicationRecord

  has_many :todo

  belongs_to :created_by, foreign_key: 'created_by', class_name: 'User'
  belongs_to :updated_by, foreign_key: 'updated_by', class_name: 'User'

  validate do
    errors.add(:name, 'taken') if (Project.where(name: self.name).map(&:id) - Array.wrap(self.id)).size > 0
  end

end
