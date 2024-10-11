import axios from "axios";

export const fetchWinner = async (quizId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/quizhub/quiz/${quizId}/winner/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching winner:', error);
    }
};