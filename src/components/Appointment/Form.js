import Button from "../Button";
import InterviewerList from "../InterviewerList";
import React, { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Validate that student and interviewer cannot be blank
  // If valid, clear error state and call onSave
  const validate = () => {
    if (student === "") {
      return setError("Student name cannot be blank");
    }
    if (interviewer === null) {
      return setError("Please select an interviewer");
    }
    setError("");
    props.onSave(student, interviewer);
  };

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // On cancel click, clear student and interviewer state and call onCancel
  const cancel = () => {
    reset();
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            data-cy="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
