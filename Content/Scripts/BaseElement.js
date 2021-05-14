class BaseElement {
    constructor({ type, container, types, caption, html, attributes, events, tooltip }) {
		this.element = document.createElement(type?.name || type);
		this.container = container;
		let containerElement = (container instanceof HTMLElement ? container : container?.element instanceof HTMLElement && container?.element);

		containerElement && containerElement.append(this.element);
		types && types.forEach(type => this[type.name.replace(type.name[0], type.name[0].toLowerCase())] = new type(this));
		typeof (caption) != 'undefined' && (this.element.innerText = caption);
		typeof (html) != 'undefined' && (this.element.innerHTML = html);
		attributes && Object.entries(attributes).forEach(attr => this.element.setAttribute(attr[0], attr[1]));
		events && Object.entries(events).forEach(event => this.element.addEventListener(event[0], event[1]));
		tooltip && this.createTooltip(tooltip);
	}
}