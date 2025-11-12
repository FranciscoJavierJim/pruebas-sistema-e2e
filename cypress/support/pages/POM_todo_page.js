export class POMTodoPage {  // para importar la clase a los test

  elements = {  // agrupa funciones que devuelven selectores en cypress
    input: () => cy.get('[data-testid="text-input"]'),  // selecciona el campo para poder añadir tareas
    taskItem: (text) => cy.contains('[data-testid="todo-item"]', text),  // selecciona un item de la lista por contenido
    taskLabel: (text) => cy.contains('[data-testid="todo-item-label"]', text), // selecciona solo por la etiqueta
    taskToggle: (text) => cy.contains('.todo-list li', text).find('[data-testid="todo-item-toggle"]'),  // selecciona el check de la tarea. localiza primero el li que contiene el texto y luego busca el check
    deleteButton: (text) => cy.contains('.todo-list li', text).find('.destroy'), // selecciona el boton para eliminar una tarea
    footerFilter: (option) => cy.get('[data-testid="footer-navigation"]').contains(option), // selecciona los filtros por texto
  };

  visit() {
    cy.visit('https://todomvc.com/examples/react/dist/');
  }

  addTask(taskName) {
    this.elements.input().should('be.visible').type(`${taskName}{enter}`);
  }

  markTaskCompleted(taskName) {
    this.elements.taskToggle(taskName).check({ force: true });
  }

  unmarkTask(taskName) {
    this.elements.taskToggle(taskName).uncheck({ force: true });
  }

  editTask(oldName, newName) {
    this.elements.taskLabel(oldName).dblclick({ force: true });
    cy.focused().clear().type(`${newName}{enter}`); // con cy.focused() obitene el input que quedo activo tras hacer doble click, luego borra y escribe la nueva tarea
  }

  deleteTask(taskName) {
    this.elements.deleteButton(taskName).invoke('show').click();
  }

  filter(option) {
    this.elements.footerFilter(option).click();   // opciones: 'All', 'Active', 'Completed'
  }

  shouldSeeTask(taskName) {
    this.elements.taskLabel(taskName).should('exist');
  }

  shouldNotSeeTask(taskName) {
    this.elements.taskItem(taskName).should('not.exist');
  }

  shouldBeCompleted(taskName) {
    this.elements.taskToggle(taskName).should('be.checked');
  }

  shouldBeActive(taskName) {
    this.elements.taskToggle(taskName).should('not.be.checked');
  }

  shouldHaveTasks(expectedNames) {
    cy.get('[data-testid="todo-item-label"]').then(($items) => {
      const taskNames = [...$items].map((i) => i.innerText.trim());
      expect(taskNames).to.include.members(expectedNames);
    });
  }
}
