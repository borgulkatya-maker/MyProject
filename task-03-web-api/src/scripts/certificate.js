const certificates = [];


const createCertificateResult = (certificate) => {

  const container = document.createElement('div');
  container.className = 'certificate-result__content';


  const successMessage = document.createElement('p');
  successMessage.className = 'certificate-result__success';
  successMessage.textContent = 'Сертификат успешно оформлен!';


  const amount = document.createElement('p');
  amount.className = 'certificate-result__item';
  amount.textContent =
    `Сумма: ${certificate.amount} ₽`;


  const recipient = document.createElement('p');
  recipient.className = 'certificate-result__item';
  recipient.textContent =
    `Получатель: ${certificate.recipient}`;


  const contact = document.createElement('p');
  contact.className = 'certificate-result__item';
  contact.textContent =
    `Контакт: ${certificate.contact}`;


  const sendDate = document.createElement('p');
  sendDate.className = 'certificate-result__item';
  sendDate.textContent =
    `Дата отправки: ${certificate.sendDate}`;


  const sendTime = document.createElement('p');
  sendTime.className = 'certificate-result__item';
  sendTime.textContent =
    `Время отправки: ${certificate.sendTime}`;


  container.append(
    successMessage,
    amount,
    recipient,
    contact,
    sendDate,
    sendTime
  );


  return container;
};


const handleCertificateSubmit = (event) => {

  event.preventDefault();


  const form = event.target;


  const amount =
    Number(form.elements.amount.value);

  const recipient =
    form.elements.recipient.value.trim();

  const contact =
    form.elements.contact.value.trim();

  const sendDate =
    form.elements.sendDate.value;

  const sendTime =
    form.elements.sendTime.value;


  if (
    !amount ||
    !recipient ||
    !contact ||
    !sendDate ||
    !sendTime
  ) {
    return;
  }


  const certificate = {
    id: Date.now(),
    amount,
    recipient,
    contact,
    sendDate,
    sendTime
  };


  certificates.push(certificate);


  const result =
    document.getElementById('certificate-result');


  const oldContent =
    result.querySelector(
      '.certificate-result__content'
    );


  const placeholder =
    result.querySelector(
      '.certificate-result__placeholder'
    );


  if (oldContent) {
    oldContent.remove();
  }


  if (placeholder) {
    placeholder.remove();
  }


  const certificateElement =
    createCertificateResult(certificate);


  result.appendChild(certificateElement);


  form.reset();
};


document.addEventListener(
  'DOMContentLoaded',
  () => {

    const form =
      document.getElementById(
        'certificate-form'
      );


    if (!form) {
      return;
    }


    form.addEventListener(
      'submit',
      handleCertificateSubmit
    );

  }
);
