import React, { useState } from 'react';

interface Subject {
  name: string;
  finalMarks: number;
  internalMarks: number;
  midtermMarks: number;
}

const SubjectForm = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSubject, setPopupSubject] = useState<Subject>({ name: '', finalMarks: 0, internalMarks: 0, midtermMarks: 0 });

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

  const calculateTotalMarks = (subject: Subject) => {
    return (subject.finalMarks / 2) + (subject.midtermMarks / 2) + subject.internalMarks;
  };

  const calculateGrade = (totalMarks: number, finalMarks: number) => {
    if (finalMarks < 35 || totalMarks < 40) return 'Fail';
    if (totalMarks < 51) return 'D';
    if (totalMarks < 61) return 'C';
    if (totalMarks < 71) return 'B';
    if (totalMarks < 81) return 'A';
    return 'O';
  };

  const handleSurpriseMe = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupChange = (field: string, value: string | number) => {
    setPopupSubject({ ...popupSubject, [field]: value });
  };

  const calculateFinalMarksNeeded = () => {
    const totalMarks = calculateTotalMarks(popupSubject);
    if (totalMarks >= 40) return 0;
    return 40 - totalMarks;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <button className="mt-2 p-2 rounded-md text-white bg-blue-500" onClick={addSubject}>Add Subject</button>
        <button className="mt-2 ml-2 p-2 rounded-md text-white bg-green-500" onClick={handleSurpriseMe}>Surprise Me</button>
        {subjects.map((subject, index) => (
          <div key={index}>
            {/* The rest of your code goes here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectForm;