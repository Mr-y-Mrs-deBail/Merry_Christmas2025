document.addEventListener('DOMContentLoaded', () => {
    const songTitleElement = document.getElementById('song-title');
    const nightOverlay = document.getElementById('night-overlay');
    const letterContainers = document.querySelectorAll('.clickable-letter');
    const initialText = document.getElementById('initial-text');
    const sequence2 = document.getElementById('sequence-2');
    const sequence3 = document.getElementById('sequence-3');
    const callToAction = document.getElementById('call-to-action');
    const songName = document.getElementById('song-name');
    const finalGreeting = document.getElementById('final-greeting');
    
    const audio1 = new Audio('music/music-1.mp3'); 
    const audio2 = new Audio('music/music-2.mp3'); 

    let currentAudio = audio1;
    let isPlaying = false;
    let magicActivated = false;
    const TIME_1 = 6000;
    const TIME_2 = 17000;
    const TIME_3 = 29000;
    const FINAL_TEXT_TIMEOUT = 20000;
    let timer1, timer2, timer3;
    let finalGreetingTimeout;

    function activateChristmasMagic() {
        if (magicActivated) return;
        
        if (nightOverlay) {
            nightOverlay.style.opacity = '0';
            setTimeout(() => {
                nightOverlay.style.display = 'none';
                nightOverlay.style.pointerEvents = 'none';
            }, 1500); 
        }

        currentAudio = audio1;
        currentAudio.play();
        isPlaying = true;
        magicActivated = true;
        
        enableLetters();

        finalGreetingTimeout = setTimeout(() => {
            songName.style.opacity = '0';
            finalGreeting.style.opacity = '0';

            setTimeout(() => {
                songName.classList.add('d-none');
                finalGreeting.classList.add('d-none');
            }, 1000);
        }, FINAL_TEXT_TIMEOUT);
    }
    
    function resetDecorationsToStatic() {
        keepLettersClickable();
    }
    
    audio1.addEventListener('ended', () => {
        currentAudio = audio2;
        currentAudio.play();
        isPlaying = true;
    });

    audio2.addEventListener('ended', () => {
        if (finalGreetingTimeout) {
            clearTimeout(finalGreetingTimeout);
            songName.style.opacity = '0';
            finalGreeting.style.opacity = '0';
            setTimeout(() => {
                songName.classList.add('d-none');
                finalGreeting.classList.add('d-none');
            }, 1000);
        }

        if (magicActivated) {
            keepLettersClickable();
        }
    });

    function enableLetters() {
        if (!magicActivated) return; 
        letterContainers.forEach(letter => {
            letter.classList.add('enabled');
            letter.setAttribute('aria-disabled', 'false');
            letter.removeEventListener('click', openLetter);
            letter.addEventListener('click', openLetter);
        });
    }

    function disableLetters() {
        letterContainers.forEach(letter => {
            letter.classList.remove('enabled');
            letter.setAttribute('aria-disabled', 'true');
            letter.removeEventListener('click', openLetter);
            letter.addEventListener('click', openLetter);
        });
    }

    function keepLettersClickable() {
          letterContainers.forEach(letter => {
            letter.setAttribute('aria-disabled', 'false');
            letter.removeEventListener('click', openLetter);
            letter.addEventListener('click', openLetter);
        });
    }
        
    function startTextSequence() {
          initialText.classList.remove('d-none');

          timer1 = setTimeout(() => {
              if (!magicActivated) {
                  initialText.classList.add('d-none');
                  sequence2.classList.remove('d-none');
              }
          }, TIME_1);

          timer2 = setTimeout(() => {
              if (!magicActivated) {
                  sequence2.classList.add('d-none');
                  sequence3.classList.remove('d-none');
              }
          }, TIME_2);

          timer3 = setTimeout(() => {
              if (!magicActivated) {
                  sequence3.classList.add('d-none');
                  callToAction.classList.remove('d-none');
                  callToAction.classList.add('blinking');

                  document.body.style.cursor = 'pointer';
                  document.addEventListener('click', handleMagicClick);
              }
          }, TIME_3);
    }

    function handleMagicClick() {
        if (magicActivated || callToAction.classList.contains('d-none')) {
            return;
        }

        initialText.classList.add('d-none');
        sequence2.classList.add('d-none');
        sequence3.classList.add('d-none');
        callToAction.classList.add('d-none');
        callToAction.classList.remove('blinking');

        songName.classList.remove('d-none');
        finalGreeting.classList.remove('d-none');
        songName.style.opacity = '1';
        finalGreeting.style.opacity = '1';

        activateChristmasMagic(); 

        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);

        document.body.style.cursor = 'default';
        songTitleElement.style.cursor = 'default';
        songTitleElement.removeAttribute('role');
        document.removeEventListener('click', handleMagicClick);
    }
    
    function openLetter(event) {
        if (!magicActivated) return; 

        const letterElement = event.currentTarget;
        const letterType = letterElement.dataset.letter;
        let title, htmlContent;
        let customSwalClass = 'swal-cute-christmas'; 

        letterElement.classList.add('open-state');

        let wasPlayingBeforeOpen = isPlaying;
        if (wasPlayingBeforeOpen) {
            currentAudio.pause();
            isPlaying = false;
        }

        if (letterType === 'left') {
            title = '';

            htmlContent = `
            <div style="
                 max-width: 90vw;
                 max-height: 70vh;
                 overflow-y: auto; 
                 margin: 0px auto; 
                 padding: 5px 10px 5px 10px; 
                 line-height: 1; 
                 font-family: 'Gochi Hand', cursive; 
                 color: #333;
                 text-align: left;
                 font-size: 0.9rem; 
            ">
            
            <p style="text-align: right; margin-bottom: 25px; font-style: italic; font-size: 0.8rem;">
                 25 de Diciembre de 2025
            </p>
            
            <p style="margin-bottom: 20px; font-weight: bold; font-size: 1rem;">
                 Mi Querido Súper Esposo,
            </p>
            
            <p style="text-align: justify; margin-bottom: 15px; text-indent: 5ch;">
                 En esta noche mágica, recuerda que mi corazón te busca siempre en cada estrella que parpadea. Aunque la distancia nos separe, quiero que sepas que cada latido de mi corazón lleva tu nombre, y cada milisegundo mi alma viaja hasta donde estás tú. 
            </p>

            <p style="text-align: justify; margin-bottom: 15px; text-indent: 5ch;">
                 Te amoOOOoo contando todas las luces navideñas, todas las estrellas, árboles y mucho más, no olvides multiplicarlo por el infinito cuando termines amor.
            </p>
            
            <p style="text-align: justify; margin-bottom: 25px; text-indent: 5ch;">
                 Gracias por ser la luz que ilumina mi vida, el que con solo una sonrisa convierte un frío diciembre en la más hermosa de las primaveras.
            </p>
            
            <p style="text-align: right; margin-top: 20px; font-size: 0.95rem;">
                 Con todo mi amor,
            </p>
            <p style="text-align: right; font-style: italic; font-weight: bold; font-size: 1.1rem; margin-top: 2px;">
                Tu Reyna
            </p>
            </div>
            `;
            customSwalClass = 'swal-cute-christmas';
        } else if (letterType === 'right') {
            title = 'Sabías Que...';

            htmlContent = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <p id="dynamic-text-placeholder" style="font-size: 1.4rem; font-weight: bold; height: 30px; margin-top: 15px; color: #1a4d3a; opacity: 0; transition: opacity 0.3s ease-in-out;"></p>
                    
                    <div id="video-placeholder" style="margin-top: 25px;"></div>
                </div>
            `;
        }

        Swal.fire({
            title: title,
            html: htmlContent,
            showConfirmButton: false,
            showCancelButton: false,
            customClass: {
                popup: customSwalClass, 
            },
            width: letterType === 'left' ? '85vw' : 500,
            didOpen: (modalElement) => {
                if (letterType === 'right') {
                    const dynamicTextElement = modalElement.querySelector('#dynamic-text-placeholder');
                    const videoPlaceholder = modalElement.querySelector('#video-placeholder');

                    const textSequence = [
                        'Te pienso',
                        'Te necesito',
                        'Te extraño',
                        'Te Adoro',
                        'Te amoOO❤️',
                        'Gracias por ser mi TODO',
                        'Aunque estemos lejitos uno del otro, podemos estar juntos en nuestros sueños y pensamientos!' 
                    ];

                    let step = 0;
                    const interval = 1500;

                    function showNextText() {
                        if (step < textSequence.length) {
                            const currentText = textSequence[step];

                            dynamicTextElement.style.opacity = '0';
                            
                            setTimeout(() => {
                                if (currentText === 'Aunque estemos lejitos uno del otro, podemos estar juntos en nuestros sueños y pensamientos!') {
                                    const imageHTML = `<img src="img/osito.gif" alt="MV" style="width: 25px; height: 25px; vertical-align: middle; margin-left: 8px;">`;
                                    dynamicTextElement.innerHTML = `Aunque estemos lejitos uno del otro, podemos estar juntos en nuestros sueños y pensamientos!${imageHTML}`;

                                } else {
                                    dynamicTextElement.textContent = currentText;
                                }
                                
                                dynamicTextElement.style.opacity = '1';
                                step++;

                                if (step < textSequence.length) {
                                    setTimeout(showNextText, interval);
                                } else {
                                    const videoHTML = `
                                         <video id="letter-video" width="250" controls autoplay muted playsinline loop style="border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); background: black; margin-top: 50px;">
                                             <source src="video/video1.mp4" type="video/mp4">
                                             Ups hay un pequeño problema.
                                         </video>
                                     `;
                                    videoPlaceholder.innerHTML = videoHTML;

                                    const videoElement = document.getElementById('letter-video');
                                    if(videoElement) {
                                        videoElement.play().catch(error => {
                                            console.warn('Autoplay bloqueado.');
                                        });
                                    }
                                }
                            }, 300);
                        }
                    }
                    showNextText();
                }
            },
            
        }).then(() => {
            letterElement.classList.remove('open-state');

            if (wasPlayingBeforeOpen) {
                currentAudio.play();
                isPlaying = true;
                
                enableLetters();
            } else if (magicActivated) {
                keepLettersClickable();
            }
        });
    }

    window.addEventListener('load', () => {
        
        startTextSequence();
        if (!magicActivated) {
            disableLetters();
        }
    });
});