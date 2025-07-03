package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Version model for the database
type Version struct {
	ID            uint   `gorm:"primaryKey"`
	VersionNumber string `gorm:"column:version_number;not null"`
	Active        bool   `gorm:"column:active;not null;default:false"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

// VersionResponse for API response
type VersionResponse struct {
	Version string `json:"version"`
}

var db *gorm.DB

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize database
	initDB()

	// Create tables and seed data
	migrateDB()

	// Initialize Gin router
	router := gin.Default()

	// Enable CORS for frontend
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	router.GET("/api/lastVersion", getLastVersion)
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func initDB() {
	var err error
	
	// Database connection string
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=mtg_collection port=5432 sslmode=disable TimeZone=UTC"
	}

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")
}

func migrateDB() {
	// Auto migrate the schema
	err := db.AutoMigrate(&Version{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Add unique index to ensure only one active version
	err = db.Exec(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_version 
		ON versions (active) 
		WHERE active = true
	`).Error
	if err != nil {
		log.Printf("Warning: Failed to create unique index for active version: %v", err)
	}

	// Check if we already have an active version
	var count int64
	db.Model(&Version{}).Where("active = ?", true).Count(&count)

	if count == 0 {
		// Insert initial version
		initialVersion := Version{
			VersionNumber: "1.0.0",
			Active:        true,
		}

		result := db.Create(&initialVersion)
		if result.Error != nil {
			log.Fatal("Failed to insert initial version:", result.Error)
		}

		log.Println("Initial version 1.0.0 inserted successfully")
	}
}

func getLastVersion(c *gin.Context) {
	var version Version
	
	result := db.Where("active = ?", true).First(&version)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No active version found"})
			return
		}
		
		log.Printf("Database error: %v", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, VersionResponse{
		Version: version.VersionNumber,
	})
}