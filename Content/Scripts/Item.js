class Item extends BaseElement {
    constructor(container, data, type) {
        super({
            type: Item,
            container: container
        });

        this.data = data;
        this.type = type;
        this.listName = this.type == 'book' ? 'bookList' : 'hobbyList';

        Object.entries(data).forEach(prop => {
            let infoContainer = new BaseElement({
                type: 'div',
                container: this,
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
                type: 'b',
                container: nameContainer,
                caption: `${prop[0]}: `
            });

            new BaseElement({
                type: 'span',
                container: valueContainer,
                caption: prop[1]
            });
        });

        this.buttonBar = new BaseElement({
            type: 'ButtonBar',
            container: this
        });

        this.editButton = new BaseElement({
            type: 'editButton',
            container: this.buttonBar,
            caption: 'edit',
            events: {
                click: () => new EditPopup(this)
            }
        });

        this.deleteButton = new BaseElement({
            type: 'deleteButton',
            container: this.buttonBar,
            caption: 'delete',
            events: {
                click: () => this.deleteItem()
            }
        });
    }

    deleteItem() {
        this.list = JSON.parse(localStorage[this.listName]);
        this.list = this.list.filter(item => item.id != this.data.id);

        let newListJson = JSON.stringify(this.list);

        localStorage[this.listName] = newListJson;

        this.type == 'book' ? loadBookData(this.container) : loadHobbyData(this.container);
    }
}