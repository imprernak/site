import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProposalPage from './pages/ProposalPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposal" element={<ProposalPage />} />
      </Routes>
    </BrowserRouter>
  )
}