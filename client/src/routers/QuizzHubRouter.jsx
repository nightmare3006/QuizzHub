import { Route, Routes } from "react-router-dom"
import { QuizListPage } from "../components/Quiz/QuizListPage"
import { SolutionListPage } from "../components/Solution/SolutionListPage"
import { QuizDetailPage } from "../components/Quiz/QuizDetailPage"
import { CreateQuiz } from "../components/Quiz/CreateQuiz"
import { PrivateRoute } from "../components/PrivateRoute"


export const QuizzHubRouter = () => {
    return (
        <Routes>
            <Route path="list/" element={<QuizListPage />} />
            <Route path="solutions/" element={<PrivateRoute>
                <SolutionListPage />
            </PrivateRoute>} />
            <Route path="quiz/detail/" element={<QuizDetailPage />} />
            {/* <Route path="quiz/:quizId/detail" element={<QuizDetailPage />} /> */}
            <Route path="quiz/create" element={<PrivateRoute>
                <CreateQuiz />
            </PrivateRoute>} />
        </Routes>
    )
}
