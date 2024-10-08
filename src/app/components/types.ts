export interface AnswerButtonProps {
  value: string;
  label: string;
  onClick: (answerId: string) => void;
}

export interface HeaderProps {
  navContent?: React.ReactNode;
}

export interface AnswerOptions {
  answerId: string;
  label: string;
}

export interface QuestionScreenProps {
  question: {
    id: string;
    screenType: string;
    question: string;
    replaceable?: boolean;
    description?: string;
    options: AnswerOptions[];
  };
  onAnswerSelect: (answerId: string) => void;
}

export interface Question {
  id: string;
  screenType: string;
  question: string;
  replaceable?: boolean;
  description?: string;
  options: AnswerOptions[];
  nextScreen: Record<string, string>;
}

export interface SurveyData {
  questionsList: Question[];
}

export interface SurveyContainerProps {
  screenId: string;
}
