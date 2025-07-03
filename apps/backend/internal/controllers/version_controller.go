package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"mtg-collection-backend/internal/services"
)

type VersionController struct {
	versionService *services.VersionService
}

// NewVersionController creates a new version controller
func NewVersionController() *VersionController {
	return &VersionController{
		versionService: services.NewVersionService(),
	}
}

// GetLastVersion handles the GET /api/lastVersion endpoint
func (vc *VersionController) GetLastVersion(c *gin.Context) {
	versionResponse, err := vc.versionService.GetCurrentVersion()
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No active version found"})
			return
		}
		
		log.Printf("Database error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, versionResponse)
}

// HealthCheck handles the GET /health endpoint
func (vc *VersionController) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}