import { Route, Routes } from "react-router-dom"
import { QuizListPage } from "../components/Quiz/QuizListPage"
import { SolutionListPage } from "../components/Solution/SolutionListPage"
import { QuizDetailPage } from "../components/Quiz/QuizDetailPage"
import { CreateQuiz } from "../components/Quiz/CreateQuiz"
import { PrivateRoute } from "../components/PrivateRoute"
import { MyQuizzes } from '../components/Quiz/MyQuizzes'
import { QuizSolutions } from "../components/Solution/QuizSolutions"


export const QuizzHubRouter = () => {
    return (
        <Routes>
            <Route path="list/" element={<QuizListPage />} />
            <Route path="solutions/" element={<PrivateRoute>
                <SolutionListPage />
            </PrivateRoute>} />
            <Route path="quiz/detail/:quizId" element={<QuizDetailPage />} />
            <Route path="quiz/create" element={<PrivateRoute>
                <CreateQuiz />
            </PrivateRoute>} />
            <Route path="quiz/create" element={<PrivateRoute>
                <CreateQuiz />
            </PrivateRoute>} />
            <Route path="quiz/my-quizzes" element={<PrivateRoute>
                <MyQuizzes />
            </PrivateRoute>} />
            <Route path="quiz/:quizId/solutions" element={<PrivateRoute>
                <QuizSolutions />
            </PrivateRoute>} />
        </Routes>
    )
}
