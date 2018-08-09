class SessionController < ApplicationController

  MAX_SESSION = 60.minutes

  def login
    user = User.find_by(email: email_param)
    if user.authenticate(password_param)
      session["user"] = user.email
      user.lastlogin = Time.now
      user.save!
      format.json { render json: { action: 'logged in'} }
    else
      format.json { render json: { action: 'not logged in' }, status: 403 }
    end
  end

  def logout
    session.delete :user_email
    format.json { render json: { action: 'logged out' } }
  end

  private
  def email_param
    params.require(:user).permit(:email)
  end

  def password_param
    params.require(:user).permit(:password)
  end

end
