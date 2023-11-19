document.querySelector('.view_icon').addEventListener("click", toggle_light_mode);

function toggle_light_mode(event) {
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

}

document.querySelector('.add_book_button').addEventListener("click", add_book);

function add_book() {
    const name = document.querySelector('.book_name_title_input').value;
    const author = document.querySelector('.book_author_title_input').value;
    const pages = document.querySelector('.book_pages_title_input').value;

    const result = test_for_empty_string_in_input(name, author, pages);
    const string_number_test = number_test(pages);

    if (result === true && string_number_test == true) {
        append_Element(name, author, pages);
        document.querySelector('.book_name_title_input').value = "";
        document.querySelector('.book_author_title_input').value = "";
        document.querySelector('.book_pages_title_input').value = "";
    };
}

function append_Element(name, author, pages) {
    const element = create_book_element(name, author, pages);
    document.querySelector('.book_container').appendChild(element);
}

document.querySelector('.book_container').addEventListener("click", function(event) {
    calculate_read(event);
});

function calculate_read(event) {
    let read;
    console.log(document.querySelector('.read_number_books').textContent);
    if (document.querySelector('.read_number_books').textContent == "0") {
        read = 0;
        console.log("If")
    }else {
        parse_read = document.querySelector('.read_number_books').textContent;
        read = (parseInt(parse_read, 10));
    }

    if (event.target.classList.contains('read_check')) {
        let input = event.target;
        if (input.checked) {
            read++;
            document.querySelector('.read_number_books').textContent = read;
        }else if (!input.checked) {
            read--;
            document.querySelector('.read_number_books').textContent = read;
        }
    }
    
    let read_book_tally = document.querySelector('.read_number_books');
        read_book_tally = read;
}
/* utility functions below here */

function test_for_empty_string_in_input(...spread){
    let result = true;
    for (let i = 0; i < spread.length; i++) {
        if (spread[i].length == 0) {
            result = false;
        }
    }
    return result;
}

function number_test(input) {
    if (isNaN(Number(input))) {
        return false;
    }else {
        return true;
    }
}

function create_book_element(name, author, pages) {
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