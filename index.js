const body = document.getElementsByTagName('body')[0];

const banner = document.getElementsByClassName('banner')[0];

const container = document.getElementsByClassName('slider')[0];

const arr = [];

const quantity_before_new_loop = 10;

let top = 10;

let z_index = 27;

function updateZIndex(slider, index_z) {
    const computedStyle = window.getComputedStyle(slider);
    const matrix = new DOMMatrix(computedStyle.transform);
    const angle = Math.atan2(matrix.m32, matrix.m33) * (180 / Math.PI);

    if(angle >= 70 && angle <= 250) {
        // Calculate the swapped z-index
        const swappedIndex = 29 - index_z; // This formula will swap: 2↔27, 3↔26, 4↔25, etc.
        slider.style.zIndex = `${swappedIndex}`;
    } else {
        slider.style.zIndex = `${index_z}`;
    }
   
    requestAnimationFrame(() => updateZIndex(slider, index_z));
}

class _3d_tile {
    constructor(text, image, number_of_items, index) {
        this.tile = document.createElement('div');
        this.tile.classList.add('item');

        this.img = document.createElement('img');
        this.img.src = image;

        this.tile.style.setProperty('--position', index);

        this.tile.style.transform = `rotateY(calc( (${index} - 1) * (360 / ${number_of_items}) * 1deg))
        translateZ(550px) translateY(120px)`;

        this.tile.appendChild(this.img);
        container.appendChild(this.tile);
    }
}

class banner_step {
    constructor (text, image, number_of_items, index) {
        // this.banner = document.createElement('div');
        // this.banner.classList.add("banner");

        this.slider = document.createElement("div");
        this.slider.classList.add("slider");

        this.slider.style.setProperty('--quantity', 1);
        this.slider.style.top = top + '%';

        top += 10;

        if(z_index <= 3){
            z_index = 27
        };

        this.zIndex = z_index;
        this.slider.style.zIndex = `${this.zIndex}`;

        z_index--;

        this.item = document.createElement("div");
        this.item.classList.add("item");

        this.item.style.setProperty('--position', index);

        this.position = index;
        
        if(index > quantity_before_new_loop){
            this.position = (Math.floor(index / quantity_before_new_loop) + (index % quantity_before_new_loop)) - quantity_before_new_loop - 1;
        }

        this.item.style.transform = `rotateY(calc( (${this.position} - 1) * (360 / ${quantity_before_new_loop}) * 1deg))
        translateZ(550px) translateY(120px)`;

        this.image = document.createElement("img");
        this.image.classList.add("image");

        this.image.src = image;

        this.item.appendChild(this.image);
        this.slider.appendChild(this.item);
        banner.appendChild(this.slider);

        requestAnimationFrame(() => updateZIndex(this.slider, this.zIndex));
    }
}

const myVariable = await fetch('./data.json')
.then(response => response.json())
.then(data => {
    let number_of_items = Object.keys(data).length;

    container.style.setProperty('--number-of-items', number_of_items);

    Object.values(data).forEach((element, index) => {
        arr.push(new banner_step(element.text, element.img, number_of_items, index+1));
    });
})
.finally(console.log('done'));