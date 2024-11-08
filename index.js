const body = document.getElementsByTagName('body')[0];

const container = document.getElementsByClassName('slider')[0];

const arr = [];

let top = 0;

class _3d_tile {
    constructor(text, image, number_of_items, index) {
        this.tile = document.createElement('div');
        this.tile.classList.add('item');

        this.img = document.createElement('img');
        this.img.src = image;

        this.tile.style.setProperty('--position', index);

        this.tile.appendChild(this.img);
        container.appendChild(this.tile);
    }
}

const myVariable = await fetch('./data.json')
.then(response => response.json())
.then(data => {
    let number_of_items = Object.keys(data).length;

    container.style.setProperty('--number-of-items', number_of_items);

    Object.values(data).forEach((element, index) => {
        arr.push(new _3d_tile(element.text, element.img, number_of_items, index+1));
    });
})
.finally(console.log('done'));