function addFormHandlingToButton(button, listName) {
    button.addEventListener('click', () => {
        let form = document.forms[0],
                formData = new FormData(form),
                dataList = JSON.parse(localStorage[listName] || '[]'),
                item = {},
                dataListJson;

                item.id = dataList.length+1;

            for (let data of formData) {
                item[data[0]] = data[1] || 'N/A';
            }

            dataList.push(item);
            dataListJson = JSON.stringify(dataList);

            localStorage[listName] = dataListJson;
    });
}