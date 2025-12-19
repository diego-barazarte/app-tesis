import { useNavigate, useParams } from "react-router-dom";
import { quizzes } from "../../data/quizzesMock";

function QuizLista() {
  const navigate = useNavigate();
  const { id, semana } = useParams();

  const quizzesSemana = quizzes.filter(
    (q) => q.claseId === Number(id) && q.semana === Number(semana)
  );

  return (
    <div>
      <h2>Quiz disponibles</h2>

      {quizzesSemana.map((q) => (
        <div key={q.id}>
          <h4>{q.titulo}</h4>
          <button onClick={() => navigate(`quiz/${q.id}`)}>
            Jugar
          </button>
        </div>
      ))}
    </div>
  );
}

export default QuizLista;
