import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";

const initialForm = {
  assessmentType: "In-Person Energy Mapping",
  preferredDate: "",
  preferredTime: "",
  notes: ""
};

function BookingPage() {
  const { token } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAppointments = () => {
    apiRequest("/appointments", { token }).then(setAppointments).catch((error) => setMessage(error.message));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiRequest("/appointments", {
        method: "POST",
        token,
        body: JSON.stringify(form)
      });
      setMessage("Appointment request submitted successfully.");
      setForm(initialForm);
      fetchAppointments();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page split-section">
      <form className="glass-card booking-form" onSubmit={handleSubmit}>
        <span className="eyebrow">Book an Appointment</span>
        <h1>Schedule your in-person wellness session</h1>
        <label>
          Assessment Type
          <select value={form.assessmentType} onChange={(event) => setForm({ ...form, assessmentType: event.target.value })}>
            <option>In-Person Energy Mapping</option>
            <option>Executive Wellness Consultation</option>
            <option>Campus Wellness Screening</option>
            <option>Corporate Wellness Index Review</option>
          </select>
        </label>
        <label>
          Preferred Date
          <input type="date" value={form.preferredDate} onChange={(event) => setForm({ ...form, preferredDate: event.target.value })} required />
        </label>
        <label>
          Preferred Time
          <input type="time" value={form.preferredTime} onChange={(event) => setForm({ ...form, preferredTime: event.target.value })} required />
        </label>
        <label>
          Notes
          <textarea rows="5" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Share your goals, symptoms, or team context" />
        </label>
        {message && <p className="feedback-text">{message}</p>}
        <button className="btn btn-primary">Request Appointment</button>
      </form>
      <section className="glass-card">
        <span className="eyebrow">Your Requests</span>
        <h2>Appointment History</h2>
        <div className="list-stack">
          {appointments.map((item) => (
            <div key={item.id} className="list-row">
              <div>
                <strong>{item.assessmentType}</strong>
                <span>{item.preferredDate} at {item.preferredTime}</span>
              </div>
              <span className="pill">{item.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
