export class POMTodoPage {  // para importar la clase a los test

  elements = {  // agrupa funciones que devuelven selectores en cypress
    newTaskInput: () => cy.get('[data-testid="text-input"]'),  // selecciona el campo para poder añadir tareas
    taskItem: (text) => cy.contains('[data-testid="todo-item"]', text),  // selecciona un item de la lista por contenido
    taskLabel: () => cy.get('[data-testid="todo-item-label"]'), // selecciona solo por la etiqueta
    taskCheckBox: (text) => cy.contains('.todo-list li', text).find('[data-testid="todo-item-toggle"]'),  // selecciona el check de la tarea. localiza primero el li que contiene el texto y luego busca el check
    deleteButton: (text) => cy.contains('.todo-list li', text).find('.destroy'), // selecciona el boton para eliminar una tarea
    filterOption: (option) => cy.get('[data-testid="footer-navigation"]').contains(option), // selecciona los filtros por texto
  };

  visit() {
    cy.visit('https://todomvc.com/examples/react/dist/');
  }

  addTask(taskName) {
    this.elements.newTaskInput().should('be.visible').type(`${taskName}{enter}`);
  }

  markTaskCompleted(taskName) {
    this.elements.taskCheckBox(taskName).check({ force: true });
  }

  unmarkTask(taskName) {
    this.elements.taskCheckBox(taskName).uncheck({ force: true });
  }

  editTask(oldName, newName) {
    this.elements.taskLabel().filter(':contains("'+oldName+'")').dblclick({ force: true });
    cy.focused().clear().type(`${newName}{enter}`); // con cy.focused() obitene el input que quedo activo tras hacer doble click, luego borra y escribe la nueva tarea
  }

  deleteTask(taskName) {
    this.elements.deleteButton(taskName).invoke('show').click();
  }

  filter(option) {
    this.elements.filterOption(option).click();   // opciones: 'All', 'Active', 'Completed'
  }

  shouldSeeTask(taskName) {
    this.elements.taskLabel().filter(':contains("'+taskName+'")').should('exist');
  }

  shouldNotSeeTask(taskName) {
    this.elements.taskItem(taskName).should('not.exist');
  }

  shouldBeCompleted(taskName) {
    this.elements.taskCheckBox(taskName).should('be.checked');
  }

  shouldBeActive(taskName) {
    this.elements.taskCheckBox(taskName).should('not.be.checked');
  }

  shouldHaveTasks(expectedNames) {
    cy.get('[data-testid="todo-item-label"]').then(($items) => {
      const taskNames = [...$items].map((i) => i.innerText.trim());
      expect(taskNames).to.include.members(expectedNames);
    });
  }
}
