class Create_library {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;

        this.add_book = this.add_book.bind(this);
        this.calculate_read = this.calculate_read.bind(this);
        this.update_not_read_books = this.update_not_read_books.bind(this);
    }

    add_book() {
        const name = document.querySelector('.book_name_title_input').value;
        const author = document.querySelector('.book_author_title_input').value;
        const pages = document.querySelector('.book_pages_title_input').value;
    
        const result = this.test_for_empty_string_in_input(name, author, pages);
        const string_number_test = this.number_test(pages);
    
        if (result === true && string_number_test == true) {
            this.append_Element(name, author, pages);
            document.querySelector('.book_name_title_input').value = "";
            document.querySelector('.book_author_title_input').value = "";
            document.querySelector('.book_pages_title_input').value = "";
        };
    };
    
    append_Element(name, author, pages) {
        const element = this.create_book_element(name, author, pages);
        document.querySelector('.book_container').appendChild(element);
        this.update_total_books();
    };
    
    update_total_books() {
        const read_check_input = document.querySelectorAll('.read_check');
        let number_of_books = read_check_input.length;
        console.log(number_of_books)
        console.log(document.querySelector('.book_count').textContent);
        document.querySelector('.book_count').textContent = number_of_books;
        this.update_not_read_books();
    };
    
    update_not_read_books() {
        const read_check_input = document.querySelectorAll('.read_check');
        let not_read = 0;
    
        read_check_input.forEach(function (element) {
            if (!element.checked) {
                not_read++;
            };
        });
    
        document.querySelector('.not_read_count').textContent = not_read;
    
    
    };
    
    string_to_number(string){
        return (parseInt(string, 10));
    }
    
    calculate_read(event) {
        let read;
        console.log(document.querySelector('.read_number_books').textContent);
        if (document.querySelector('.read_number_books').textContent == "0") {
            read = 0;
            console.log("If")
        }else {
            let parse_read = document.querySelector('.read_number_books').textContent;
            read = this.string_to_number(parse_read);
            read = (parseInt(parse_read, 10));
        };
    
        if (event.target.classList.contains('read_check')) {
            let input = event.target;
            if (input.checked) {
                read++;
                document.querySelector('.read_number_books').textContent = read;
                /* decrease not read books */
                let not_read = document.querySelector('.not_read_count').textContent;
                let not_read_to_number = this.string_to_number(not_read);
                        console.log(not_read_to_number);
                    not_read_to_number--;
                document.querySelector('.not_read_count').textContent = not_read_to_number;
                
            }else if (!input.checked) {
                console.log("else if");
                let read_book_count = this.string_to_number(document.querySelector('.read_number_books').textContent);
                let unread_book_count = this.string_to_number(document.querySelector('.not_read_count').textContent);
                    read_book_count--;
                        document.querySelector('.read_number_books').textContent = read_book_count;
                    unread_book_count++;
                        document.querySelector('.not_read_count').textContent = unread_book_count;
    
            };
        };
        
        let read_book_tally = document.querySelector('.read_number_books');
            read_book_tally = read;
    }

    /* utility functions below here */
    
    test_for_empty_string_in_input(...spread){
        let result = true;
        for (let i = 0; i < spread.length; i++) {
            if (spread[i].length == 0) {
                result = false;
            }
        }
        return result;
    }
    
    number_test(input) {
        if (isNaN(Number(input))) {
            return false;
        }else {
            return true;
        }
    }
    
    create_book_element(name, author, pages) {
        const book_element = document.createElement('div');
            book_element.classList.add("book_element");
        const book_title = document.createElement('p');
            book_title.textContent = name;
            book_title.classList.add('book_divs');
            book_element.appendChild(book_title);
        const book_author = document.createElement('p');
            book_author.textContent = author;
            book_author.classList.add('book_divs');
            book_element.appendChild(book_author);
        const book_pages = document.createElement('p');
            book_pages.textContent = pages;
            book_pages.classList.add('book_divs');
            book_element.appendChild(book_pages);
        const read_flex_container = document.createElement('div');
            read_flex_container.classList.add('read_flex_container');
        const book_read_check_box_container = document.createElement('div');
        book_read_check_box_container.classList.add('book_read_check_box_container')
            const input_book_read = document.createElement('input');
                input_book_read.type = "checkbox";
                input_book_read.classList.add("read_check");
                book_read_check_box_container.appendChild(input_book_read);
            const book_read_label = document.createElement('label');
                book_read_label.textContent = "read?";
                book_read_check_box_container.appendChild(book_read_label)
        book_element.appendChild(book_read_check_box_container);
    
        return book_element;
    }

    toggle_light_mode(event) {
        console.log(event.target);
        const top_div_container = document.querySelector('.top_div_container');
    
        if (event.target.className === "view_icon") {
            event.target.className = "view_icon_light_mode";
            top_div_container.className = "top_div_container_light_mode";
            document.querySelector('.book_container').style.backgroundColor = "white";
                if (document.querySelector('.library_log_dark_mode_flex_container')) {
                    document.querySelector('.library_log_dark_mode_flex_container').className = 'library_log_light_mode_flex_container'
                }
        }else if (event.target.className === "view_icon_light_mode") {
            event.target.className = "view_icon";
            document.querySelector(".top_div_container_light_mode").className = "top_div_container";
            document.querySelector('.book_container').style.backgroundColor = "black";
            if (document.querySelector('.library_log_light_mode_flex_container')) {
                document.querySelector('.library_log_light_mode_flex_container').className = 'library_log_dark_mode_flex_container'
            }
        }
    
    };
}

const library = new Create_library();

document.querySelector('.view_icon').addEventListener("click", library.toggle_light_mode);

document.querySelector('.add_book_button').addEventListener("click", library.add_book);

document.querySelector('.book_container').addEventListener("click", function(event) {
    library.calculate_read(event);
}.bind(library));