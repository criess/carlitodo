class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :created_by
      t.integer :updated_by

      t.timestamps
    end
  end
end
