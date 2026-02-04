import { Routes, Route } from "react-router-dom";

import ProjectForm from "./components/ticketForm.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectForm />} />
    </Routes>
  );
}

export default App;
