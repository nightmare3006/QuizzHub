
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "../components/LoginPage"
import { RegisterPage } from "../components/RegisterPage"
import { HomePage } from "../components/HomePage"
import { QuizzHubRouter } from "./QuizzHubRouter"
import { Navbar } from "../components/Navbar"

export const AppRouter = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quizzes/*" element={<QuizzHubRouter />} />
    </Routes>
    </BrowserRouter>
  )
}
