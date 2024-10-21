// @method: GET
// URL: http://localhost:5000
const homeController = (req, res) => {
    return res.render("Index")
}

// @method: GET
// URL: http://localhost:5000/add-product
const addProductController_GET = (req, res) => {
    return res.render("Add-Product")
}

// @method: POST
// URL: http://localhost:5000/add-product
const addProductController_POST = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send("Image upload failed. Please try again.");
        }

        const { product_id, product_name, product_description, product_price, product_category, product_image } = req.body;

        // Here I'm using Regex for validating the data. (USED CHATGPT FOR REGEX) ;)
        const idRegex = /^\d+$/;
        const nameRegex = /^[a-zA-Z0-9\s]{1,50}$/;
        const descRegex = /^[a-zA-Z0-9\s.,'-]{1,200}$/;
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        const validCategories = ["Electronics", "Grocery", "Furniture", "Clothing", "Others"];

        // Validate product_id
        if (!idRegex.test(product_id)) return res.status(400).send("Invalid Product ID");
        
        // Validate product_name
        if (!nameRegex.test(product_name)) return res.status(400).send("Invalid Product Name");

        // Validate product_description
        if (!descRegex.test(product_description)) return res.status(400).send("Invalid Product Description");

        // Validate product_price
        if (!priceRegex.test(product_price)) return res.status(400).send("Invalid Product Price");

        // Validate product_category
        if (!validCategories.includes(product_category)) return res.status(400).send("Invalid Product Category");

        // Sir, here I'm strictly sanitizing the form data before sending it to the server.
        const sanitizedData = {
            product_id: parseInt(product_id, 10),
            product_name: product_name.trim(),
            product_description: product_description.trim(),
            product_price: parseFloat(product_price),
            product_category: product_category.trim(),
            product_image: product_image
        };

        console.table(sanitizedData);

        
        const productAPI = await fetch(process.env.API, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(sanitizedData),
        });

        console.log("Success", await productAPI.json());

        const getAPI = await fetch(process.env.API);
        const dataToJson = await getAPI.json();

        return res.status(200).redirect("/display-products");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

// @method: GET
// URL: http://localhost:5000/display-products
const displayProductsController_GET = async (req, res) => {
    try {
        const getAPI = await fetch(process.env.API)
        const dataToJson = await getAPI.json()
        return res.render("Display-Products", {dataToJson})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    homeController,
    addProductController_GET,
    addProductController_POST,
    displayProductsController_GET
}