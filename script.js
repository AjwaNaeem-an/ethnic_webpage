document.addEventListener("DOMContentLoaded", function () {

    // theme button
    const themeButton = document.getElementById("themeButton");

    if (themeButton) {

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }

        });
    }


    // highlight table rows
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function (row) {

        row.addEventListener("mouseover", function () {
            row.style.backgroundColor = "#d8a34d";
        });

        row.addEventListener("mouseout", function () {
            row.style.backgroundColor = "";
        });

    });


    // calculate selected products
    const items = document.querySelectorAll(".productItem");
    const total = document.getElementById("total");

    items.forEach(function (item) {

        item.addEventListener("change", function () {

            let price = 0;

            items.forEach(function (item) {

                if (item.checked) {
                    price += parseInt(item.dataset.price);
                }

            });

            total.textContent = "Total: PKR " + price;

        });

    });


    // add product to cart
    const cartButton = document.getElementById("addCartButton");
    const cartMessage = document.getElementById("cartMessage");

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            const selectedSize =
                document.querySelector('input[name="size"]:checked');

            const selectedColor =
                document.querySelector('input[name="color"]:checked');

            if (!selectedSize || !selectedColor) {

                cartMessage.textContent =
                    "Please select a size and color first.";

            } else {

                cartMessage.textContent =
                    "Added to cart! Size: " +
                    selectedSize.value +
                    ", Color: " +
                    selectedColor.value;

            }

        });

    }


    // login form
    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const formMessage =
                document.getElementById("formMessage");

            if (name !== "" && email !== "") {

                formMessage.textContent =
                    "Welcome, " + name +
                    "! We will contact you at " +
                    email + ".";

            } else {

                formMessage.textContent =
                    "Please enter your username and email.";

            }


            // check age
            const birthYear =
                document.getElementById("birth-year").value;

            const discountMessage =
                document.getElementById("discountMessage");

            const year = parseInt(birthYear);

            if (!isNaN(year) && year > 1900 && year <= 2026) {

                const age = 2026 - year;

                if (age >= 60 || (age >= 13 && age <= 25)) {

                    discountMessage.textContent =
                        "You qualify for a special discount!";

                } else {

                    discountMessage.textContent =
                        "You do not qualify for the special discount.";

                }

            } else {

                discountMessage.textContent =
                    "Please enter a valid birth year.";

            }

        });

    }


    // character counter
    const notes = document.getElementById("special-notes");
    const charCount = document.getElementById("charCount");

    if (notes) {

        notes.addEventListener("input", function () {

            const remaining =
                100 - notes.value.length;

            charCount.textContent =
                remaining + " characters remaining";

        });

    }


    // read more
    const readMoreButton =
        document.getElementById("readMoreButton");

    const moreText =
        document.getElementById("moreText");

    if (readMoreButton && moreText) {

        readMoreButton.addEventListener("click", function () {

            if (moreText.style.display === "none") {

                moreText.style.display = "block";
                readMoreButton.textContent = "Read Less";

            } else {

                moreText.style.display = "none";
                readMoreButton.textContent = "Read More";

            }

        });

    }


    // category filter
    const filterButtons =
        document.querySelectorAll(".filterButton");

    const categoryItems =
        document.querySelectorAll("#categoryList li");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;

            categoryItems.forEach(function (item) {

                if (
                    category === "all" ||
                    item.dataset.category === category
                ) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    // store opening status
    const storeStatus =
        document.getElementById("storeStatus");

    if (storeStatus) {

        const hour = new Date().getHours();

        if (hour >= 9 && hour < 20) {

            storeStatus.textContent =
                "Store Status: Open";

        } else {

            storeStatus.textContent =
                "Store Status: Closed";

        }

    }

});