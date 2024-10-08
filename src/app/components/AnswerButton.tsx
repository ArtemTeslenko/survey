import { AnswerButtonProps } from '@/app/components/types';

const AnswerButton: React.FC<AnswerButtonProps> = ({
  value,
  label,
  onClick,
}) => {
  return (
    <button
      className="answer-button"
      key={value}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

export default AnswerButton;
