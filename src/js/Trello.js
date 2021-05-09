import { loadFromStorage, saveToStorage } from './Storage';
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
export default class Trello {
  constructor(layout) {
    this.layout = layout;
    this.item = this.parserHTML(this.layout.item).querySelector('.item');
    this.currentItem = null;
    this.footer = this.parserHTML(this.layout.footer).querySelector('.column__footer');
  }

  parserHTML(string) {
    return new DOMParser().parseFromString(string, 'text/html');
  }

  init() {
    const state = loadFromStorage();
    if (state) {
      document.body.innerHTML = state;
    } else {
      document.body.innerHTML = this.layout.html;
    }
    this.container = document.querySelector('.container');
    this.container.addEventListener('click', (e) => this.onAddTask(e));
    this.container.addEventListener('mouseover', (e) => this.onMouseOver(e));
    this.container.addEventListener('mouseout', (e) => this.onMouseOut(e));
    this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.container.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  onAddTask(e) {
    if (e.target.classList.contains('column__footer')) {
      this.column = e.target.closest('.column');
      e.target.remove();
      this.column.innerHTML += this.layout.addTask;
      const task = this.column.querySelector('.add-task');
      const content = this.column.querySelector('.column__content');
      const taskText = task.querySelector('.add-task__text');
      const addBtn = task.querySelector('.add-task__btn');
      const cancelBtn = task.querySelector('.add-task__cancel');

      addBtn.addEventListener('click', () => {
        const title = taskText.value;
        task.remove();
        content.insertAdjacentElement('afterbegin', this.item.cloneNode(true));
        content.querySelector('.item__text').textContent = title;
        content.insertAdjacentElement('afterend', this.footer.cloneNode(true));
        saveToStorage();
      });

      cancelBtn.addEventListener('click', () => {
        task.remove();
        content.insertAdjacentElement('afterend', this.footer.cloneNode(true));
      });
    }
  }

  onMouseOver(e) {
    const item = e.target.closest('.item');
    if (item && item.querySelector('.item__delete').classList.contains('hidden')) {
      item.querySelector('.item__delete').classList.remove('hidden');
    }
  }

  onMouseOut(e) {
    const item = e.target.closest('.item');
    if (item && !item.querySelector('.item__delete').classList.contains('hidden')) {
      item.querySelector('.item__delete').classList.add('hidden');
    }
  }

  onMouseDown(e) {
    if (e.target.classList.contains('add-task__text')) {
      return;
    }
    if (e.target.classList.contains('column__footer')) {
      this.container.addEventListener('click', (event) => this.onDeleteTask(event));
      return;
    }
    if (e.target.classList.contains('item__delete')) {
      e.target.closest('.item').remove();
      saveToStorage();
      return;
    }
    e.preventDefault();
    this.currentItem = e.target.closest('.item');
    if (this.currentItem) {
      this.currentItem.classList.add('dragged');
      this.currentItem = e.target.closest('.dragged');
      this.container.addEventListener('mousemove', this.drag);
      this.container.addEventListener('mouseup', this.dragEnd);
      [...document.querySelectorAll('.column')].forEach((item) => {
        item.addEventListener('mouseup', this.itemDragEnd);
      });
    }
  }

  onMouseUp(e) {
    e.preventDefault();
  }

  onDeleteTask(e) {
    if (e.target.classList.contains('item__delete')) {
      e.target.closest('.item').remove();
      saveToStorage();
    }
  }

  drag(e) {
    this.currentItem = document.querySelector('.dragged');
    if (this.currentItem === null) return false;
    this.currentItem.style.position = 'absolute';
    this.currentItem.style.left = `${e.clientX - 20}px`;
    this.currentItem.style.top = `${e.clientY - 20}px`;
  }

  dragEnd() {
    if (this.querySelector('.dragged') === null) return false;
    this.querySelector('.dragged').classList.remove('dragged');
    this.removeEventListener('mousemove', () => this.drag);
    this.removeEventListener('mouseup', () => this.dragEnd);
    saveToStorage();
  }

  itemDragEnd(e) {
    const draggedItem = document.querySelector('.dragged');
    if (draggedItem === null) {
      return;
    }
    const content = this.querySelector('.column__content');
    if (content.querySelector('.item') === null) {
      content.append(draggedItem);
    } else {
      content.insertBefore(draggedItem, e.target.closest('.item'));
    }
    draggedItem.style = '';
    saveToStorage();
  }
}
