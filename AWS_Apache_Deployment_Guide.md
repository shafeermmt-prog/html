# 🚀 AWS Apache Server Deployment Guide
## Operational Maturity Survey - Complete Setup Instructions

### 📋 Prerequisites
- AWS Account with appropriate permissions
- Basic command line knowledge
- SSH client (Terminal, PuTTY, etc.)

---

## 🏗️ Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. **Login to AWS Console** → Navigate to EC2 Dashboard
2. **Click "Launch Instance"**
3. **Configure Instance:**
   - **Name:** `maturity-survey-server`
   - **OS:** Amazon Linux 2023 (recommended) or Ubuntu 22.04 LTS
   - **Instance Type:** t2.micro (Free tier eligible)
   - **Key Pair:** Create new or select existing SSH key pair
   - **Security Group:** Create with the following rules:
     ```
     HTTP (Port 80)    - Source: 0.0.0.0/0
     HTTPS (Port 443)  - Source: 0.0.0.0/0  
     SSH (Port 22)     - Source: Your IP/0.0.0.0/0
     ```

### 1.2 Launch and Connect
1. **Launch Instance** and wait for "Running" status
2. **Note the Public IP address** (e.g., 54.123.456.789)
3. **Connect via SSH:**
   ```bash
   # For Amazon Linux
   ssh -i your-key.pem ec2-user@YOUR-PUBLIC-IP
   
   # For Ubuntu
   ssh -i your-key.pem ubuntu@YOUR-PUBLIC-IP
   ```

---

## ⚙️ Step 2: Install and Configure Apache

### 2.1 Update System & Install Apache

**For Amazon Linux 2023:**
```bash
# Update system
sudo dnf update -y

# Install Apache
sudo dnf install -y httpd

# Start and enable Apache
sudo systemctl start httpd
sudo systemctl enable httpd

# Check status
sudo systemctl status httpd
```

**For Ubuntu:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Apache
sudo apt install -y apache2

# Start and enable Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Check status
sudo systemctl status apache2
```

### 2.2 Configure Firewall (if needed)
```bash
# For Amazon Linux (usually not needed with Security Groups)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# For Ubuntu
sudo ufw allow 'Apache Full'
sudo ufw enable
```

---

## 📁 Step 3: Deploy Your Survey Website

### 3.1 Navigate to Web Directory
```bash
# For Amazon Linux
cd /var/www/html

# For Ubuntu  
cd /var/www/html

# Check current contents
sudo ls -la
```

### 3.2 Upload Your index.html File

**Method 1: Direct File Creation (Recommended)**
```bash
# Create the index.html file directly on server
sudo nano /var/www/html/index.html
```

Then copy and paste the entire content of your index.html file (the survey code I created above).

**Method 2: Upload via SCP (from your local machine)**
```bash
# From your local machine where you have the index.html file
scp -i your-key.pem index.html ec2-user@YOUR-PUBLIC-IP:/tmp/
```

Then on the server:
```bash
# Move file to web directory
sudo mv /tmp/index.html /var/www/html/
```

**Method 3: Download via wget/curl**
```bash
# If you have the file hosted somewhere temporarily
sudo wget -O /var/www/html/index.html "https://your-temporary-url/index.html"
```

### 3.3 Set Proper Permissions
```bash
# Set ownership and permissions
sudo chown apache:apache /var/www/html/index.html  # Amazon Linux
# OR
sudo chown www-data:www-data /var/www/html/index.html  # Ubuntu

# Set file permissions
sudo chmod 644 /var/www/html/index.html

# Verify permissions
ls -la /var/www/html/
```

---

## 🌐 Step 4: Configure Domain (Optional)

### 4.1 Using AWS Route 53
1. **Purchase Domain** (if you don't have one)
2. **Create Hosted Zone** for your domain
3. **Create A Record** pointing to your EC2 instance public IP
4. **Update nameservers** at your domain registrar

### 4.2 Alternative: Use Public IP
- Your survey will be accessible at: `http://YOUR-PUBLIC-IP`
- Example: `http://54.123.456.789`

