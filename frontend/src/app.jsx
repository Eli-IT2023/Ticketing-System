import { Routes, Route } from "react-router-dom";

import ProjectForm from "./modules/ticketContainer";
import ViewTicket from "./components/tickets/TicketViewDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectForm />} />
      <Route path="/viewTicket/:ticketId" element={<ViewTicket />} />
    </Routes>
  );
}

export default App;
