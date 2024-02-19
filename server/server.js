const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = 'YOUR_SECRET_KEY'; // Ensure you have a secret key for JWT signing

const db = new sqlite3.Database("db.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    )
    `);
});





app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Registration endpoint
app.post("/register", async(req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword],
            function(err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({
                        message: "User registered successfully",
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).send("Error registering user: " + error.message);
    }
});

// Login endpoint
app.post("/login", async(req, res) => {
    const { username, password } = req.body;
    db.get(
        "SELECT * FROM users WHERE username = ?", [username],
        async(err, row) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            if (!row) {
                res.status(401).send("Invalid username");
                return;
            }
            try {
                const passwordMatch = await bcrypt.compare(
                    password,
                    row.password
                );
                if (passwordMatch) {
                    // Generate JWT token
                    const token = jwt.sign({ id: row.id, username: username }, secretKey);
                    res.status(200).send({ token: token, message: "Login successful" });
                } else {
                    res.status(401).send("Invalid password");
                }
            } catch (error) {
                res
                    .status(500)
                    .send("Error checking password: " + error.message);
            }
        }
    );
});

app.get("/getUsername", authenticateToken, (req, res) => {
    res.status(200).json({ username: req.user.username });
});

// Endpoint to get all products with images in Base64
app.get("/products", (req, res) => {
    db.all("SELECT id, component, name, detail, image_data, description, price FROM products", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        // Convert image data to Base64
        const productsWithImages = rows.map((product) => {
            let imageBase64 = "";
            if (product.image_data) {
                imageBase64 = Buffer.from(product.image_data, 'base64').toString('base64');
            }
            return {
                ...product,
                image_data: imageBase64
            };
        });

        res.status(200).json(productsWithImages);
    });
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send({ error: err.message });
            return;
        }
        if (row) {
            let imageBase64 = "";
            if (row.image_data) {
                imageBase64 = Buffer.from(row.image_data).toString("base64");
            }
            const productWithImageBase64 = {
                ...row,
                image_data: imageBase64,
            };
            res.status(200).json(productWithImageBase64);
        } else {
            res.status(404).send({ error: "Product not found" });
        }
    });
});

app.get("/cart", authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.all(`
        SELECT cart_items.*, products.name, products.price, products.image_data
        FROM cart_items
        JOIN products ON cart_items.product_id = products.id
        WHERE cart_items.user_id = ?
    `, [userId], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        const cartItemsWithImages = rows.map((item) => {
            return {
                ...item,
                image_data: item.image_data ? Buffer.from(item.image_data, 'base64').toString('base64') : null,
            };
        });
        res.json(cartItemsWithImages);
    });
});


app.delete("/cart/remove", authenticateToken, (req, res) => {
    const { product_id } = req.body;
    const userId = req.user.id;

    db.run(`
        DELETE FROM cart_items WHERE user_id = ? AND product_id = ?
    `, [userId, product_id], function(err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ message: "Item removed from cart" });
    });
});


app.post("/cart/add", authenticateToken, (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // Assuming the user ID is included in the JWT token

    // Check if the item is already in the user's cart
    db.get("SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            // Item exists, update quantity
            db.run("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?", [quantity, row.id], (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: "Cart updated successfully" });
            });
        } else {
            // New item, insert into cart
            db.run("INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: "Product added to cart" });
            });
        }
    });
});

app.post("/cart/update", authenticateToken, (req, res) => {
    const { product_id, change } = req.body;
    const user_id = req.user.id; // Obtained from JWT token

    // SQL query to update the quantity of the cart item
    const sqlUpdateQuantity = `
        UPDATE cart_items
        SET quantity = quantity + (?)
        WHERE user_id = ? AND product_id = ? AND quantity + (?) >= 0
    `;

    // Execute the query to update the quantity
    db.run(sqlUpdateQuantity, [change, user_id, product_id, change], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes > 0) {
            res.json({ message: "Cart quantity updated successfully" });
        } else {
            res.status(404).json({ error: "Cart item not found or quantity update invalid" });
        }
    });
});




app.listen(5000, () => {
    console.log("Server is running on port 5000");
});