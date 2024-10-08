import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, SurveyState } from '@/redux/types';

const initialState: SurveyState = {
  currentQuestionIndex: 0,
  answers: [],
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<Answer>) => {
      const existingAnswerIndex = state.answers.findIndex(
        (answer) => answer.questionId === action.payload.questionId
      );

      if (existingAnswerIndex !== -1) {
        state.answers[existingAnswerIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    removeAnswer: (state, action: PayloadAction<string>) => {
      state.answers = state.answers.filter(
        (answer) => answer.answerId !== action.payload
      );
    },
    resetSurvey: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = [];
    },
  },
});

export const { saveAnswer, removeAnswer, resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;
