export const view = {
    /* original css class */
    'all': document.querySelectorAll('.btn'),
    'nums': document.querySelectorAll('.num'),
    'ops': document.querySelectorAll('.op'),
    'screen': document.querySelector('.screen'),
    'dot': document.querySelector('.dot'),
    'c': document.querySelector('.clear'),
    'neg': document.querySelector('.negative'),
    'per': document.querySelector('.percentage'),
    'equal': document.querySelector('.equal'),

    /* local groups */
    'gray': document.querySelectorAll('.num, .dot'),
    'orange': document.querySelectorAll('.op, .equal'),
    'lightGray': document.querySelectorAll('.clear, .negative, .percentage')
};