class ApplicationController < ActionController::Base

  def self.has_auth
    before_action do
      @user = User.find_by(email: session["user"]["email"])
      throw(:abort) unless @user && @user.valid?
    end
  end

  def startapp
    # does nothing will just load reactapp (see template and js)
  end

end
