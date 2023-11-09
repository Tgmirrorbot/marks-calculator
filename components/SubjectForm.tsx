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
  const [showModal, setShowModal] = useState(false);
  const [internalMarks, setInternalMarks] = useState(0);
  const [midtermMarks, setMidtermMarks] = useState(0);

  const addSubject = () => {
    if (newSubject.name) {
      setSubjects([...subjects, newSubject]);
      setNewSubject({ name: '', finalMarks: 0, internalMarks: 0, midtermMarks: 0 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  const calculateScenarios = () => {
    // Calculate scenarios based on internal marks and midterm marks
    // This is a placeholder, replace with your own logic
    const scenarios = [];
    for (let i = 0; i <= 100; i++) {
      if (internalMarks + midtermMarks + i >= 40) {
        scenarios.push(i);
      }
    }
    return scenarios;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <input type="text" name="name" placeholder="Subject Name" value={newSubject.name} onChange={handleInputChange} />
        <button className="mt-2 p-2 rounded-md text-white bg-blue-500" onClick={addSubject}>Add Subject</button>
        <button className="mt-2 p-2 rounded-md text-white bg-green-500 ml-2" onClick={() => setShowModal(true)}>Surprise Me</button>
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
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Predict Exam Scenarios
                    </h3>
                    <div className="mt-2">
                      <input type="number" name="internalMarks" placeholder="Internal Marks" value={internalMarks} onChange={(e) => setInternalMarks(Number(e.target.value))} />
                      <input type="number" name="midtermMarks" placeholder="Midterm Marks" value={midtermMarks} onChange={(e) => setMidtermMarks(Number(e.target.value))} />
                      <p className="text-sm text-gray-500">
                        Possible final marks to pass: {calculateScenarios().join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectForm;