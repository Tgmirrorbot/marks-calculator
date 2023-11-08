import React, { useState } from 'react';

interface Subject {
  name: string;
  finalMarks: number;
  internalMarks: number;
  midtermMarks: number;
}

const SubjectForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', finalMarks: 0, internalMarks: 0, midtermMarks: 0 }]);
  };

  const removeSubject = (index: number) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const updateSubject = (index: number, field: string, value: string | number) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const calculateGrade = (subject: Subject) => {
    const totalMarks = (subject.finalMarks / 2) + (subject.midtermMarks / 2) + subject.internalMarks;
    if (totalMarks < 40) return 'F';
    if (totalMarks < 51) return 'D';
    if (totalMarks < 61) return 'C';
    if (totalMarks < 71) return 'B';
    if (totalMarks < 81) return 'A';
    return 'O';
  };

  return (
    <div>
      {subjects.map((subject, index) => (
        <div key={index}>
          <input
            value={subject.name}
            onChange={(e) => updateSubject(index, 'name', e.target.value)}
            placeholder="Subject Name"
          />
          <input
            type="number"
            value={subject.finalMarks}
            onChange={(e) => updateSubject(index, 'finalMarks', Number(e.target.value))}
            placeholder="Final Marks"
          />
          <input
            type="number"
            value={subject.internalMarks}
            onChange={(e) => updateSubject(index, 'internalMarks', Number(e.target.value))}
            placeholder="Internal Marks"
          />
          <input
            type="number"
            value={subject.midtermMarks}
            onChange={(e) => updateSubject(index, 'midtermMarks', Number(e.target.value))}
            placeholder="Midterm Marks"
          />
          <button onClick={() => removeSubject(index)}>Remove</button>
          <p>Grade: {calculateGrade(subject)}</p>
        </div>
      ))}
      <button onClick={addSubject}>Add Subject</button>
    </div>
  );
};

export default SubjectForm;