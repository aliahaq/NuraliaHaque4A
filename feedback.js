document.addEventListener('DOMContentLoaded', function () {
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackList = document.getElementById('feedback-items');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const prodName1 = document.getElementById('searchName1');
  const prodName2 = document.getElementById('searchName2');
  const prodName3 = document.getElementById('searchName3');
  const prodName4 = document.getElementById('searchName4');
  const prodName5 = document.getElementById('searchName5');

  const submitButton = document.querySelector('#feedback-form button');
  
    let editingIndex = -1; 
  
    const savedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
  
    savedFeedback.forEach(function (feedback, index) {
      displayFeedback(feedback, index);
    });
  
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = nameInput.value;
      const message = messageInput.value;
      const pName1 = prodName1.value;
      const pName2 = prodName2.value;
      const pName3 = prodName3.value;
      const pName4 = prodName4.value;
      const pName5 = prodName5.value;
  
      if (name && message && pName1 && pName2 && pName3 && pName4 && pName5) {
        if (editingIndex === -1) {
          const feedback = { name, message, pName1, pName2,  pName3,  pName4,  pName5 };
          savedFeedback.push(feedback);
        } else {
          savedFeedback[editingIndex] = {  name, message, pName1,  pName2,  pName3,  pName4,  pName5 };
          submitButton.textContent = 'Submit Feedback';
          editingIndex = -1;
        }
  
        localStorage.setItem('feedback', JSON.stringify(savedFeedback));
  
        displayFeedbackList();
  
        nameInput.value = '';
        messageInput.value = '';
        prodName1.value = '';
        prodName2.value = '';
        prodName3.value = '';
        prodName4.value = '';
        prodName5.value = '';
      }
    });
  
    function displayFeedbackList() {
      feedbackList.innerHTML = '';
      savedFeedback.forEach(function (feedback, index) {
        displayFeedback(feedback, index);
      });
    }
  
    function displayFeedback(feedback, index) {
      const li = document.createElement('li');
      li.textContent = `I'm ${feedback.name}. My top 5 make up list are ${feedback.pName1}, ${feedback.pName2}, ${feedback.pName3}, ${feedback.pName4} and ${feedback.pName5}
      i love them because ${feedback.message}.`;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
  
      deleteButton.addEventListener('click', function () {
        savedFeedback.splice(index, 1);
        localStorage.setItem('feedback', JSON.stringify(savedFeedback));
        displayFeedbackList();
      });
  
      editButton.addEventListener('click', function () {
        nameInput.value = feedback.name;
        messageInput.value = feedback.message;
        prodName1.value = feedback.pName1;
        prodName2.value = feedback.pName2;
        prodName3.value = feedback.pName3;
        prodName4.value = feedback.pName4;
        prodName5.value = feedback.pName5;
        submitButton.textContent = 'Update Feedback';
        editingIndex = index;
      });
  
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      feedbackList.appendChild(li);
    }
});

function backHome() {
  window.location.href = 'index.html';
}
  