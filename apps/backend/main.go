package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"mtg-collection-backend/internal/config"
	"mtg-collection-backend/internal/controllers"
	"mtg-collection-backend/internal/middleware"
	"mtg-collection-backend/internal/services"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	config.InitDB()

	// Initialize services and migrate database
	versionService := services.NewVersionService()
	if err := versionService.InitializeDatabase(); err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

	// Initialize controllers
	versionController := controllers.NewVersionController()

	// Initialize Gin router
	router := gin.Default()

	// Apply middleware
	router.Use(middleware.CORSMiddleware())

	// Routes
	router.GET("/api/lastVersion", versionController.GetLastVersion)
	router.GET("/health", versionController.HealthCheck)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}