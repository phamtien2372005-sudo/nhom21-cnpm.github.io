# 📚 Library Management System

A complete frontend-only web application for managing library operations including books, categories, authors, borrowing records, and user management.

## Features

### 🔐 Authentication
- User login and registration
- Password toggle visibility
- "Remember me" functionality
- Role-based access (Admin & User)
- Session management

### 📊 Dashboard
- Real-time statistics (books, categories, authors, users, borrowing)
- Recent books display
- Recent borrowing activity
- Quick overview of library operations

### 📖 Books Management
- Add, edit, delete books
- Search and filter books by title, author, or ISBN
- Track inventory (total quantity vs. available)
- Book location tracking
- Link books to authors and categories

### 🔖 Categories Management
- Create and manage book categories
- Add category descriptions
- Full CRUD operations

### ✍️ Authors Management
- Manage author information
- Track birth date and country
- Add author biography
- Full CRUD operations

### 📤 Borrowing Management
- Record book borrowing transactions
- Track due dates
- Record book returns with condition assessment
- Filter active vs. returned borrowing
- Update book availability automatically

### 👥 Users Management
- Create and manage library users
- Assign user roles (Admin/User)
- Track user contact information
- Search users by name or email

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables and animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage** - Data persistence in browser

## Project Structure

```
QuanLyThuVien/
├── index.html           # Login page
├── register.html        # Registration page
├── dashboard.html       # Main dashboard
├── books.html          # Books management
├── categories.html     # Categories management
├── authors.html        # Authors management
├── borrowing.html      # Borrowing management
├── users.html          # Users management
├── css/
│   └── styles.css      # Main stylesheet
└── js/
    └── app.js          # Core app functionality
```

## Getting Started

### Installation

1. No installation required! Just open `index.html` in your web browser.
2. The app works completely offline using browser's localStorage.

### Default Login Credentials

- **Admin Account:**
  - Username: `admin`
  - Password: `admin123`

- **User Account:**
  - Username: `user`
  - Password: `user123`

### First Time Setup

The app automatically initializes with sample data on first load:
- 2 default users (admin and user)
- 5 book categories
- 3 sample authors
- 3 sample books

## Features Guide

### Login & Registration
1. Enter your credentials on the login page
2. New users can register via "Sign up here" link
3. Check "Remember me" to auto-fill username on next visit

### Dashboard
- View all statistics at a glance
- See recent books and borrowing activity
- Navigate to specific modules using the sidebar

### Managing Books
1. Click "Books" in the sidebar
2. View all books with search functionality
3. Add new book: Click "+ Add New Book" button
4. Edit: Click "Edit" button on any book row
5. Delete: Click "Delete" button (requires confirmation)

### Managing Borrowing
1. Click "Borrowing" in the sidebar
2. Use filter tabs to view All Records, Active, or Returned
3. **To borrow a book:**
   - Click "+ New Borrowing"
   - Select user and available book
   - Set borrow and due dates
   - Confirm

4. **To return a book:**
   - Click "Return" on an active borrowing record
   - Set return date and book condition
   - Add any notes
   - Complete return

### Managing Users, Categories, and Authors
- Similar workflow: Add, Edit, Delete operations
- All changes are saved to localStorage automatically
- Search functionality available where applicable

## Data Storage

All data is stored in the browser's localStorage with the following keys:
- `library_users` - User accounts
- `library_books` - Book inventory
- `library_categories` - Book categories
- `library_authors` - Author information
- `library_borrowing` - Borrowing records
- `library_currentUser` - Current logged-in user

**Note:** Data persists only in the same browser. Clearing browser data will reset everything.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6+ support

## Security Notes

⚠️ **This is a frontend-only demonstration:**
- No encryption of stored passwords
- No real backend authentication
- Not suitable for production use
- Data stored in plain text in localStorage

For production, integrate with a real backend API.

## Keyboard Shortcuts

- Click "×" button on modals to close
- Click outside modals to close (in some cases)
- Form validation prevents incomplete submissions

## Troubleshooting

**Problem:** Data not saving
- Solution: Ensure localStorage is enabled in your browser
- Check: Settings → Privacy → Storage

**Problem:** Can't login
- Solution: Use default credentials (admin/admin123 or user/user123)
- Or clear localStorage and restart

**Problem:** Modal won't close
- Solution: Click the "×" button or "Cancel" button

## Customization

### Adding More Sample Data
Edit `js/app.js` - Look for the `StorageManager.initializeDB()` function

### Changing Colors
Edit `css/styles.css` - Modify CSS variables in `:root` section:
```css
:root {
    --primary-color: #00ACE8;    /* Main color */
    --bg-color: #AFCEED;         /* Background */
    /* ... etc */
}
```

### Adding New Modules
1. Create new HTML file following the pattern of existing pages
2. Include sidebar navigation
3. Add corresponding navigation link to sidebar
4. Implement JavaScript using StorageManager class

## License

This project is free to use and modify.

## Support

For issues or questions, review the code comments or the main functionality in `js/app.js`.

---

**Happy Library Managing! 📚✨**
