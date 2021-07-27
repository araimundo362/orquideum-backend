const socket = io();

socket.on('mi mensaje', data => {
    alert(data);
    socket.emit('notificacion', 'Mensaje recibido exitosamente')
})

$('#submitButton').on("click", () => {
    let nameValue = $('#prod').val();
    let priceValue = $('#price').val();
    let thumbValue = $('#thumb').val();

    const prod = {
        prod: nameValue,
        price: priceValue,
        thumb: thumbValue
    };

    console.log('prod', prod);
})