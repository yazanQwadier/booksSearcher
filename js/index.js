// Bools API From Google :
// https://developers.google.com/books/docs/v1/using


class Book{
    constructor(title, images, authors){
        this.title = title;
        this.images = images;
        this.authors = authors;
    }
}

new Vue({
    "el": "#root" ,
    "data": {
        "books": [],
        "requesting": false,
    },
    "methods": {
        "sendRequest": function(input){

            if(input != undefined && input != ""){
                this.requesting = true;

                axios
                    .get('https://www.googleapis.com/books/v1/volumes?q=' + input)
                    .then(response => {
                        let filteredBooks = [];
                        if( response.data.items != undefined ){
                            response.data.items.forEach(item => {
                                var info = item.volumeInfo;
                                let book = new Book(info.title, info.imageLinks, info.authors);
                                filteredBooks.push(book);
        
                                // console.log(info);
                                console.log(book);
                            });
                            this.books = filteredBooks;
                        }
                        else{
                            this.books = [];
                        }
                
                        this.requesting = false;
                    });
            }
            else{
                this.books = [];
                this.requesting = false;
            }

        }
    }
});