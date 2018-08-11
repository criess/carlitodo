class SessionController < ApplicationController

  skip_before_action :verify_authenticity_token

  MAX_SESSION = 60.minutes

  def login
    user = User.find_by(email: email_param[:email])
    if User === user && user.authenticate(password_param[:password])
      session["user"] = user
      user.lastlogin = Time.now
      user.save!
      respond_to do |format|
        format.json { render json: { action: 'logged in'} }
      end
    else
      respond_to do |format|
        format.json { render json: { action: 'not logged in' }, status: 403 }
      end
    end
  end

  def logout
    session.delete "user"
    respond_to do |format|
      format.json { render json: { action: 'logged out' } }
    end
  end

  def loggedin
    respond_to do |format|
      format.json {
        has_valid_user = Integer === session.try(:[],"user").try(:[], "id")
        render json: {
          action: has_valid_user ? 'logged in' : 'logged out'
        },
        status: has_valid_user  ? 200 : 403
      }
    end
  end

  private
  def email_param
    params.require(:user).permit(:email)
  end

  def password_param
    params.require(:user).permit(:password)
  end

end
