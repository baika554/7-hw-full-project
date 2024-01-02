window.addEventListener('load', () => {
    setTimeout(() => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
        document.querySelector('.modal_close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }, 10000);
});

//

let modalShown = false; 
function showModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  modalShown = true; 
}

function hideModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

window.addEventListener('scroll', function() {
  if (!modalShown && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    showModal();
  }
});
