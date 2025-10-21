// Display a hello world message
document.addEventListener('DOMContentLoaded', function() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Hello, World!';

    // Add a simple fade-in animation
    messageElement.style.opacity = '0';
    setTimeout(() => {
        messageElement.style.transition = 'opacity 1s ease-in';
        messageElement.style.opacity = '1';
    }, 100);
});
