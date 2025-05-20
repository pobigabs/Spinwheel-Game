let items = [
];


function updateWheel() {
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    box1.innerHTML = '';
    box2.innerHTML = '';

    items.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = 'font span' + ((index % 5) + 1); // Cycle through span classes
        span.innerHTML = `<h5>${item}</h5>`;
        if (index < items.length / 2) {
            box1.appendChild(span);
        } else {
            box2.appendChild(span);
        }
    });
}

function addItem() {
    const newItem = document.getElementById('newItem').value.trim();
    if (newItem) {
        items.push(newItem);
        updateWheel();
        document.getElementById('newItem').value = '';
    }
}

function clearItems() {
    items = [];
    updateWheel();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function spin() {
    const wheelAudio = document.getElementById('wheel');
    const applauseAudio = document.getElementById('applause');
    wheelAudio.play();

    const box = document.getElementById("box");
    const element = document.getElementById("mainbox");

    let results = shuffle([...Array(items.length).keys()]);
    const selectedItemIndex = results[0];
    const selectedItem = items[selectedItemIndex];

    const degreePerItem = 360 / items.length;
    const rotation = 3600 + (degreePerItem * selectedItemIndex) + (degreePerItem / 2);

    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = `rotate(${rotation}deg)`;
    element.classList.remove("animate");

    setTimeout(function () {
        element.classList.add("animate");
    }, 5000);

    setTimeout(function () {
        applauseAudio.play();
        Swal.fire({
            title: "Hurraay.......!",
            html: 'You Won ' + selectedItem + ' | ' + '<a href="#">Claim Now</a>',
            imageUrl: "./assets/wheel.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image"
        });
    }, 5500);

    setTimeout(function () {
        box.style.setProperty("transition", "initial");
        box.style.transform = "rotate(90deg)";
    }, 9000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateWheel();
    document.getElementById('newItem').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
});
