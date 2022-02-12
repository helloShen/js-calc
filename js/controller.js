import { view } from './view.js';
import { model } from './model.js';

/* some global listeners and handlers */
function generalController() {
    view.all.forEach((btn) => {
        btn.style['user-select'] = 'none';
    });
}

/* change button color when pressed */
function btnColorController() {
    view.all.forEach((btn) => {
        btn.color = btn.style['background-color'];
    });
    view.all.forEach((btn) => {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('pressed');
        }, false);
    });
    document.addEventListener('mouseup', (e) => {
        view.all.forEach((btn) => {
            btn.classList.remove('pressed');
        });
        e.stopPropagation();
    }, true);
}

/* bind listener and handler to number button */
function numberController() {
    view.nums.forEach((num) => {
        num.addEventListener('click', () => {
            model.input(num.dataset.value);
            show();
        }, false);
    });
}

/* bind event listener and handler to '+*-/' operator */
function operatorController() {
    view.ops.forEach((op) => {
        op.addEventListener('click', () => {
            model.operator(op.dataset.value);
            show();
        }, false);
    });
}

/* bind listener and handler to '=' button */
function equalController() {
    view.equal.addEventListener('click', () => {
        model.equal();
        show();
    }, false);
}

/* print the data on the screen */
function show() {
    view.screen.innerHTML = model.show().join('');
}

/* a collection of all tasks */
function init() {
    generalController();
    btnColorController();
    numberController();
    operatorController();
    equalController();
    show();
}

/* start everything */
init();



