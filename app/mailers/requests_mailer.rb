class RequestsMailer < ApplicationMailer
    default from: 'supportpanda@instructure.com'

    # email confirming request for pto was made 
    # see views/requests_email for email template
    # email triggered from pto_requests_controller
    def requests_email
        @user = params[:user]
        @pto_request = params[:pto_request]
        mail(to: @user.email, cc: "mco@instructure.com", subject: 'PTO Request')
    end

    def delete_request_email
        @user = params[:user]
        @pto_request = params[:pto_request]
        mail(to: @user.email, cc: "mco@instructure.com", subject: 'Deleted PTO Request')
    end    
    
    def admin_request_email
        @agent = params[:agent]
        @pto_request = params[:pto_request]
        @supervisor = params[:supervisor]
        mail(to: @agent.email, cc: "mco@instructure.com", subject: `Admin request for #{@agent.name}`)
    end

    def excuse_request_email
        @agent = params[:user]
        @pto_request = params[:pto_request]
        @supervisor = params[:supervisor]
        mail(to: @agent.email, cc: "mco@instructure.com", subject: `Excused request for #{@agent.name}`)
    end
end
