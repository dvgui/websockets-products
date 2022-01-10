let socket = io.connect(); 
socket.on('messages', function(data) { 
  console.log(data);
  renderMsg(data);
});

socket.on('products', function(data) { 
  console.log(data);
  renderPrd(data);
});

function renderMsg(data) { 
    let html = data.map((elem, index) => { 
      return(`<div>
            <strong>${elem.author}</strong>: 
            <em>${elem.text}</em> </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function renderPrd(data) { 
  let html = data.map( (elem, index) => { 
    return(`<tr>
          <td>${elem.title}</td> 
          <td>${elem.price}</td> 
          <td><img src="${elem.snapshot}"></td>
          </tr>`) 
  }).join(" "); 
  document.getElementById('products').innerHTML = html; 
}

function addMessage(e) { 
    let message = { 
      author: document.getElementById('username').value, 
      text: document.getElementById('texto').value
    }; 
    socket.emit('new-message', message); // new-message es el nombre del evento (recordatorio)

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}

function addProduct(e) { 
  let product = { 
    title: document.getElementById('title').value, 
    price: document.getElementById('price').value,
    snapshot: document.getElementById('snapshot').value
  }; 
  socket.emit('new-product', product); 

  document.getElementById('texto').value = ''
  document.getElementById('texto').focus()

  return false;
}