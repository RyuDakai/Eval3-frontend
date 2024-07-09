document.getElementById('formularioCalorias').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const tiempo = parseFloat(document.getElementById('tiempo').value);
    const actividad = document.querySelector('input[name="actividad"]:checked').value;
    const contenedorResultado = document.getElementById('contenedorResultado');

    if (peso < 1 || peso > 120 || tiempo < 5 || tiempo > 150) {
        contenedorResultado.innerHTML = `<div class="alert alert-warning" role="alert">Asegúrate de que el peso está entre 1 y 120 kg y el tiempo entre 5 y 150 minutos.</div>`;
        contenedorResultado.style.display = 'block';
        return;
    }

    const MET = actividad === 'caminar' ? 3.5 : 8.0;
    const calorias = MET * 3.5 * peso * (tiempo / 200);
    const actividadPasado = actividad === 'caminar' ? 'caminó' : 'corrió'; // Cambio para usar el tiempo pasado
    contenedorResultado.innerHTML = `<div class="alert alert-info" role="alert">Has quemado aproximadamente ${calorias.toFixed(2)} calorías.</div>`;
    contenedorResultado.style.display = 'block';

    guardarCalculo(peso, tiempo, actividadPasado, calorias);
});

function guardarCalculo(peso, tiempo, actividad, calorias) {
    let calculos = JSON.parse(localStorage.getItem('calculos')) || [];
    calculos.push({ peso, tiempo, actividad, calorias, fecha: new Date().toLocaleString() });
    localStorage.setItem('calculos', JSON.stringify(calculos));
    mostrarCalculos();
}

function mostrarCalculos() {
    const calculos = JSON.parse(localStorage.getItem('calculos')) || [];
    const contenedorLista = document.getElementById('listaCalculos');
    contenedorLista.innerHTML = calculos.map(calc =>
        `<li>${calc.fecha}: Su peso es de ${calc.peso} kg, ${calc.actividad} durante ${calc.tiempo} minutos y quemó ${calc.calorias.toFixed(2)} calorías.</li>`
    ).join('');
}

function limpiarCalculos() {
    localStorage.removeItem('calculos');
    mostrarCalculos();
}
