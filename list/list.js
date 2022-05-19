import {
    checkAuth,
    createItem,
    getListItems,
    buyItem,
    logout,
    deleteAllItems,
} from '../fetch-utils.js';

const form = document.querySelector('.item-form');
const removeBtn = document.querySelector('.remove');
const listEl = document.querySelector('.list');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

removeBtn.addEventListener('click', async () => {
    await deleteAllItems();
    await fetchAndDisplayList();
});

window.addEventListener('submit', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const qty = data.get('qty');

    await createItem(name, qty);
    form.reset();
    await fetchAndDisplayList();
});
async function fetchAndDisplayList() {
    const list = await getListItems();
    listEl.textContent = '';
    for (let name of list) {
        const listItemEl = document.createElement('p');
        listItemEl.classList.add('list-name');
        listItemEl.textContent = `${name.qty} ${name.name}`;

        if (name.bought) {
            listItemEl.classList.add('bought');
        } else {
            
            listItemEl.classList.add('not-bought');
            listItemEl.addEventListener('click', async () => {
                await buyItem(name.id);
                fetchAndDisplayList();
            });
            listEl.append(listItemEl);
        }
    }
}