---

## 🔒 Step 5: Add SSL Certificate (Optional but Recommended)

### 5.1 Install Certbot
**Amazon Linux:**
```bash
sudo dnf install -y python3-certbot-apache
```

**Ubuntu:**
```bash
sudo apt install -y certbot python3-certbot-apache
```

### 5.2 Get SSL Certificate
```bash
# Replace yourdomain.com with your actual domain
sudo certbot --apache -d yourdomain.com

# Follow the prompts to configure SSL
```

---

## ✅ Step 6: Test Your Deployment

### 6.1 Verify Apache is Running
```bash
# Check Apache status
sudo systemctl status httpd   # Amazon Linux
sudo systemctl status apache2 # Ubuntu

# Test local connection
curl localhost
```

### 6.2 Access Your Survey
1. **Open web browser**
2. **Navigate to your server:**
   - With domain: `https://yourdomain.com` or `http://yourdomain.com`
   - With IP: `http://YOUR-PUBLIC-IP`
3. **Test survey functionality:**
   - Answer a few questions
   - Check progress bar updates
   - Submit and verify results display

---

## 🔧 Step 7: Maintenance & Monitoring

### 7.1 Apache Log Files
```bash
# View access logs
sudo tail -f /var/log/httpd/access_log    # Amazon Linux
sudo tail -f /var/log/apache2/access.log  # Ubuntu

# View error logs
sudo tail -f /var/log/httpd/error_log     # Amazon Linux
sudo tail -f /var/log/apache2/error.log   # Ubuntu
```

### 7.2 Restart Apache (if needed)
```bash
sudo systemctl restart httpd   # Amazon Linux
sudo systemctl restart apache2 # Ubuntu
```

### 7.3 Update Survey Content
```bash
# Edit the survey file
sudo nano /var/www/html/index.html

# No restart needed - changes are immediate
```

---

## 🛡️ Security Best Practices

### 1. Keep System Updated
```bash
# Amazon Linux
sudo dnf update -y

# Ubuntu
sudo apt update && sudo apt upgrade -y
```

### 2. Configure Security Groups
- **Limit SSH access** to your IP only
- **Use HTTPS** when possible
- **Regular backups** of your survey data

### 3. Monitor Access
```bash
# Check who's accessing your survey
sudo tail -100 /var/log/httpd/access_log | grep "GET /"
```

---

## 📊 Expected Costs (AWS Free Tier)

- **EC2 t2.micro**: FREE for first 12 months (750 hours/month)
- **Data Transfer**: 15GB outbound free per month
- **Route 53**: ~$0.50/month per hosted zone (if using custom domain)
- **SSL Certificate**: FREE with Let's Encrypt

**Total Monthly Cost**: $0-$3 (depending on usage and domain)

---

## 🚨 Troubleshooting

### Common Issues:

**1. Can't access website**
```bash
# Check if Apache is running
sudo systemctl status httpd

# Check security groups allow HTTP (port 80)
# Verify public IP in browser URL
```

**2. Permission denied errors**
```bash
# Fix file permissions
sudo chown -R apache:apache /var/www/html/  # Amazon Linux
sudo chown -R www-data:www-data /var/www/html/  # Ubuntu
sudo chmod -R 644 /var/www/html/*
```

**3. Survey not loading properly**
```bash
# Check Apache error logs
sudo tail -f /var/log/httpd/error_log

# Verify file content
sudo cat /var/www/html/index.html | head -20
```

---

## 📞 Support

If you encounter issues:
1. **Check AWS EC2 Console** for instance status
2. **Review Apache logs** for error messages  
3. **Verify security group settings**
4. **Test with curl** on the server itself

Your survey should now be fully functional and accessible via your AWS Apache server! 🎉