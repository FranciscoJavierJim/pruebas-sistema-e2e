describe("pruebas heroku", () => {

  it("login exitoso", () => {
    cy.visit("https://the-internet.herokuapp.com/")
    cy.get(":nth-child(21) > a").click()
    cy.get("#username").type("tomsmith")
    cy.get("#password").type("SuperSecretPassword!")
    cy.get(".fa").click()    
  })
/*
El siguiente test realizara la misma prueba, obteniendo de otro metodo el elemento "Form Authentication", ya que con "cy.get(':nth-child(21) > a') el test es muy fragil 
y poco estable, ya que si en el futuro cambia el orden de los enlaces, la posicion 21 cogeria otro elemento y el test fallaria.
Ademas, con ".fa" obtiene por clase de icono y no por el boton real, por lo que si cambia el icono fallaria el test
Por ultimo, se añade un assert para verificar que el login fue exitoso
*/


  it("login exitoso 2", () => {
    cy.visit("https://the-internet.herokuapp.com/")
    cy.contains("a", "Form Authentication").should("be.visible").click()
    cy.get("#username").should("be.visible").type("tomsmith")
    cy.get("#password").should("be.visible").type("SuperSecretPassword!")
    cy.get('button[type="submit"]').should("be.enabled").click()
    cy.get(".flash.success").should("contain.text", "You logged into a secure area!")
  })
 
})