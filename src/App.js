import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import CreateQuiz from "./components/home/CreateQuiz";
import EditQuiz from "./components/home/EditQuiz";
import QuizDetail from "./components/home/QuizDetail";
import QuizList from "./components/home/QuizList";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/createquiz",
      element: <CreateQuiz />,
    },
    {
      path: "/listquiz",
      element: <QuizList />,
    },
    {
      path: "/quiz/:id",
      element: <QuizDetail />,
    },
    {
      path: "/edit/:id",
      element: <EditQuiz />,
    },
    
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
