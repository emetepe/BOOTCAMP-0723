import { getUser } from "../global/state/globalState";
import {
  Login,
  PrintPokemonPage,
  PrintTemplateDashboard,
  PrintMemoryGame,
  PrintTicTacToePage,
  PrintTopoGame,
  PrintTrivialGame,
  PrintSnakeGame,
  TodoListApp,
  TodoDD,
  PrintHangmanGame,
} from "../pages";

// CONTROLADOR DE RENDERIZACIÓN EN CADA MOMENTO

export const initController = (pagesRender) => {
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? PrintTemplateDashboard() : Login();
      break;

    case "Pokemon":
      PrintPokemonPage();
      break;

    case "Dashboard":
      PrintTemplateDashboard();
      break;

    case "Trivial":
      PrintTrivialGame();
      break;

    case "Login":
      Login();
      break;

    case "Memory":
      PrintMemoryGame();
      break;

    case "Snake":
      PrintSnakeGame();
      break;

    case "TicTacToe":
      PrintTicTacToePage();
      break;

    case "Topo":
      PrintTopoGame();
      break;

    case "Hangman":
      PrintHangmanGame();
      break;

    case "TodoList":
      TodoListApp();
      break;

    case "TodoListDragDrop":
      TodoDD();
      break;
  }
};
