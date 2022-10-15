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

    //needs to be tested more
    it("Goes to the Spotify Login/Auth Page", () => {
        cy.visit("localhost:3000/");
        cy.contains("Login").click();
        cy.contains("Spotify");
    });
})