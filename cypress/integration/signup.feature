Feature: Sign up for FWG Hive

    Scenario: Successful Signup
        Given I am on the signup page
        When I enter my name "test", email "test@gmail.com" and password "test123"
        And I click the "Sign Up" button
        Then I should see a message "Signup successful. You can now log in."
        And I should be redirected to "/login"