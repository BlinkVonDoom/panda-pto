class RequestsMailer < ApplicationMailer
    default from: 'cmerchant@instructure.com'

    # email confirming request for pto was made 
    # see views/requests_email for email template
    # email triggered from pto_requests_controller
    def requests_email
        @user = params[:user]
        @pto_request = params[:pto_request]
        mail(to: @user.email, cc: "mco@instructure.com", subject: 'PTO Request')
    end
end
