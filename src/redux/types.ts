export interface Answer {
  questionId: string;
  answerId: string;
}

export interface SurveyState {
  currentQuestionIndex: number;
  answers: Answer[];
}
