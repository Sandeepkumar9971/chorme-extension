console.log('This is a popup!');

function handleClick() {
    alert('hello');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('statusButton').addEventListener('click', handleClick);
});