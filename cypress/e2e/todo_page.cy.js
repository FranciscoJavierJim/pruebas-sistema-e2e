describe('pruebas de la pagina TODO', () => {

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/')
  })

  it('crear tarea', () => {
    cy.get('[data-testid="text-input"]').type("comprar el pan{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "comprar el pan")
  })

  it('marcar tarea como completada', () => {
    cy.get('[data-testid="text-input"]').type("ir al gimnasio{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-label"]').should("have.text", "ir al gimnasio")
    cy.get('[data-testid="todo-item-toggle"]').should("be.checked")   
  })

  it('desmarcar tarea completada', () => {
    cy.get('[data-testid="text-input"]').type("pasear al perro{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-label"]').should("have.text", "pasear al perro")
    cy.get('[data-testid="todo-item-toggle"]').should("not.be.checked")
  });

  
  it('editar tarea', () => {
    cy.get('[data-testid="text-input"]').type("aprender cypros{enter}")
    cy.get('[data-testid="todo-item-label"]').dblclick({ force: true })
    cy.get('[data-testid="todo-item-label"]').clear().type("aprender cypress{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "aprender cypress")
  })
  

  it('borrar una tarea', () => {
    cy.get('[data-testid="text-input"]').type("lavar el coche{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "lavar el coche")
    cy.get('.todo-list li') // selecciona cada elemento li dentro de la clase todo-list
    .find('.destroy') // el boton de cerrar "x" no tiene el atributo data-testid, por lo que se ha encontrado en .todo-list li, ademas, dicho boton tiene clase .destroy
    .invoke('show') // forzamos a mostrar el boton de cerrar
    .click()
    cy.get('.todo-list li').should("have.length", 0)
  });

  it('filtrar tareas', () => {
    cy.get('[data-testid="text-input"]').type("tarea 1{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 2{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 3{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 4{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 5{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 6{enter}")
    cy.get('[data-testid="text-input"]').type("tarea 7{enter}")
    cy.get(':nth-child(1) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(3) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(4) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(5) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="footer-navigation"] > :nth-child(3) > a').click()
    cy.get('[data-testid="todo-item"]') // selecciona todos los elementos de la lista de tareas completadas
    .should('have.length', 4) // 4 son las tareas que hemos marcado como completadas
    .then((items) => { // trabajamos con los elementos seleccionados
    const doIt = [...items].map(i => i.innerText) // transforma los elementos en un array con cada una de las tareas completadas
    expect(doIt).to.include.members(['tarea 1', 'tarea 3', 'tarea 4', 'tarea 5']) // con esta assertion verificamos que el array contiene los elementos indicados como marcados
    })
    cy.get('[data-testid="footer-navigation"] > :nth-child(2) > a').click()
    cy.get('[data-testid="todo-item"]')
    .should('have.length', 3)
    .then((items) => {
    const toDo = [...items].map(i => i.innerText)
    expect(toDo).to.include.members(['tarea 2', 'tarea 6', 'tarea 7'])
    })
    cy.get('[data-testid="footer-navigation"] > :nth-child(1) > a').click()
})

})