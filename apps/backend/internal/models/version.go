package models

import "time"

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