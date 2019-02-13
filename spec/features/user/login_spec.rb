require "rails_helper"

RSpec.feature "Login", :type => :feature do
  let(:user) { create(:user) }

  scenario 'user navigates to the login page and succesfully logs in', js: true do
    puts user.name
    puts user.email
    puts user.password
    user
    visit root_path
    find('nav a', text: 'Login').click
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    find('.login-button').click
    expect(page).to have_selector('#user-settings')
    
  end

end