class AddProjectIdToTodos < ActiveRecord::Migration[5.2]
  def change
    add_column :todos, :project_id, :integer
  end
end
