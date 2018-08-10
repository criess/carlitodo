class UsersController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        session["user"] = @user
        format.json { render json: { status: :created, user: @user.attributes.except("passsword_digest", "id") }  }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1.json
  def update
    if user_params[:email].downcase === session["user"]["email"]
      respond_to do |format|
        if @user.update(user_params)
          format.json { render json: { status: :ok, user: @user.attributes.except("passsword_digest", "id") }  }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    else
      format.json { render json: 'action not allowed', status: 403 }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
