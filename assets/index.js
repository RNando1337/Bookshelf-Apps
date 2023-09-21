const formBook = document.getElementById("formBook")
const formSearch = document.getElementById("bookSearch")
const simpanBtn = document.getElementById("simpanBuku")
const checkboxComplete = document.getElementById("isComplete")
const bookNotDone = document.getElementById("bookNotDone")
const bookDone = document.getElementById("bookDone")

const BOOK_STORAGE = "BOOK_STORAGE"

function isBrowserSupportStorage(){
    return typeof Storage === "function"
}

function saveIntoLocalStorage(payload){
    const books = JSON.parse(localStorage.getItem(BOOK_STORAGE)) || []

    books.push(payload)
    localStorage.setItem(BOOK_STORAGE, JSON.stringify(books))

    showBooks()
}

function deleteBook(id){
    const books = JSON.parse(localStorage.getItem(BOOK_STORAGE))
    const filter_books = books.filter(book => book.id !== id)

    if(confirm(`Yakin ingin menghapus buku ini?`))
        localStorage.setItem(BOOK_STORAGE, JSON.stringify(filter_books))
        
    showBooks()
}

function pindahRak(id){
    const books = JSON.parse(localStorage.getItem(BOOK_STORAGE)) || []
    const book_filter = books.filter(book => book.id === id)

    book_filter.forEach((book) => {
        book.isComplete = book.isComplete ? false : true
    })
    
    books.forEach((book) => {
        if(book.id){
            book = book_filter
        }
    })

    if(confirm(`Anda yakin ingin memindahkan ke rak lain?`))
        localStorage.setItem(BOOK_STORAGE, JSON.stringify(books))

    showBooks()
}

function showBooks(search = null){
    const books = JSON.parse(localStorage.getItem(BOOK_STORAGE)) || []
    const bookDoneList = books.filter(book => book.isComplete === true)
    const bookNotDoneList = books.filter(book => book.isComplete === false)

    bookDone.innerHTML = "";
    bookNotDone.innerHTML = "";

    bookDoneList.forEach((book) => {
        if(search !== null){
            if(book.title.trim().toLowerCase().includes(search.toString().trim().toLowerCase()))
            bookDone.innerHTML += `
                <div class="grid-item">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                    <p>${book.year}</p>
                    <label class="text-green">Selesai Dibaca</label>
                    <button class="btn-pindah" onclick="pindahRak(${book.id})">Pindah Rak</button>
                    <button class="btn-hapus" onclick="deleteBook(${book.id})">Hapus</button>
                </div>
            `
        }else{
            bookDone.innerHTML += `
            <div class="grid-item">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <label class="text-green">Selesai Dibaca</label>
                <button class="btn-pindah" onclick="pindahRak(${book.id})">Pindah Rak</button>
                <button class="btn-hapus" onclick="deleteBook(${book.id})">Hapus</button>
            </div>
        `
        }
    })

    bookNotDoneList.forEach((book) => {
        if(search !== null){
            if(book.title.trim().toLowerCase().includes(search.toString().trim().toLowerCase()))
                bookNotDone.innerHTML += `
                    <div class="grid-item">
                        <h4>${book.title}</h4>
                        <p>${book.author}</p>
                        <p>${book.year}</p>
                        <label class="text-red">Belum Selesai Dibaca</label>
                        <button class="btn-pindah" onclick="pindahRak(${book.id})">Pindah Rak</button>
                        <button class="btn-hapus" onclick="deleteBook(${book.id})">Hapus</button>
                    </div>
                `
        }else{
            bookNotDone.innerHTML += `
                <div class="grid-item">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                    <p>${book.year}</p>
                    <label class="text-red">Belum Selesai Dibaca</label>
                    <button class="btn-pindah" onclick="pindahRak(${book.id})">Pindah Rak</button>
                    <button class="btn-hapus" onclick="deleteBook(${book.id})">Hapus</button>
                </div>
            `
        }
    }) 
}

if(!isBrowserSupportStorage)
    alert("Browser ini tidak mendukung untuk menggunakan aplikasi ini")

if(checkboxComplete.checked)
    simpanBtn.innerHTML = 'Masukan ke rak <b>Selesai Dibaca</b>'

showBooks()

formBook.addEventListener('submit', function(event){
    event.preventDefault()
    
    let title = document.getElementById('title').value
    let year = document.getElementById('year').value
    let author = document.getElementById('author').value
    let checkbox = document.getElementById('isComplete').checked
    
    const saveData = {
        id: new Date().getTime(),
        title: title,
        author: author,
        year: parseInt(year),
        isComplete: checkbox
    }

    saveIntoLocalStorage(saveData)
})

checkboxComplete.addEventListener('change', function(event){
    event.preventDefault()
    text = "Masukan ke Rak"
    if(this.checked){
        simpanBtn.innerHTML = `${text} <b>Selesai Dibaca</b>`
    }else{
        simpanBtn.innerHTML = `${text} <b>Belum Selesai Dibaca</b>`
    }
})

formSearch.addEventListener("submit", function(event){
    event.preventDefault()

    let search = document.getElementById("searchTitle").value

    showBooks(search)
})