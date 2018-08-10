class ProjectsController < ApplicationController

  before_action :set_project, only: [:update, :destroy]

  skip_before_action :verify_authenticity_token

  has_auth

  # GET /projects.json
  def index
    @projects = Project.all
    respond_to do |format|
      format.json { render json: { projects: @projects } }
    end
  end

  # POST /projects.json
  def create
    @project = Project.new(project_params)
    @project.created_by = @user
    @project.updated_by = @user
    respond_to do |format|
      if @project.save
        format.json { render :show, status: :created, location: @project }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      @project.updated_by = @user
      if @project.update(project_params)
        format.json { render :show, status: :ok, location: @project }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def project_params
    params.require(:project).permit(:name)
  end
end
