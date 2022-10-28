//component testing
describe('LandingPage.cy.js', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  
    it("Lands in the landing page and sees the correct material", () =>{
      cy.visit("localhost:3000");
      cy.contains("Welcome");
    }); 
    
    //needs update once other routes are setup
    it("Return to homepage", () => {
        cy.visit("localhost:3000/");
        cy.contains("Spotify Central").click();
        cy.url().should("eq", "http://localhost:3000/");
    });
    
    //look into login failure
    it("Goes to the Spotify Login/Auth Page and logins", () => {
        cy.visit("localhost:3000/");
        cy.contains("Login").click();
        cy.contains("Spotify");
        cy.wait(1500);
        cy.get('#login-username').type("spotifycentraltest@gmail.com");
        cy.get('#login-password').type("123spocenttest");
        cy.get("#login-button").click();
    });
    
})