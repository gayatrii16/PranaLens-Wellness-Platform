import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const scaleLabels = ["Very Low", "Low", "Moderate", "Good", "Excellent"];

function AssessmentPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiRequest("/assessments/questions").then(setQuestions).catch((error) => setFeedback(error.message));
  }, []);

  const handleAnswerChange = (question, value) => {
    setAnswers((current) => ({
      ...current,
      [question.id]: {
        id: question.id,
        category: question.category,
        dosha: question.dosha,
        value
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      setFeedback("Please respond to each assessment prompt before submitting.");
      return;
    }
    setIsSubmitting(true);
    setFeedback("");
    try {
      await apiRequest("/assessments", {
        method: "POST",
        token,
        body: JSON.stringify({ answers: Object.values(answers) })
      });
      navigate("/dashboard");
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section className="inner-hero glass-card">
        <span className="eyebrow">Assessment Module</span>
        <h1>Simulated holistic wellness questionnaire</h1>
        <p>Complete the guided assessment to generate your current wellness score and personalized recommendations.</p>
      </section>
      <form className="glass-card assessment-form" onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="assessment-question">
            <div>
              <span className="question-category">{question.category}</span>
              <h3>{question.prompt}</h3>
            </div>
            <div className="scale-row">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="scale-option">
                  <input type="radio" name={question.id} checked={answers[question.id]?.value === value} onChange={() => handleAnswerChange(question, value)} />
                  <span>{value}</span>
                  <small>{scaleLabels[value - 1]}</small>
                </label>
              ))}
            </div>
          </div>
        ))}
        {feedback && <p className="feedback-text">{feedback}</p>}
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Generating report..." : "Generate Wellness Report"}
        </button>
      </form>
    </div>
  );
}

export default AssessmentPage;
