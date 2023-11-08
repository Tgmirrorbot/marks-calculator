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
    if (subject.finalMarks < 35 || totalMarks < 40) return 'Fail';
    if (totalMarks < 51) return 'D';
    if (totalMarks < 61) return 'C';
    if (totalMarks < 71) return 'B';
    if (totalMarks < 81) return 'A';
    return 'O';
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <button className="bg-blue-500 text-white rounded-md p-2 mt-2" onClick={addSubject}>Add Subject</button>
        {subjects.map((subject, index) => (
          <div key={index} className="flex flex-col space-y-2 mt-4">
            <label className="text-gray-600">Subject Name</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              value={subject.name}
              onChange={(e) => updateSubject(index, 'name', e.target.value)}
              placeholder="Subject Name"
            />
            <label className="text-gray-600">Final Marks (out of 100)</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              type="number"
              value={subject.finalMarks}
              onChange={(e) => updateSubject(index, 'finalMarks', Number(e.target.value))}
              placeholder="Final Marks"
              max={100}
            />
            <label className="text-gray-600">Internal Marks (out of 25)</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              type="number"
              value={subject.internalMarks}
              onChange={(e) => updateSubject(index, 'internalMarks', Number(e.target.value))}
              placeholder="Internal Marks"
              max={25}
            />
            <label className="text-gray-600">Midterm Marks (out of 50)</label>
            <input
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              type="number"
              value={subject.midtermMarks}
              onChange={(e) => updateSubject(index, 'midtermMarks', Number(e.target.value))}
              placeholder="Midterm Marks"
              max={50}
            />
            <button className="bg-red-500 text-white rounded-md p-2 mt-2" onClick={() => removeSubject(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="w-1/2 p-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Subject Name</th>
              <th className="px-4 py-2">Final Marks</th>
              <th className="px-4 py-2">Internal Marks</th>
              <th className="px-4 py-2">Midterm Marks</th>
              <th className="px-4 py-2">Grade</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{subject.name}</td>
                <td className="border px-4 py-2">{subject.finalMarks}</td>
                <td className="border px-4 py-2">{subject.internalMarks}</td>
                <td className="border px-4 py-2">{subject.midtermMarks}</td>
                <td className="border px-4 py-2">{calculateGrade(subject)}</td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 text-white rounded-md p-2" onClick={() => removeSubject(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectForm;