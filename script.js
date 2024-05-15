document.addEventListener("DOMContentLoaded", function() {

    const notesContainer = document.getElementById("notes-container");
    const newNoteBtn = document.getElementById("new-note-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modal = document.getElementById("note-modal");
    const newNoteForm = document.getElementById("edit-note-form");

    var editNodeIndex = null;


    function displayNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = "";

        notes.forEach((note, index) => {
            const noteBox = document.createElement("div");
            noteBox.classList.add("note");
            noteBox.innerHTML = `
                <h2>${note.name}</h2>
                <p>${note.content}</p>
                <button class="edit-note-btn">Edit ✍️</button>
                <button class="delete-note-btn">Delete 🙅‍♂️</button>
            `;
            notesContainer.appendChild(noteBox);
        });
    }

    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1); // Remove the note at the specified index
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes(); // Refresh the list of notes
    }

    function deleteNoteButtonHandler(event) {
        if (event.target.classList.contains("delete-note-btn")) {
            const noteElements = Array.from(document.querySelectorAll(".delete-note-btn"));
            const index = noteElements.indexOf(event.target);
            deleteNote(index);
        }
    }
    
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
            
            modal.style.display = "block";
        }
    }

    newNoteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (editNodeIndex != null) {
            deleteNote(editNodeIndex);
        }
        
        const noteName = document.getElementById("note-name").value;
        const noteContent = document.getElementById("note-content").value;
        
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        
        existingNotes.push({ name: noteName, content: noteContent });
        
        localStorage.setItem("notes", JSON.stringify(existingNotes));
        
        closeModal();
        displayNotes();
    });

    function closeModal() {
        modal.style.display = "none";
        editNodeIndex = null;
    }

    newNoteBtn.addEventListener("click", function() {
        document.getElementById("note-name").value = "";
        document.getElementById("note-content").value = "";

        modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", function() {
        closeModal();
    });

    modal.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    notesContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-note-btn")) {
            deleteNoteButtonHandler(event);
        } else if (event.target.classList.contains("edit-note-btn")) {
            editNoteButtonHandler(event);
        }
    });

    displayNotes();
});
