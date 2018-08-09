class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :name
      t.integer :created_by
      t.integer :updated_by
      t.string :state
      t.datetime :due_date

      t.timestamps
    end
  end
end
