import { Route, Routes } from "react-router-dom"
import { QuizListPage } from "../components/QuizListPage"
import { SolutionListPage } from "../components/SolutionListPage"
import { QuizDetailPage } from "../components/QuizDetailPage"


export const QuizzHubRouter = () => {
    return (
        <Routes>
            <Route path="list/" element={<QuizListPage />} />
            <Route path="solutions/" element={<SolutionListPage />} />
            <Route path="quiz/detail" element={<QuizDetailPage />} />
        </Routes>
    )
}
