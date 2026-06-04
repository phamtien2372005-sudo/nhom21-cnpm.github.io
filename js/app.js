// ==================== STORAGE & AUTH (dùng Supabase) ====================

class AuthManager {
    // Đăng nhập: tìm user trong bảng users của Supabase
    static async login(username, password) {
        const { data: user, error } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .maybeSingle();
        if (error) {
            console.error('Lỗi đăng nhập:', error);
            return { success: false, message: 'Lỗi kết nối database' };
        }
        if (user) {
            sessionStorage.setItem('library_currentUser', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
    }

    static logout() {
        sessionStorage.removeItem('library_currentUser');
    }

    static getCurrentUser() {
        const user = sessionStorage.getItem('library_currentUser');
        return user ? JSON.parse(user) : null;
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Đăng ký: chỉ tạo user với role = 'librarian'
    static async register(username, password, fullName, email) {
        // Kiểm tra username đã tồn tại chưa
        const { data: existing, error: checkError } = await window.supabaseClient
            .from('users')
            .select('username')
            .eq('username', username)
            .maybeSingle();
        if (existing) return { success: false, message: 'Tên đăng nhập đã tồn tại' };
        // Thêm user mới
        const { data: newUser, error: insertError } = await window.supabaseClient
            .from('users')
            .insert([{
                username,
                password,
                full_name: fullName,
                email,
                role: 'librarian'
            }])
            .select()
            .maybeSingle();
        if (insertError) {
            console.error('Lỗi đăng ký:', insertError);
            return { success: false, message: 'Lỗi đăng ký' };
        }
        sessionStorage.setItem('library_currentUser', JSON.stringify(newUser));
        return { success: true, user: newUser };
    }
}

// ==================== UI UTILITIES ====================
class UIManager {
    static showAlert(msg, type = 'success', duration = 3000) {
        let container = document.getElementById('alert-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'alert-container';
            document.body.appendChild(container);
        }
        const el = document.createElement('div');
        el.className = `alert alert-${type} active`;
        el.textContent = msg;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.remove('active');
            setTimeout(() => el.remove(), 300);
        }, duration);
    }

    static showModal(modal, show = true) {
        if (show) modal.classList.add('active');
        else modal.classList.remove('active');
    }

    static confirmDelete(callback) {
        if (confirm('Bạn có chắc chắn muốn xóa?')) callback();
    }

    static formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    }
}

// ==================== GLOBAL FUNCTIONS ====================
function setActiveSidebarLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage) link.classList.add('active');
        else link.classList.remove('active');
    });
}

function updateHeaderInfo() {
    const user = AuthManager.getCurrentUser();
    if (!user) return;
    const initials = (user.full_name || '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const avatarEl = document.getElementById('avatarInitial');
    const nameEl = document.getElementById('userName');
    const roleEl = document.getElementById('userRole');
    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = user.full_name;
    if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Quản trị' : 'Thủ thư';
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const publicPages = ['index.html', 'FormRegister.html', 'FormForgot-Password.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (!publicPages.includes(currentPage) && !AuthManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    setActiveSidebarLink();
    updateHeaderInfo();
});