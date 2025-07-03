package services

import (
	"mtg-collection-backend/internal/models"
	"mtg-collection-backend/internal/repositories"
)

type VersionService struct {
	versionRepo *repositories.VersionRepository
}

// NewVersionService creates a new version service
func NewVersionService() *VersionService {
	return &VersionService{
		versionRepo: repositories.NewVersionRepository(),
	}
}

// InitializeDatabase migrates and seeds the database
func (s *VersionService) InitializeDatabase() error {
	return s.versionRepo.MigrateAndSeed()
}

// GetCurrentVersion retrieves the current active version
func (s *VersionService) GetCurrentVersion() (*models.VersionResponse, error) {
	version, err := s.versionRepo.GetActiveVersion()
	if err != nil {
		return nil, err
	}

	return &models.VersionResponse{
		Version: version.VersionNumber,
	}, nil
}