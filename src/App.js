import "./App.css";
import PersonalInfo from "./Components/PersonalInfo";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LayOut } from "./Components/LayOut";
import PickPlan from "./Components/PickPlan";
import Finishing from "./Components/Finishing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <PersonalInfo />,
        },
        {
          path: "plan",
          element: <PickPlan />,
        },
        {
          path: "pick",
          element: <PickPlan />,
        },
        {
          path: "finish",
          element: <Finishing />,
        },
      ],
    },
  ]);

  return (
    <div className="w-full h-screen flex justify-center items-center  bg-[#eef5ff]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
