/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
        buyButtonSelector: '.buy-btn'
    },
    goods: [],
    countEl: null,
    priceEl: null,

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init(settings = {}) {
        Object.assign(this.settings, settings);
        buttons = document
            .querySelectorAll(this.settings.buyButtonSelector);
        for (const button of buttons) {
            button.addEventListener('click', event => this.eventClickHandler(event));
        }
    },
/*
* реагирует событие и инициирует добавление стоимости и названия продукта в общий массив goods
* @param event - событие по которому мы сможем получить данные.
 */
    eventClickHandler(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        this.add(event.target.dataset.name, event.target.dataset.price);
        this.render();
    },
    /**
     * Отображает количество всех товаров и их цену.
     */
    render() {
        this.getGoodsPrice();
        document.querySelector(this.settings.priceSelector).innerHTML = this.priceEl;
        document.querySelector(this.settings.countSelector).innerHTML = this.countEl;
    },

    /**
     * Считает и возвращает цену всех купленных товаров из массива this.goods и записывает в countEl и priceEl
     */
    getGoodsPrice() {
        this.countEl = this.goods.length;
        this.priceEl = this.goods.reduce((a, b) => a + parseInt(b.goodPrice), 0);
    },

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
     * @param goodName Название товара.
     * @param goodPrice Цена товара.
     */
    add(goodName, goodPrice) {
        this.goods.push({goodName: goodName, goodPrice: goodPrice});
    },
};

window.onload = () => basket.init();