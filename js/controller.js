import { btns } from './view.js';
import { model } from './model.js';

function generalController() {
    btns.all.forEach((btn) => {
        btn.style['user-select'] = 'none';
    });
}

function btnColorController() {
    btns.all.forEach((btn) => {
        btn.color = btn.style['background-color'];
    });
    btns.all.forEach((btn) => {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('pressed');
        }, false);
    });
    document.addEventListener('mouseup', (e) => {
        btns.all.forEach((btn) => {
            btn.classList.remove('pressed');
        });
        e.stopPropagation();
    }, true);
}

function numberController() {
    btns.nums.forEach((num) => {
        num.addEventListener('click', () => {
            model.input(num.dataset.value);
            show(model.current());
        }, false);
    });
}

function operatorController() {
    btns.ops.forEach((op) => {
        op.addEventListener('click', () => {
            model.operator(op.dataset.value);
            show(model.result());
        }, false);
    });
}

function equalController() {
    btns.equal.addEventListener('click', () => {
        model.equal();
        show(model.result());
    }, false);
}

function show(target) {
    btns.screen.innerHTML = target.join('');
}

function init() {
    generalController();
    btnColorController();
    numberController();
    operatorController();
    equalController();
}

init();




