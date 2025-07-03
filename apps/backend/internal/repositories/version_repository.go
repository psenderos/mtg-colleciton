package repositories

import (
	"log"

	"gorm.io/gorm"
	"mtg-collection-backend/internal/config"
	"mtg-collection-backend/internal/models"
)

type VersionRepository struct {
	db *gorm.DB
}

// NewVersionRepository creates a new version repository
func NewVersionRepository() *VersionRepository {
	return &VersionRepository{
		db: config.GetDB(),
	}
}

// MigrateAndSeed migrates the database schema and seeds initial data
func (r *VersionRepository) MigrateAndSeed() error {
	// Auto migrate the schema
	err := r.db.AutoMigrate(&models.Version{})
	if err != nil {
		return err
	}

	// Add unique index to ensure only one active version
	err = r.db.Exec(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_version 
		ON versions (active) 
		WHERE active = true
	`).Error
	if err != nil {
		log.Printf("Warning: Failed to create unique index for active version: %v", err)
	}

	// Check if we already have an active version
	var count int64
	r.db.Model(&models.Version{}).Where("active = ?", true).Count(&count)

	if count == 0 {
		// Insert initial version
		initialVersion := models.Version{
			VersionNumber: "1.0.0",
			Active:        true,
		}

		result := r.db.Create(&initialVersion)
		if result.Error != nil {
			return result.Error
		}

		log.Println("Initial version 1.0.0 inserted successfully")
	}

	return nil
}

// GetActiveVersion retrieves the currently active version
func (r *VersionRepository) GetActiveVersion() (*models.Version, error) {
	var version models.Version
	
	result := r.db.Where("active = ?", true).First(&version)
	if result.Error != nil {
		return nil, result.Error
	}

	return &version, nil
}