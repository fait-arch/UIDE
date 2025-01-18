package main

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors" // Importa el middleware CORS
	_ "github.com/mattn/go-sqlite3"
)

// Feature representa una característica en la base de datos
type Feature struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Image       string `json:"image"`
	Description string `json:"description"`
	CreatedAt   string `json:"created_at"`
}

var db *sql.DB

func main() {
	var err error

	// Conectar a la base de datos SQLite
	db, err = sql.Open("sqlite3", "./database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Configurar Fiber
	app := fiber.New()

	// Configurar CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000", // Permite solicitudes desde este origen
		AllowMethods: "GET,POST,PUT,DELETE",   // Métodos permitidos
		AllowHeaders: "Origin,Content-Type,Accept", // Encabezados permitidos
	}))

	// Rutas
	app.Get("/api/caracteristicas", getAllFeatures)
	app.Get("/api/caracteristicas/:id", getFeatureByID)
	app.Put("/api/caracteristicas/:id", updateFeatureByID)

	// Iniciar servidor
	log.Fatal(app.Listen(":8080"))
}

// getAllFeatures obtiene todas las características
func getAllFeatures(c *fiber.Ctx) error {
	rows, err := db.Query("SELECT id, titulo, imagen, description, created_at FROM CARACTERISTICAS")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	features := []Feature{}
	for rows.Next() {
		var feature Feature
		if err := rows.Scan(&feature.ID, &feature.Title, &feature.Image, &feature.Description, &feature.CreatedAt); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		features = append(features, feature)
	}

	return c.JSON(features)
}

// getFeatureByID obtiene una característica por ID
func getFeatureByID(c *fiber.Ctx) error {
	id := c.Params("id")

	row := db.QueryRow("SELECT id, titulo, imagen, description, created_at FROM CARACTERISTICAS WHERE id = ?", id)

	var feature Feature
	if err := row.Scan(&feature.ID, &feature.Title, &feature.Image, &feature.Description, &feature.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Feature not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(feature)
}

// updateFeatureByID actualiza una característica por ID
func updateFeatureByID(c *fiber.Ctx) error {
	id := c.Params("id")

	var feature Feature
	if err := c.BodyParser(&feature); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	_, err := db.Exec("UPDATE CARACTERISTICAS SET titulo = ?, imagen = ?, description = ? WHERE id = ?", feature.Title, feature.Image, feature.Description, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Feature updated successfully"})
}
