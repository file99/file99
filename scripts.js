document.addEventListener('DOMContentLoaded', function() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const fountain = document.querySelector('.fountain');
    const audio = document.getElementById('fountain-sound');

    const startPositions = [
        { x: 189, y: 250 },  
        { x: 289, y: 205 },  
        { x: 500, y: 150 }   
    ];

    function initiateFlyMovement(fly, amplitude, period, startPosition, reverse = false) {
        const startTime = Date.now();
        const startX = startPosition.x;
        const startY = startPosition.y;
        let lastX = startX;
        let lastY = startY;

        fly.style.left = startX + 'px';
        fly.style.top = startY + 'px';
        fly.style.zIndex = '1000';

        function moveFly() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            
            // If reverse is true, invert the direction of movement
            let x = reverse
                ? startX - amplitude * Math.sin(elapsed / period)
                : startX + amplitude * Math.sin(elapsed / period);
            let y = reverse
                ? startY - amplitude * Math.cos(elapsed / period)
                : startY + amplitude * Math.cos(elapsed / period);

            x = Math.max(0, Math.min(viewportWidth - fly.offsetWidth, x));
            y = Math.max(0, Math.min(viewportHeight - fly.offsetHeight, y));

            const dx = x - lastX;
            const dy = y - lastY;
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            fly.style.transform = `translate(${x - fly.offsetWidth / 2}px, ${y - fly.offsetHeight / 2}px) rotate(${angle + 90}deg)`;

            lastX = x;
            lastY = y;

            requestAnimationFrame(moveFly);
        }

        moveFly();
    }

    const flies = document.querySelectorAll('.fly');

    if (flies.length >= 3) {
        flies.forEach((fly, index) => {
            const amplitude = Math.random() * 50 + 50; 
            const period = Math.random() * 1000 + 1000; 
            const startPosition = startPositions[index]; 

            // For the second bird (fly-2), make it fly in reverse
            if (index === 1) {
                initiateFlyMovement(fly, amplitude, period, startPosition, true); // Reverse movement for second bird
            } else {
                initiateFlyMovement(fly, amplitude, period, startPosition); // Normal movement for others
            }

            // Update click events based on the bird
            fly.addEventListener('click', function() {
                if (index === 0) {
                    // First bird: now opens Instagram
                    window.open("https://www.instagram.com/elifxplore/", "_blank");
                } else if (index === 1) {
                    // Second bird (Fliege.svg): now opens email client
                    window.location.href = "mailto:fileniles@gmail.com";
                } else if (index === 2) {
                    // Third bird: opens YouTube
                    window.open("https://www.youtube.com/@elifxplore", "_blank");
                }
            });
        });
    } else {
        console.error("Nicht genügend Vögel vorhanden! Erstelle mindestens 3 '.fly'-Elemente.");
    }

    fountain.addEventListener('click', function(event) {
        const note = document.createElement('span');

        if (audio.paused) {
            audio.play();
            note.textContent = '♪';
        } else {
            audio.pause();
            note.textContent = '〠';
        }

        note.style.position = 'absolute';
        note.style.left = `${event.pageX}px`;
        note.style.top = `${event.pageY}px`;
        note.style.fontSize = '48px';
        note.style.zIndex = '9999';
        note.style.pointerEvents = 'none';
        document.body.appendChild(note);

        setTimeout(() => {
            note.remove();
        }, 1000); 
    });

    for (let i = 0; i < 100; i++) {
        const grass = document.createElement('div');
        grass.classList.add('grass');
        grass.style.left = Math.random() * 100 + '%';
        grass.style.bottom = Math.random() * 100 + 'vh';
        grass.style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';
        grass.style.height = Math.random() * 30 + 10 + 'px';
        document.querySelector('.fountain-container').appendChild(grass);
    }
});
