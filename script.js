document.addEventListener("DOMContentLoaded", function() {
    const notesContainer = document.getElementById("notes-container");
    const newNoteBtn = document.getElementById("new-note-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    var editNodeIndex = null;

    // Function to display notes
    function displayNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = ""; // Clear existing notes

        notes.forEach((note, index) => {
            const noteBox = document.createElement("div");
            noteBox.classList.add("note");
            noteBox.innerHTML = `
                <h2>${note.name}</h2>
                <p>${note.content}</p>
                <button id="edit-btn" class="edit-note-btn">Edit ✍️</button>
                <button id="delete-btn" class="delete-note-btn">Delete 🙅‍♂️</button>
            `;
            notesContainer.appendChild(noteBox);
        });
    }


    // Function to delete a note
    function deleteNoteButtonHandler(event) {
        if (event.target.classList.contains("delete-note-btn")) {
            const noteElements = Array.from(document.querySelectorAll(".delete-note-btn"));
            const index = noteElements.indexOf(event.target);
            deleteNote(index);
        }
    }

    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1); // Remove the note at the specified index
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes(); // Refresh the list of notes
    }

    // Event delegation for delete note buttons
    notesContainer.addEventListener("click", deleteNoteButtonHandler);


    // Event listener for the New Note button
    newNoteBtn.addEventListener("click", function() {
        // Show the new note modal
        const modal = document.getElementById("note-modal");
        modal.style.display = "block";
    });
    

    // Display initial list of notes
    displayNotes();
    
    function closeModal() {
        const modal = document.getElementById("note-modal");
        modal.style.display = "none";

        editNodeIndex = null;
    }
    
    // Event listener for the New Note Close button
    closeModalBtn.addEventListener("click", function() {
        const modal = document.getElementById("note-modal");
        modal.style.display = "none";
    });
    
    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
        const modal = document.getElementById("note-modal");
        if (event.target == modal) {
            modal.style.display = "none";
            editNodeIndex = null;
        }
    };


    // New Note form submission
    const newNoteForm = document.getElementById("edit-note-form");

    newNoteForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        if (editNodeIndex != null) {
            deleteNote(editNodeIndex);
        }
        
        const noteName = document.getElementById("note-name").value;
        const noteContent = document.getElementById("note-content").value;
        
        // Retrieve existing notes from localStorage or initialize an empty array
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        
        // Add the new note to the existing notes array
        existingNotes.push({ name: noteName, content: noteContent });
        
        // Save the updated notes array back to localStorage
        localStorage.setItem("notes", JSON.stringify(existingNotes));
        
        // Close the modal
        closeModal();
        
        // Refresh the list of notes
        displayNotes();
    });
    

    // Edit Note Section
    // Function to edit a note
    function editNoteButtonHandler(event) {
        if(event.target.classList.contains("edit-note-btn")) {

            const noteElements = Array.from(document.querySelectorAll(".edit-note-btn"));
            const index = noteElements.indexOf(event.target);
            editNodeIndex = index;

            // Retrieve existing notes from localStorage or initialize an empty array
            const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
            const existingNoteName = existingNotes[index].name;
            const existingNoteContent = existingNotes[index].content;
            
            const nameInput = document.getElementById("note-name");
            const contentInput = document.getElementById("note-content");
            
            nameInput.value = existingNoteName;
            contentInput.value = existingNoteContent;
            
            const modal = document.getElementById("note-modal");
            modal.style.display = "block";
        }
    }

    // Event delegation for delete note buttons
    notesContainer.addEventListener("click", editNoteButtonHandler);
});
