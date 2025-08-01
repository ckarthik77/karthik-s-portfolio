#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Notification system for automation updates
class NotificationSystem {
  constructor() {
    this.notificationsFile = path.join(__dirname, '../data/notifications.json');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  loadNotifications() {
    try {
      if (fs.existsSync(this.notificationsFile)) {
        return JSON.parse(fs.readFileSync(this.notificationsFile, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading notifications:', error.message);
    }
    return {
      notifications: [],
      settings: {
        emailNotifications: false,
        slackNotifications: false,
        discordNotifications: false,
        webhookUrl: null
      }
    };
  }

  saveNotifications(data) {
    try {
      fs.writeFileSync(this.notificationsFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving notifications:', error.message);
    }
  }

  createNotification(type, title, message, data = {}) {
    const notifications = this.loadNotifications();
    const notification = {
      id: Date.now().toString(),
      type, // 'success', 'error', 'warning', 'info'
      title,
      message,
      data,
      timestamp: new Date().toISOString(),
      read: false
    };

    notifications.notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (notifications.notifications.length > 50) {
      notifications.notifications = notifications.notifications.slice(0, 50);
    }

    this.saveNotifications(notifications);
    return notification;
  }

  markAsRead(notificationId) {
    const notifications = this.loadNotifications();
    const notification = notifications.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications(notifications);
    }
  }

  getUnreadNotifications() {
    const notifications = this.loadNotifications();
    return notifications.notifications.filter(n => !n.read);
  }

  getAllNotifications(limit = 10) {
    const notifications = this.loadNotifications();
    return notifications.notifications.slice(0, limit);
  }

  sendUpdateNotification(updateData) {
    const { skills, learning, projects, stats } = updateData;
    
    let title = 'Portfolio Update Completed';
    let message = 'Your portfolio has been successfully updated!';
    let type = 'success';

    // Create detailed message
    const details = [];
    if (skills && skills.length > 0) {
      details.push(`${skills.length} skills improved`);
    }
    if (learning) {
      details.push(`Learning: ${learning}`);
    }
    if (projects) {
      details.push(`New project: ${projects.title}`);
    }
    if (stats) {
      details.push(`Achievement: ${stats}`);
    }

    if (details.length > 0) {
      message += `\n\nUpdates:\n- ${details.join('\n- ')}`;
    }

    return this.createNotification(type, title, message, updateData);
  }

  sendErrorNotification(error, context = '') {
    const title = 'Automation Error';
    const message = `An error occurred during portfolio update: ${error.message}`;
    const type = 'error';

    return this.createNotification(type, title, message, {
      error: error.message,
      context,
      stack: error.stack
    });
  }

  sendProjectNotification(project) {
    const title = 'New Project Generated';
    const message = `Successfully generated and deployed: ${project.name}`;
    const type = 'success';

    return this.createNotification(type, title, message, {
      projectName: project.name,
      projectUrl: project.deploymentUrl,
      githubUrl: project.githubUrl,
      technologies: project.technologies
    });
  }

  displayNotifications() {
    const notifications = this.getUnreadNotifications();
    
    if (notifications.length === 0) {
      console.log('\n📭 No new notifications');
      return;
    }

    console.log('\n🔔 Recent Notifications:');
    console.log('=' .repeat(50));

    notifications.forEach((notification, index) => {
      const date = new Date(notification.timestamp).toLocaleString();
      const icon = this.getNotificationIcon(notification.type);
      
      console.log(`${icon} ${notification.title}`);
      console.log(`   ${notification.message}`);
      console.log(`   📅 ${date}`);
      console.log('');
    });
  }

  getNotificationIcon(type) {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  }

  clearOldNotifications(daysOld = 30) {
    const notifications = this.loadNotifications();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const originalCount = notifications.notifications.length;
    notifications.notifications = notifications.notifications.filter(
      notification => new Date(notification.timestamp) > cutoffDate
    );

    const removedCount = originalCount - notifications.notifications.length;
    if (removedCount > 0) {
      console.log(`🗑️  Cleared ${removedCount} old notifications`);
      this.saveNotifications(notifications);
    }

    return removedCount;
  }

  generateNotificationSummary() {
    const notifications = this.loadNotifications();
    const unread = this.getUnreadNotifications();
    
    console.log('\n📊 Notification Summary');
    console.log('=' .repeat(30));
    console.log(`📧 Total: ${notifications.notifications.length}`);
    console.log(`📬 Unread: ${unread.length}`);
    console.log(`✅ Success: ${notifications.notifications.filter(n => n.type === 'success').length}`);
    console.log(`❌ Errors: ${notifications.notifications.filter(n => n.type === 'error').length}`);
    console.log(`⚠️  Warnings: ${notifications.notifications.filter(n => n.type === 'warning').length}`);
  }
}

// Export for use in other scripts
module.exports = { NotificationSystem };

// Run if called directly
if (require.main === module) {
  const notifications = new NotificationSystem();
  notifications.displayNotifications();
  notifications.generateNotificationSummary();
} 