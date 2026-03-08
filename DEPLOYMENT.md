# 🚀 IClone EVN Vercel Deployment Guide

## 📋 Prerequisites

1. **GitHub Repository**: Your project must be pushed to GitHub
2. **Vercel Account**: Free account at [vercel.com](https://vercel.com)
3. **Telegram Bot** (Optional): For order/contact notifications

---

## 🎯 Step 1: Prepare Your GitHub Repository

```bash
# Add all changes to git
git add .

# Commit changes
git commit -m "🚀 Ready for Vercel deployment - Complete IClone EVN platform"

# Push to GitHub
git push origin main
```

---

## 🔧 Step 2: Get Telegram Bot Credentials (Optional but Recommended)

1. **Create Telegram Bot**:
   - Open Telegram and search for `@BotFather`
   - Send `/newbot`
   - Choose a name (e.g., "IClone EVN Bot")
   - Choose a username (e.g., `iclone_evn_bot`)
   - Copy the **Bot Token** (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Get Your Chat ID**:
   - Add your bot to a chat or send it a message
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat.id` in the response (usually a number)

---

## 🌐 Step 3: Deploy to Vercel

### Method A: Via Vercel Dashboard (Recommended)

1. **Sign in to Vercel**: [vercel.com](https://vercel.com)
2. **Click "Add New..." → "Project"**
3. **Import from GitHub**:
   - Connect your GitHub account
   - Find your `E-Commerce-main` repository
   - Click "Import"

4. **Configure Build Settings**:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: out
   Install Command: npm install
   ```

5. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_TELEGRAM_BOT_TOKEN = your_bot_token_here
   NEXT_PUBLIC_TELEGRAM_CHAT_ID = your_chat_id_here
   NEXT_PUBLIC_CURRENCY_SYMBOL = ֏
   ```

6. **Deploy**: Click "Deploy"

### Method B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel --prod
```

---

## ⚙️ Step 4: Configure Environment Variables in Vercel

1. **Go to Project Settings**: In Vercel dashboard → Your Project → Settings
2. **Environment Variables**: Click "Environment Variables" in the sidebar
3. **Add Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` | `your_bot_token_here` | Production, Preview, Development |
| `NEXT_PUBLIC_TELEGRAM_CHAT_ID` | `your_chat_id_here` | Production, Preview, Development |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | `֏` | Production, Preview, Development |

4. **Redeploy**: After adding variables, click "Redeploy" or push a new commit

---

## 🎯 Step 5: Verify Deployment

1. **Visit Your Site**: Your site will be available at `https://your-project-name.vercel.app`
2. **Test Admin Login**: Go to `/admin/login` and use `admin / iclone2026`
3. **Test Telegram**: Place a test order or send a contact message
4. **Check All Features**:
   - Product browsing and cart
   - Checkout process
   - Admin panel functionality
   - Order management

---

## 🔍 Troubleshooting

### Common Issues & Solutions

**Issue: Build Failed**
- Check that all dependencies are installed
- Verify `next.config.js` syntax
- Ensure no TypeScript errors

**Issue: Telegram Not Working**
- Verify bot token is correct
- Check chat ID is correct
- Ensure environment variables are set in Vercel

**Issue: Admin Panel Not Loading**
- Clear browser cache
- Check localStorage is enabled
- Verify authentication logic

**Issue: Images Not Loading**
- Check image domains in `next.config.js`
- Ensure URLs are accessible
- Verify image optimization settings

---

## 🎉 Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Admin login works (`admin / iclone2026`)
- [ ] Products display correctly
- [ ] Cart and checkout function
- [ ] Telegram notifications work (if configured)
- [ ] Mobile responsive design
- [ ] All pages load quickly

---

## 🌟 Custom Domain Setup (Optional)

1. **In Vercel Dashboard**: Go to Project → Settings → Domains
2. **Add Custom Domain**: Enter your domain (e.g., `yourstore.com`)
3. **DNS Configuration**: Add the provided CNAME record to your DNS
4. **SSL Certificate**: Vercel automatically provisions SSL

---

## 📞 Support

If you encounter any issues:
1. Check Vercel build logs
2. Verify environment variables
3. Review this guide
4. Test locally with `npm run build && npm run start`

---

## 🚀 You're Live!

Your IClone EVN e-commerce platform is now deployed and ready for business! 🎉

**Your live site**: `https://your-project-name.vercel.app`
**Admin Panel**: `https://your-project-name.vercel.app/admin`
**Login**: `admin / iclone2026`
