class ApplicationController < ActionController::Base

  def self.has_auth
    before_filter do
      @user = User.find_by(email: session["user"])
      throw(:abort) unless @user && @user.valid?
    end   
  end

end
