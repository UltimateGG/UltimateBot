document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('#searchCmd');

    const commands = document.querySelectorAll('.row .col-md-12 h3');

    searchBar.addEventListener('input', (e) => {
        let query = searchBar.value;

        commands.forEach((command, index) => {
            //console.log('if '+command.textContent.toLowerCase()+' includes '+query.toLowerCase());
            if (command.textContent.toLowerCase().includes(query.toString().toLowerCase())) {

                if (!commands[index].parentElement.parentElement.classList.contains('nosearch')) {
                    commands[index].parentElement.parentElement.style.display = '';
                }
            } else {
                if (!commands[index].parentElement.parentElement.classList.contains('nosearch')) {
                    commands[index].parentElement.parentElement.style.display = 'none';
                }
            }
        });
    });
});