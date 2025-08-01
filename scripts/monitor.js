#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { AutomationAnalytics } = require('./analytics');
const { NotificationSystem } = require('./notifications');

// System monitoring for automation health
class SystemMonitor {
  constructor() {
    this.analytics = new AutomationAnalytics();
    this.notifications = new NotificationSystem();
    this.monitorFile = path.join(__dirname, '../data/monitor.json');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  loadMonitorData() {
    try {
      if (fs.existsSync(this.monitorFile)) {
        return JSON.parse(fs.readFileSync(this.monitorFile, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading monitor data:', error.message);
    }
    return {
      systemHealth: {
        status: 'healthy',
        lastCheck: null,
        uptime: 0,
        errorCount: 0,
        successCount: 0
      },
      performance: {
        averageResponseTime: 0,
        peakMemoryUsage: 0,
        totalRequests: 0
      },
      alerts: []
    };
  }

  saveMonitorData(data) {
    try {
      fs.writeFileSync(this.monitorFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving monitor data:', error.message);
    }
  }

  checkSystemHealth() {
    const monitorData = this.loadMonitorData();
    const analytics = this.analytics.getPerformanceMetrics();
    const notifications = this.notifications.getUnreadNotifications();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      metrics: {
        successRate: analytics.successRate,
        averageUpdateTime: analytics.averageUpdateTime,
        totalUpdates: analytics.totalUpdates,
        unreadNotifications: notifications.length
      },
      issues: []
    };

    // Check for potential issues
    if (analytics.successRate < 80) {
      health.status = 'warning';
      health.issues.push('Low success rate detected');
    }

    if (analytics.averageUpdateTime > 60) {
      health.status = 'warning';
      health.issues.push('Slow update times detected');
    }

    if (notifications.length > 10) {
      health.status = 'warning';
      health.issues.push('High number of unread notifications');
    }

    // Update monitor data
    monitorData.systemHealth = {
      status: health.status,
      lastCheck: health.timestamp,
      uptime: monitorData.systemHealth.uptime + 1,
      errorCount: health.status === 'error' ? monitorData.systemHealth.errorCount + 1 : monitorData.systemHealth.errorCount,
      successCount: health.status === 'healthy' ? monitorData.systemHealth.successCount + 1 : monitorData.systemHealth.successCount
    };

    this.saveMonitorData(monitorData);
    return health;
  }

  generateHealthReport() {
    const health = this.checkSystemHealth();
    const monitorData = this.loadMonitorData();
    const analytics = this.analytics.getPerformanceMetrics();

    console.log('\n🏥 System Health Report');
    console.log('=' .repeat(50));
    
    // Status
    const statusIcon = health.status === 'healthy' ? '🟢' : health.status === 'warning' ? '🟡' : '🔴';
    console.log(`${statusIcon} Status: ${health.status.toUpperCase()}`);
    console.log(`📊 Success Rate: ${analytics.successRate.toFixed(1)}%`);
    console.log(`⏱️  Average Update Time: ${analytics.averageUpdateTime.toFixed(2)}s`);
    console.log(`📈 Total Updates: ${analytics.totalUpdates}`);
    console.log(`📬 Unread Notifications: ${health.metrics.unreadNotifications}`);
    
    // Uptime
    console.log(`\n⏰ System Uptime: ${monitorData.systemHealth.uptime} checks`);
    console.log(`✅ Successful Checks: ${monitorData.systemHealth.successCount}`);
    console.log(`❌ Error Checks: ${monitorData.systemHealth.errorCount}`);
    
    // Issues
    if (health.issues.length > 0) {
      console.log('\n⚠️  Issues Detected:');
      health.issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    } else {
      console.log('\n✅ No issues detected');
    }

    return health;
  }

  checkFileSystem() {
    const criticalFiles = [
      'scripts/daily-update.js',
      'scripts/project-generator.js',
      'scripts/analytics.js',
      'scripts/notifications.js',
      '.github/workflows/daily-update.yml',
      'package.json'
    ];

    const issues = [];
    const stats = {
      totalFiles: criticalFiles.length,
      existingFiles: 0,
      missingFiles: 0
    };

    criticalFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        stats.existingFiles++;
      } else {
        stats.missingFiles++;
        issues.push(`Missing file: ${file}`);
      }
    });

    console.log('\n📁 File System Check');
    console.log('=' .repeat(30));
    console.log(`📄 Total Critical Files: ${stats.totalFiles}`);
    console.log(`✅ Existing: ${stats.existingFiles}`);
    console.log(`❌ Missing: ${stats.missingFiles}`);

    if (issues.length > 0) {
      console.log('\n⚠️  File Issues:');
      issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    } else {
      console.log('\n✅ All critical files present');
    }

    return { issues, stats };
  }

  checkDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      console.log('\n📦 Dependency Check');
      console.log('=' .repeat(30));
      console.log(`📦 Total Dependencies: ${Object.keys(dependencies).length}`);
      
      const criticalDeps = ['next', 'react', 'typescript', 'tailwindcss'];
      const missingDeps = [];
      
      criticalDeps.forEach(dep => {
        if (!dependencies[dep]) {
          missingDeps.push(dep);
        }
      });

      if (missingDeps.length > 0) {
        console.log(`❌ Missing Critical Dependencies: ${missingDeps.join(', ')}`);
      } else {
        console.log('✅ All critical dependencies present');
      }

      return { dependencies, missingDeps };
    } catch (error) {
      console.error('❌ Error checking dependencies:', error.message);
      return { dependencies: {}, missingDeps: ['package.json not found'] };
    }
  }

  runFullDiagnostic() {
    console.log('\n🔍 Running Full System Diagnostic...');
    console.log('=' .repeat(50));

    // Health check
    const health = this.generateHealthReport();
    
    // File system check
    const fileCheck = this.checkFileSystem();
    
    // Dependency check
    const depCheck = this.checkDependencies();
    
    // Overall assessment
    const totalIssues = health.issues.length + fileCheck.issues.length + depCheck.missingDeps.length;
    
    console.log('\n📋 Diagnostic Summary');
    console.log('=' .repeat(30));
    console.log(`🔍 Total Issues Found: ${totalIssues}`);
    console.log(`🏥 System Health: ${health.status}`);
    console.log(`📁 File System: ${fileCheck.stats.missingFiles > 0 ? 'Issues' : 'OK'}`);
    console.log(`📦 Dependencies: ${depCheck.missingDeps.length > 0 ? 'Issues' : 'OK'}`);

    if (totalIssues === 0) {
      console.log('\n🎉 System is healthy and ready!');
    } else {
      console.log('\n⚠️  System needs attention');
    }

    return {
      health,
      fileCheck,
      depCheck,
      totalIssues
    };
  }

  createAlert(type, message, severity = 'medium') {
    const monitorData = this.loadMonitorData();
    const alert = {
      id: Date.now().toString(),
      type,
      message,
      severity,
      timestamp: new Date().toISOString(),
      resolved: false
    };

    monitorData.alerts.unshift(alert);
    
    // Keep only last 20 alerts
    if (monitorData.alerts.length > 20) {
      monitorData.alerts = monitorData.alerts.slice(0, 20);
    }

    this.saveMonitorData(monitorData);
    
    // Create notification
    this.notifications.createNotification(
      severity === 'high' ? 'error' : 'warning',
      `System Alert: ${type}`,
      message
    );

    return alert;
  }
}

// Export for use in other scripts
module.exports = { SystemMonitor };

// Run if called directly
if (require.main === module) {
  const monitor = new SystemMonitor();
  monitor.runFullDiagnostic();
} 