import { view } from './view.js';
import { model } from './model.js';

/* Some global listeners and handlers. */
function generalController() {
    view.all.forEach((btn) => {
        btn.style['user-select'] = 'none';
    });
}

/* Change button color when pressed. */
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

/* Bind listener and handler to number button. */
function numberController() {
    view.nums.forEach((num) => {
        num.addEventListener('click', () => {
            model.input(num.dataset.value);
            show();
            /* allow user to clear current input */
            view.clear.dataset['state'] = 'C';
            view.clear.innerHTML = 'C';
        }, false);
    });
}

/* Bind event listener and handler to '+*-/' operator. */
function operatorController() {
    view.ops.forEach((op) => {
        op.addEventListener('click', () => {
            model.operator(op.dataset.value);
            show();
            /* user don't need to clear operator input */
            view.clear.dataset['state'] = 'AC';
            view.clear.innerHTML = 'AC';
        }, false);
    });
}

/* Bind listener and handler to '=' button. */
function equalController() {
    view.equal.addEventListener('click', () => {
        model.equal();
        show();
        /* User can clear the output result from the screen. But not the data in the model. */
        view.clear.dataset['state'] = 'C';
        view.clear.innerHTML = 'C';
    }, false);
}

/* Bind listener and handler to 'C' button */
function clearController() {
    view.clear.addEventListener('click', () => {
        const state = view.clear.dataset['state'];
        if (view.clear.dataset['state'] === 'C') {
            model.c();
            show();
            view.clear.dataset['state'] = 'AC';
            view.clear.innerHTML = 'AC';
        } else { // state === AC
            model.ac();
            show();
        }
    });
}

/* Print the data on the screen. */
function show() {
    view.screen.innerHTML = (model.show())? model.show().join('') : 'Not a number';
}

/* A collection of all tasks. */
function init() {
    generalController();
    btnColorController();
    numberController();
    operatorController();
    equalController();
    clearController();
    show();
}

/* Start everything. */
init();