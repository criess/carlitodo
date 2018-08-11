class TodosController < ApplicationController

  before_action :set_todo, only: [:update, :destroy]

  skip_before_action :verify_authenticity_token

  has_auth

  # GET /todos.json
  def index
    if params[:project_id]
      @todos = Todo.where(:project_id => params[:project_id])
    else
      @todos = Todo.all
    end
    @todos = @todos.map do |todo|
      todo = todo.attributes
      todo["created_by"] = User.find(todo["created_by"]).slice("email")
      todo["updated_by"] = User.find(todo["updated_by"]).slice("email")
      todo
    end
    respond_to do |format|
      format.json { render json: { todos: @todos } }
    end
  end

  # POST /todos.json
  def create
    @todo = Todo.new(todo_params)
    @todo.created_by = @user
    @todo.updated_by = @user
    respond_to do |format|
      if @todo.save
        format.json { render :show, status: :created, location: @todo }
      else
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /todos/1.json
  def update
    respond_to do |format|
      @todo.updated_by = @user
      if @todo.update(todo_params)
        format.json { render :show, status: :ok, location: @todo }
      else
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1.json
  def destroy
    @todo.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:name, :state, :due_date, :project_id)
    end
end
