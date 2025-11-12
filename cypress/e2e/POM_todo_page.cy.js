import { POMTodoPage } from '../support/pages/POM_todo_page'


const todo = new POMTodoPage();

describe('Pruebas de la web de TODO', () => {

  beforeEach(() => {
    todo.visit();
  });

  it('Crear una nueva tarea', () => {
    todo.addTask('comprar el pan');
    todo.shouldSeeTask('comprar el pan');
  });

  it('Marcar una tarea como completada', () => {
    todo.addTask('ir al gimnasio');
    todo.markTaskCompleted('ir al gimnasio');
    todo.shouldBeCompleted('ir al gimnasio');
  });

  it('Desmarcar una tarea completada', () => {
    todo.addTask('pasear al perro');
    todo.markTaskCompleted('pasear al perro');
    todo.unmarkTask('pasear al perro');
    todo.shouldBeActive('pasear al perro');
  });

  it('Editar una tarea', () => {
    todo.addTask('aprender cypros');
    todo.editTask('aprender cypros', 'aprender cypress');
    todo.shouldSeeTask('aprender cypress');
    todo.shouldNotSeeTask('aprender cypros');
  });

  it('Borrar una tarea', () => {
    todo.addTask('lavar el coche');
    todo.shouldSeeTask('lavar el coche');
    todo.deleteTask('lavar el coche');
    todo.shouldNotSeeTask('lavar el coche');
  });

  it('Filtrar tareas completadas y activas', () => {
    const activeTasks = ['tarea 2', 'tarea 6', 'tarea 7'];
    const completedTasks = ['tarea 1', 'tarea 3', 'tarea 4', 'tarea 5'];

    [...completedTasks, ...activeTasks].forEach((t) => todo.addTask(t));

    completedTasks.forEach((t) => todo.markTaskCompleted(t));

    // Filtrar Completadas
    todo.filter('Completed');
    todo.shouldHaveTasks(completedTasks);

    // Filtrar Activas
    todo.filter('Active');
    todo.shouldHaveTasks(activeTasks);

    // Filtrar Todas
    todo.filter('All');
    todo.shouldHaveTasks([...completedTasks, ...activeTasks]);
  });
});
