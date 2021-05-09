export default class Layout {
  constructor() {
    this.html = `
    <div class="container">
    <div class="column">
        <div class="column__title">
            <span class="column__text">Todo</span>
            <span class="column__options">...</span>
        </div>
        <div class="column__content">
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Go for a walk</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Watch a movie</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
        </div>
        <div class="column__footer">+ Add another card</div>
    </div>
    <div class="column">
        <div class="column__title">
            <span class="column__text">In progress</span>
            <span class="column__options">...</span>
        </div>
        <div class="column__content">
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Learn JavaScript</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
        </div>
        <div class="column__footer">+ Add another card</div>
    </div>
    <div class="column">
        <div class="column__title">
            <span class="column__text">Done</span>
            <span class="column__options">...</span>
        </div>
        <div class="column__content">
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Work out</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Read a book</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Update CV</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
            <div class="item">
                <div class="item__title">
                    <span class='item__text'>Call a friend</span>
                    <div class='item__delete hidden'>✕</div>
                </div>
            </div>
        </div>
        <div class="column__footer">+ Add another card</div>
    </div>
</div>`;

    this.footer = `
    <div class="column__footer">+ Add another card</div>`;

    this.item = `
    <div class="item">
        <div class="item__title">
            <span class='item__text'>New task</span>
            <div class='item__delete hidden'>✕</div>
        </div>
    </div>`;

    this.addTask = `
    <div class='add-task'>
        <textarea class='add-task__text' placeholder='Write a title for this task...' required></textarea>
        <div class='add-task__controls'>
            <button class='add-task__btn'>Add Card</button>
            <div class='add-task__cancel'>✕</div>
        </div>
    </div>`;
  }
}
