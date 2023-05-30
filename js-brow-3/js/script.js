// Obtener elementos del DOM
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const section = document.getElementById('data-section');

// Manejar el evento de enviar el formulario
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener valores de los inputs
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name !== '' && email !== '') {
    // Crear objeto con los datos ingresados
    const data = {
      name: name,
      email: email
    };

    // Obtener datos existentes en localStorage (si hay alguno)
    let existingData = localStorage.getItem('userData');
    existingData = existingData ? JSON.parse(existingData) : [];

    // Agregar el nuevo dato al arreglo
    existingData.push(data);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('userData', JSON.stringify(existingData));

    // Limpiar los inputs
    nameInput.value = '';
    emailInput.value = '';

    // Mostrar los datos en la sección
    showData();
  }
});

// Función para mostrar los datos guardados en localStorage
function showData() {
  // Limpiar el contenido anterior de la sección
  section.innerHTML = '';

  // Obtener los datos de localStorage
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    const dataArr = JSON.parse(storedData);

    // Mostrar cada dato en la sección
    dataArr.forEach(function(data) {
      const dataItem = document.createElement('div');
      dataItem.className = 'data-item';

      const namePara = document.createElement('p');
      namePara.textContent = 'Nombre: ' + data.name;

      const emailPara = document.createElement('p');
      emailPara.textContent = 'Email: ' + data.email;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', function() {
        deleteData(data);
      });

      dataItem.appendChild(namePara);
      dataItem.appendChild(emailPara);
      dataItem.appendChild(deleteButton);

      section.appendChild(dataItem);
    });
  } else {
    // Mostrar mensaje si no hay datos guardados
    const noDataPara = document.createElement('p');
    noDataPara.textContent = 'No hay datos guardados';

    section.appendChild(noDataPara);
  }
}

// Función para eliminar un dato de localStorage
function deleteData(data) {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    const dataArr = JSON.parse(storedData);

    // Encontrar el índice del dato a eliminar
    const index = dataArr.findIndex(function(item) {
      return item.name === data.name && item.email === data.email;
    });

    // Eliminar el dato del arreglo
    if (index !== -1) {
      dataArr.splice(index, 1);

      // Actualizar el arreglo en localStorage
      localStorage.setItem('userData', JSON.stringify(dataArr));

      // Mostrar los datos actualizados en la sección
      showData();
    }
  }
}

// Mostrar los datos en la sección al cargar la página
showData();
