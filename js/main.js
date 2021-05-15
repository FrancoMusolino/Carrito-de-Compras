const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

let carrito = {}

// Espera hasta que se lea todo el HTML para ejecutar la siguiente función
document.addEventListener('DOMContentLoaded', () => fetchData())

cards.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async () => {
    try {

        //La respuesta viene de nuestra pseudo base de datos (la traemos con fetch)
        const res = await fetch('api.json')

        //Una vez que tenemos la respuesta, guardamos la data, la respuesta viene en json
        const data = await res.json()
        pintarCards(data)

    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = `$ ${producto.precio}`
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    })
    cards.appendChild(fragment)
}


const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation() //Detiene cualquier otro evento que se puede generar en nuestros items
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1 //Pregunto si ese objeto tiene la propiedad, en caso de que sea true, realizo la operación
    }

    carrito[producto.id] = { ...producto } //En caso de que sea false, lo agrego al carrito
    console.log(carrito)
}

