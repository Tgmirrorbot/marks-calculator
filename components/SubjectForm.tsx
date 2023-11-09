import React, { useState } from 'react';

interface Subject {
  name: string;
  finalMarks: number;
  internalMarks: number;
  midtermMarks: number;
}

const SubjectForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState<Subject>({ name: '', finalMarks: 0, internalMarks: 0, midtermMarks: 0 });

  const addSubject = () => {
    if (newSubject.name) {
      setSubjects([...subjects, newSubject]);
      setNewSubject({ name: '', finalMarks: 0, internalMarks: 0, midtermMarks: 0 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <input type="text" name="name" placeholder="Subject Name" value={newSubject.name} onChange={handleInputChange} />
        <button className="mt-2 p-2 rounded-md text-white bg-blue-500" onClick={addSubject}>Add Subject</button>
        <table className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Final Marks</th>
              <th>Internal Marks</th>
              <th>Midterm Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.finalMarks}</td>
                <td>{subject.internalMarks}</td>
                <td>{subject.midtermMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectForm;