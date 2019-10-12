Feature: Validar registro de usuarios nuevos

  Scenario: Como un usuario quiero tener la opcion de registrarme en la aplicación         
    When I swipe right
    And  I press view with id "skipButton"
    And I press "Register"
    Then I should see "Login with Google"

  Scenario: Como un usuario quiero que se valide si no ingrese todos los campos  
    When I swipe right
    And  I press view with id "skipButton"
    And I press "Register"
   And  I press view with id "textUserName"
   And I enter text "nombre" into field with id "textUserName"
   And I press "Register"
   Then I should see "Validation Error"


  Scenario: Como un usuario quiero que se valide si el email es correcto 
    When I swipe right
    And  I press view with id "skipButton"
    And I press "Register"
   And I enter text "nombre" into field with id "textUserName"
    And I enter text "email" into field with id "textEmail"
    And I enter text "email" into field with id "textPassword"
    And I enter text "email" into field with id "textConfirmPassword"
   And I press "Register"
   Then I should see "Invalid email address."


  Scenario: Como un usuario quiero que se valide si las contraseñas coinciden
    When I swipe right
    And  I press view with id "skipButton"
    And I press "Register"
   And I enter text "nombre" into field with id "textUserName"
    And I enter text "email@email.com" into field with id "textEmail"
    And I enter text "pass" into field with id "textPassword"
    And I enter text "passdiferente" into field with id "textConfirmPassword"
   And I press "Register"
   Then I should see "Password confirmation doesn't match password."