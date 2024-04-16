const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Santa {
    constructor() {
        this.width = 150;
        this.height = 150;
        this.x = canvas.width / 2 - this.width / 2; //centriamo il personaggio orizzontalmente
        this.y = canvas.height - this.height - 200; //centriamo il personaggio verticalmente
        this.speed = 3;
        this.velocity = { x: 0, y: 0 }; //oggetto velocità la cambiamo durante il gioco
        this.images = [];
        this.currentFrame = 0;
        this.frameCount = 12; // Numero totale di frame per l'animazione
        this.frameRate = 7; // Velocità di cambio frame
        this.animationActive = false; // Flag per attivare/disattivare l'animazione
        this.loadImages();
    }

    loadImages() {
        for (let i = 0; i <= this.frameCount; i++) {
            let image = new Image();
            image.src = `run (${i}).png`; 
            this.images.push(image);
        }
    }

    update() {
        if (this.animationActive) {
            this.currentFrame += 1;
            if (this.currentFrame >= this.frameCount * this.frameRate) {
                this.currentFrame = 6;
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

        this.velocity.y += 0.5; // Gravità

        if (this.y + this.height > canvas.height - 200) {
            this.y = canvas.height - this.height - 200;
            this.velocity.y = 0;
        }
    }

    draw() {
        if (this.animationActive) {
            let frameIndex = Math.floor(this.currentFrame / this.frameRate);
            ctx.drawImage(this.images[frameIndex], this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.images[0], this.x, this.y, this.width, this.height);
        }
    }

    startAnimation() {
        this.animationActive = true;
    }

    stopAnimation() {
        this.animationActive = false;
        this.currentFrame = 0; // Resetta il frame corrente quando l'animazione viene disattivata
    }
}

const santa = new Santa();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    santa.update();
    santa.draw();

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        santa.velocity.x = -santa.speed;
        santa.startAnimation(); // Avvia l'animazione quando premi la freccia sinistra
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        santa.velocity.x = santa.speed;
        santa.startAnimation(); // Avvia l'animazione quando premi la freccia destra
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') {
        santa.velocity.x = 0;
        santa.stopAnimation(); // Disattiva l'animazione quando rilasci le frecce direzionali
    }
});
