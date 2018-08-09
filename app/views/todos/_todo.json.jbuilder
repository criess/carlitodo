json.extract! todo, :id, :name, :created_by, :updated_by, :state, :due_date, :created_at, :updated_at
json.url todo_url(todo, format: :json)
