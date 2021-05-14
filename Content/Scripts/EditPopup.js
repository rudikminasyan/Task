class EditPopup extends BaseElement {
    constructor(item) {
        super({
            type: EditPopup
        });

        this.data = item.data;
        this.listName = item.listName;
        this.container = item.container;

        this.overlay = new BaseElement({
            type: 'overlay',
            container: document.body
        });

        this.overlay.element.append(this.element);

        this.form = new BaseElement({
            type: 'form',
            container: this
        });

        this.loadData()

        this.buttonBar = new BaseElement({
            type: 'ButtonBar',
            container: this.form
        });

        this.saveButton = new BaseElement({
            type: 'button',
            container: this.buttonBar,
            caption: 'save',
            attributes: {
                type: 'button'
            },
            events: {
                click: () => {
                    let formData = new FormData(this.form.element);

                    formData.append('id', this.data.id);
                    this.save(formData);
                }
            }
        });

        this.cancelButton = new BaseElement({
            type: 'button',
            container: this.buttonBar,
            caption: 'cancel',
            attributes: {
                type: 'button'
            },
            events: {
                click: () => this.close()
            }
        });
    }

    close() {
        this.element.remove();
        this.overlay.element.remove();

        this.type == 'book' ? loadBookData(this.container) : loadHobbyData(this.container);
    }

    loadData() {
        Object.entries(this.data).forEach(prop => {
            let infoContainer = new BaseElement({
                type: 'div',
                container: this.form,
                attributes: {
                    class: 'infoContainer'
                }

            });

            let nameContainer = new BaseElement({
                type: 'div',
                container: infoContainer,
                attributes: {
                    class: 'nameContainer'
                }
            });

            let valueContainer = new BaseElement({
                type: 'div',
                container: infoContainer,
                attributes: {
                    class: 'valueContainer'
                }
            });

            new BaseElement({
                type: 'label',
                container: nameContainer,
                caption: `${prop[0]}: `
            });

            new BaseElement(prop[0] == 'id' ?
                {
                    type: 'span',
                    container: valueContainer,
                    caption: prop[1]
                } :
                {
                    type: 'input',
                    container: valueContainer,
                    attributes: {
                        name: prop[0],
                        value: prop[1]
                    }
                });
        });
    }

    save(newData) {
        let newDataObj = {},
            dataList = JSON.parse(localStorage[this.listName]),
            dataListJson,
            itemIndex;

        for(let prop of newData) {
            newDataObj[prop[0]] = prop[1];
        }

        itemIndex = dataList.findIndex(item => item.id == this.data.id);
        dataList[itemIndex] = newDataObj;
        dataListJson = JSON.stringify(dataList);

        localStorage[this.listName] = dataListJson;

        this.close();
    }
}