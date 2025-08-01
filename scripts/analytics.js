#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Analytics tracking for the automation system
class AutomationAnalytics {
  constructor() {
    this.analyticsFile = path.join(__dirname, '../data/analytics.json');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  loadAnalytics() {
    try {
      if (fs.existsSync(this.analyticsFile)) {
        return JSON.parse(fs.readFileSync(this.analyticsFile, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading analytics:', error.message);
    }
    return {
      totalUpdates: 0,
      successfulUpdates: 0,
      failedUpdates: 0,
      projectsGenerated: 0,
      skillsUpdated: 0,
      achievementsAdded: 0,
      averageUpdateTime: 0,
      lastUpdate: null,
      updateHistory: []
    };
  }

  saveAnalytics(analytics) {
    try {
      fs.writeFileSync(this.analyticsFile, JSON.stringify(analytics, null, 2));
    } catch (error) {
      console.error('Error saving analytics:', error.message);
    }
  }

  trackUpdate(updateData) {
    const analytics = this.loadAnalytics();
    const timestamp = new Date().toISOString();
    
    // Update counters
    analytics.totalUpdates++;
    if (updateData.success) {
      analytics.successfulUpdates++;
    } else {
      analytics.failedUpdates++;
    }

    // Track specific metrics
    if (updateData.skillsUpdated) {
      analytics.skillsUpdated += updateData.skillsUpdated;
    }
    if (updateData.projectsGenerated) {
      analytics.projectsGenerated += updateData.projectsGenerated;
    }
    if (updateData.achievementsAdded) {
      analytics.achievementsAdded += updateData.achievementsAdded;
    }

    // Calculate average update time
    if (updateData.duration) {
      const totalTime = analytics.averageUpdateTime * (analytics.totalUpdates - 1) + updateData.duration;
      analytics.averageUpdateTime = totalTime / analytics.totalUpdates;
    }

    analytics.lastUpdate = timestamp;

    // Add to history
    analytics.updateHistory.push({
      timestamp,
      success: updateData.success,
      duration: updateData.duration,
      skillsUpdated: updateData.skillsUpdated || 0,
      projectsGenerated: updateData.projectsGenerated || 0,
      achievementsAdded: updateData.achievementsAdded || 0,
      error: updateData.error || null
    });

    // Keep only last 100 entries
    if (analytics.updateHistory.length > 100) {
      analytics.updateHistory = analytics.updateHistory.slice(-100);
    }

    this.saveAnalytics(analytics);
    return analytics;
  }

  generateReport() {
    const analytics = this.loadAnalytics();
    
    console.log('\n📊 Automation System Analytics Report');
    console.log('=' .repeat(50));
    
    console.log(`📈 Total Updates: ${analytics.totalUpdates}`);
    console.log(`✅ Successful: ${analytics.successfulUpdates}`);
    console.log(`❌ Failed: ${analytics.failedUpdates}`);
    console.log(`📊 Success Rate: ${((analytics.successfulUpdates / analytics.totalUpdates) * 100).toFixed(1)}%`);
    
    console.log('\n🎯 Metrics:');
    console.log(`- Skills Updated: ${analytics.skillsUpdated}`);
    console.log(`- Projects Generated: ${analytics.projectsGenerated}`);
    console.log(`- Achievements Added: ${analytics.achievementsAdded}`);
    console.log(`- Average Update Time: ${analytics.averageUpdateTime.toFixed(2)}s`);
    
    if (analytics.lastUpdate) {
      console.log(`\n🕒 Last Update: ${new Date(analytics.lastUpdate).toLocaleString()}`);
    }
    
    // Recent activity
    if (analytics.updateHistory.length > 0) {
      console.log('\n📅 Recent Activity:');
      const recent = analytics.updateHistory.slice(-5).reverse();
      recent.forEach((update, index) => {
        const status = update.success ? '✅' : '❌';
        const date = new Date(update.timestamp).toLocaleDateString();
        console.log(`${status} ${date} - ${update.duration.toFixed(2)}s`);
      });
    }
    
    return analytics;
  }

  getPerformanceMetrics() {
    const analytics = this.loadAnalytics();
    
    return {
      successRate: analytics.totalUpdates > 0 ? (analytics.successfulUpdates / analytics.totalUpdates) * 100 : 0,
      averageUpdateTime: analytics.averageUpdateTime,
      totalUpdates: analytics.totalUpdates,
      skillsUpdated: analytics.skillsUpdated,
      projectsGenerated: analytics.projectsGenerated,
      achievementsAdded: analytics.achievementsAdded
    };
  }
}

// Export for use in other scripts
module.exports = { AutomationAnalytics };

// Run if called directly
if (require.main === module) {
  const analytics = new AutomationAnalytics();
  analytics.generateReport();
} 