console.log("Script is running!");

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase, ref, set, get, onValue, push} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { setLogLevel } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";



// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyABYXGWsdW449FfdJIyxeUS3ElbXYZzg9E",
  
    authDomain: "story-blog-a6f74.firebaseapp.com",
  
    projectId: "story-blog-a6f74",
  
    storageBucket: "story-blog-a6f74.firebasestorage.app",
  
    messagingSenderId: "1027181378913",
  
    appId: "1:1027181378913:web:89e0f36b2e0484ac615920",
  
    measurementId: "G-2GBYLVST6Q"
  
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const db = getDatabase(app);
const auth = getAuth();
// Sign in anonymously
signInAnonymously(auth)
    .then(() => {
        console.log("User signed in anonymously");
    })
    .catch((error) => {
        console.error("Error signing in anonymously:", error.message);
    });

// Function to handle "Like" button clicks
window.likeStory = function (storyId) {
    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
        alert("Please wait, still signing in...");
        return;
    }

    const userId = user.uid; // Get the unique ID for the current user
    const likesRef = ref(db, `likes/${storyId}/${userId}`);


    // Check if the user has already liked the story
    get(likesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert("You have already liked this story!");
            } else {
                // Add the user's like to the database
                set(likesRef, true)
                    .then(() => console.log(`User ${userId} liked story ${storyId}`))
                    .catch((error) => console.error("Error writing like:", error));
            }
        })
        .catch((error) => console.error("Error checking likes:", error));
};


function loadLikes(storyId) {
    const likesRef = ref(db, `likes/${storyId}`);

    onValue(likesRef, (snapshot) => {
        if (snapshot.exists()) {
            const likesData = snapshot.val(); // Get the object containing likes
            const totalLikes = Object.keys(likesData).length; // Count the keys (user IDs)
            const likeElement = document.getElementById(`${storyId}-likes`);
            if (likeElement) {
                likeElement.textContent = totalLikes; // Update the total like count
            }
        } else {
            const likeElement = document.getElementById(`${storyId}-likes`);
            if (likeElement) {
                likeElement.textContent = 0; // Default to 0 if no likes
            }
        }
    });
}





function addComment(storyId, event) {
    event.preventDefault(); // Prevent page reload

    const user = auth.currentUser; // Get the authenticated user
    if (!user) {
        alert("You must be signed in to post a comment.");
        return;
    }

    const commentInput = document.getElementById(`comment-input-${storyId}`);
    const commentText = commentInput.value.trim();

    if (!commentText) {
        alert("Comment cannot be empty.");
        return;
    }

    console.log(`Adding comment for story: ${storyId}`); // Debugging log

    // Firebase reference
    const commentsRef = ref(db, `comments/${storyId}`);
    const newCommentRef = push(commentsRef);

    const commentData = {
        userId: user.uid,
        username: user.displayName || "Anonymous",
        content: commentText,
        timestamp: Date.now()
    };

    // Save to Firebase
    set(newCommentRef, commentData)
        .then(() => {
            console.log("Comment added successfully:", commentData);
            commentInput.value = ""; // Clear the input field
        })
        .catch((error) => {
            console.error("Error adding comment:", error);
        });
}

// Expose addComment to the global scope
window.addComment = addComment;




function loadComments(storyId) {
    const commentsRef = ref(db, `comments/${storyId}`);

    onValue(commentsRef, (snapshot) => {
        const commentsContainer = document.getElementById(`comments-${storyId}`);
        commentsContainer.innerHTML = ""; // Clear old comments

        if (snapshot.exists()) {
            const commentsData = snapshot.val();
            Object.values(commentsData).forEach((comment) => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `
                    <p><strong>${comment.username}:</strong> ${comment.content}</p>
                    <small>${new Date(comment.timestamp).toLocaleString()}</small>
                `;
                commentsContainer.appendChild(commentElement);
            });
        } else {
            commentsContainer.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
        }
    });
}


// Load likes when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadLikes("story-1"); // Load likes for story-1
    loadLikes("story-2"); // Add more stories as needed
    loadLikes("story-3");
    loadLikes("story-4");
    loadLikes("story-5");
    loadLikes("story-6");
    loadLikes("story-7");
    loadLikes("story-8");
    loadLikes("story-9");
    loadLikes("story-10");
    loadLikes("story-11");
    loadLikes("story-12");
    loadLikes("story-13");
    loadLikes("story-14");
    loadLikes("story-15");
    loadLikes("story-16");
    loadLikes("story-17");
    loadLikes("story-18");
    loadLikes("story-19");
    loadLikes("story-20");
});


document.addEventListener("DOMContentLoaded", () => {
    loadComments("story-1");
    loadComments("story-2");
    loadComments("story-3");
    loadComments("story-4");
    loadComments("story-5");
    loadComments("story-6");
    loadComments("story-7");
    loadComments("story-8");
    loadComments("story-9");
    loadComments("story-10");
    loadComments("story-11");
    loadComments("story-12");
    loadComments("story-13");
    loadComments("story-14");
    loadComments("story-15");
    loadComments("story-16");
    loadComments("story-17");
    loadComments("story-18");
    loadComments("story-19");
    loadComments("story-20");
    loadComments("story-21");
    loadComments("story-22");

});
