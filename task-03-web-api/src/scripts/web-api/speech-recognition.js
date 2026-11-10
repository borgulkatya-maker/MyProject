export const initSpeechRecognition = (
  trigger,
  target,
  onResult
) => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    trigger.addEventListener('click', () => {
      alert(
        'Ваш браузер не поддерживает голосовой поиск'
      );
    });

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'ru-RU';


  const setIdleState = () => {
    trigger.disabled = false;
    trigger.classList.remove('recording');
  };


  trigger.addEventListener('click', () => {
    try {
      recognition.start();

      trigger.disabled = true;
      trigger.classList.add('recording');
    } catch (error) {
      console.error(
        'Не удалось запустить голосовой поиск:',
        error
      );

      setIdleState();
    }
  });


  recognition.addEventListener(
    'result',
    (event) => {
      const transcript =
        event.results[0][0].transcript;

      target.value = transcript;

      if (onResult) {
        onResult(transcript);
      }

      setIdleState();
    }
  );


  recognition.addEventListener(
    'error',
    (event) => {
      console.error(
        'SpeechRecognition error:',
        event.error
      );

      if (event.error === 'not-allowed') {
        alert(
          'Нет доступа к микрофону. Разрешите доступ в настройках браузера.'
        );
      } else if (
        event.error === 'no-speech'
      ) {
        alert(
          'Речь не распознана. Попробуйте ещё раз.'
        );
      } else {
        alert(
          'Не удалось выполнить голосовой поиск.'
        );
      }

      setIdleState();
    }
  );


  recognition.addEventListener(
    'end',
    () => {
      setIdleState();
    }
  );
};